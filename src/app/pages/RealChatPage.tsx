import { useState} from 'react';
import useWebSocket from 'react-use-websocket';
import Container from '../components/Containers/Container';
import NavigationButton from '../components/Navigation/NavigationButton';

interface RealChatPageProps {
    language: string
    uuid: string
}

interface Message {
    text: string
    sent: boolean
}

const WebSocketApp : React.FC<RealChatPageProps> =  ({language, uuid})  => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const {sendMessage, } = useWebSocket(import.meta.env.VITE_WS_URL, {

    
    onOpen: () => {
        const message = {
            sender_id: uuid,
            timestamp: new Date().toISOString(),
            body: language,
            message_type: "CONNECT"
        };
        sendMessage(JSON.stringify(message))
    },
    onMessage: (message: MessageEvent) => {
        const parsedMessages = JSON.parse(message.data);
        if(parsedMessages.body === "LEAVE") {
            setMessages([{text: "Your partner left. Finding a new one", sent: false}])
        }  else {
            setMessages((prevMessages) => [...prevMessages, {text: parsedMessages.body, sent: parsedMessages.sender_id == uuid}])

        }

    }
  })

  const handleClick = () => {
    const message = {
        sender_id: uuid, // Use actual UUID or generate one
        timestamp: new Date().toISOString(),
        body: inputMessage,
        message_type: "CHAT"
      };
      sendMessage(JSON.stringify(message))
  }
  return (
    <Container>
    <div className="w-7/8 mt-4 flex flex-col h-full">
    
    <div className="w-full overflow-scroll h-5/6">
    <ul>
        {messages.map((item => <li className = {!item.sent ? "text-left"  : "text-right"}>{item.text} </li>))}
    </ul>
    </div>

    <div className="h-2/8 mt-auto ">
    <div className="flex h-1/2  gap-2 mb-4">
    <input
            onChange={(e) => setInputMessage(e.target.value)}
            type="text"
            className="border-0 w-7/8 p-4 rounded-xl border-black bg-zinc-100 focus:ring-0 outline-none"
        />
       <button className="bg-cyan-500 w-1/8 h-full text-white rounded-xl" onClick={handleClick}>send</button>
    </div>


    <div className="flex justify-center gap-2 w-full h-3/8 ">
        <NavigationButton path="/" text="HOME" />
        <button className="text-2xl py-2 flex items-center justify-center cursor-pointer bg-cyan-500 px-10 rounded-full text-white">
            REFRESH
        </button>
    </div>
    </div>

    </div>

    </Container>
  );
};

export default WebSocketApp;
