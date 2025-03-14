import { useEffect, useState } from "react";
import { getReadingPage } from "../../types/api";
import { BeatLoader } from 'react-spinners';
import getUrl from "../utils/Dictionaries";
import Container from "../components/Containers/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationButton } from "../components/Navigation/NavigationButton";



const ReadingPage = () => {

    const navigate = useNavigate()
    const [text, setText] = useState("");
    const [storyTitle, setStoryTitle] = useState("");
    const [refresh, setRefresh] = useState(false);
    const location = useLocation()
    const {language, level} = location.state || {}


    const searchDictionary = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        const text = (e.target as HTMLSpanElement).textContent;
        window.open(getUrl(language, text || ''), '_blank');
    };

    const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRefresh(!refresh);
    };

    const renderTextWithHoverEffect = (text: string) => {
        const words = text.split(' '); // Split text by spaces
        return words.map((word, index) => (
            <span onClick={searchDictionary} key={index} className="hover:text-cyan-500 hover:cursor-pointer">{word} </span>
        ));
    };

    const fetchData = async () => {
        try {
            setText("");
            setStoryTitle("");
            const response = await getReadingPage(level, language);
            setText(response!.text);
            setStoryTitle(response!.title);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (language == "" || level == "") navigate("/", {state: {language,level} } )
        fetchData();
    }, [refresh]);

    return (
        <>  
        <Container>
                {storyTitle == "" ? (
                    <>
                        <h1 className="text-xl">Fetching text</h1>
                        <BeatLoader color="#249FC9" size={30} />
                    </>
                ) : (
                    <>
                        <h1 className="text-center text-3xl">{storyTitle}</h1>
                        <p className="overflow-scroll center text-4xl px-10">{renderTextWithHoverEffect(text)}</p>
                        <div className="mt-auto flex gap-6">
                        <button onClick={handleRefresh} className="text-2xl py-2 flex items-center justify-center cursor-pointer bg-cyan-500 px-10 rounded-full text-white">
                            REFRESH
                        </button>
                        <NavigationButton path="/" text="HOME"/>
                        </div>
                    </>
                )}
             </Container>
        </>
    );
};

export default ReadingPage;
