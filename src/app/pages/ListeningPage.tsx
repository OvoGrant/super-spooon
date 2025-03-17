import { useLocation } from "react-router-dom"
import Container from "../components/Containers/Container"
import { useEffect, useState } from "react"
import PlayAudioButton from "../components/Media/PlayAudioButton"
import ActivityTextField from "../components/Input/ActivityTextField"
import { getListeningPage, ListeningFragment } from "../../types/api"
import NavigationButton from "../components/Navigation/NavigationButton"
import { BeatLoader } from "react-spinners"

const ListeningPage = () => {

    const location = useLocation()
    const {language, level} = location.state || {}
    const [slideCount, setSlideCounter] = useState(-1)
    const [fragments, setFragments] = useState<ListeningFragment[]>([])
    const [fragmentIndex, setFragmentIndex] = useState(0)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [titleAudio, setTitleAudio] = useState("")
    const [currentAnswer, setCurrentAnswer] = useState("Test")
    const [answers, setAnswers] = useState<string[]>([])

    const fetchData = async () => {
        const response = await getListeningPage(language, level)

        if (response) {
            setTitle(response.title)
            setFragments(response.fragments)
            setTitleAudio(response.audio)
            setText(response.text)
        }
    }

    const handleClick = () => {

        if(slideCount >= 0 && slideCount % 2 != 0) {
            setFragmentIndex((prev) => prev + 1)
        }
        
        if(slideCount >= 0 && slideCount % 2 == 0) {
            setAnswers((prevItems) => [...prevItems, currentAnswer])
        }

        setSlideCounter((prev) => ( prev + 1))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
      <Container>
        { title === "" ? 
            <>
            <h1 className="text-xl">Creating exercise</h1>
            <BeatLoader color="#249FC9" size={30} />
          </>

        :
        <>
        {slideCount === -1 && (
        
            <div className="w-7/8 h-4/6 flex flex-col ">

                <div className="flex justify-center w-full h-1/4">
                    <h2 className="text-2xl">{title}</h2>
                </div>

                <div className="flex justify-center h-1/4 ">
                <PlayAudioButton audioSrc={titleAudio} />
                </div>

                <div className="w-7/8 h-3/8 flex flex-col mb-6">
                 <p className="text-xl border-0 rounded-xl p-8 bg-zinc-100 mt-auto">You will listen to some audio and then write what you hear. Press play to listen to the whole audio</p>
                </div>
                <div className="w-7/8 h-2/4 flex justify-end">
                    <button onClick={handleClick} className="text-white bg-cyan-500 h-3/8 w-2/8 rounded-full">
                        NEXT
                    </button>
                </div>
            </div>

        )}  


        {
            slideCount >= 0 && slideCount % 2 == 0 && (
                <>
                <div className="flex justify-center w-full h-1/4">
                         <h2 className="text-2xl">{title}</h2>
                </div>
                <div className="flex justify-center h-1/8 mb-10 w-6/8 ">
                    <PlayAudioButton audioSrc={fragments[fragmentIndex].audio} />
                 </div>
                 <ActivityTextField prompt="Write your answer here" onChange={setCurrentAnswer} />
                 <div className="w-7/8 h-2/8 mt-10 flex justify-end">
                    <button onClick={handleClick} className="text-white bg-cyan-500 h-3/8 w-2/8 rounded-full">
                        NEXT
                    </button>
                 </div>
                </>
            )
        }

        {
            slideCount >= 0 && slideCount % 2 != 0 && (
                <>

                    <div className="flex justify-center w-full h-2/8">
                        <h2 className="text-2xl">{title}</h2>
                    </div>

                    <div className="bg-cyan-500 text-2xl w-7/8 rounded-xl mt-10 p-6 text-white">
                        <h3 className="font-bold  ">What was said</h3>
                        <p className="text-green-200">{fragments[fragmentIndex].sentence}</p>
                        <h3 className="font-bold ">What you wrote</h3>
                        <p>{answers[fragmentIndex]}</p>
                    </div>
                    <div className="w-7/8 h-2/8 mt-10 flex justify-end">
                    { answers.length == fragments.length ? 
                        <div>
                        <NavigationButton 
                            path="/listeninggrade" 
                            text="NEXT"
                            state={{state: {text, fragments, title, answers}}}
                        />
                        </div>
                        :
                        <button onClick={handleClick} className="text-white bg-cyan-500 h-3/8 w-2/8 rounded-full">
                        NEXT
                        </button>
                    
                    }
                    </div>
                </>
            )
        }
        </>
    }
        
      </Container>
    )
}

export default ListeningPage