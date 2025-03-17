import { useEffect, useState } from "react";
import Container from "../components/Containers/Container";
import { useLocation } from "react-router-dom";
import { getTranslationPage, TranslationFragment } from "../../types/api";
import ActivityTextField from "../components/Input/ActivityTextField";
import TranslationPageActivityPrompt from "../components/Prompts/TranslationPageActivityPrompt";
import { BeatLoader } from "react-spinners";
import NavigationButton from "../components/Navigation/NavigationButton";
import TranslationPageAnswer from "../components/Prompts/TranslationPageAnswer";

const TranslationPage = () => {

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [fragments, setFragments] = useState<TranslationFragment[]>([])
    const [answers, setAnswers] = useState<string[]>([])
    const [currentAnswer, setCurrentAnswer] = useState("")
    const location = useLocation()
    const [slideCount, setSlideCount] = useState(-1);
    const [fragmentIndex, setFragmentIndex] = useState(0)
    const {language, level} = location.state || {}

    const handleClick = async () => {
        
        if(slideCount >= 0 && slideCount % 2 != 0) {
            setFragmentIndex((prev) => prev + 1)
        }
        
        if(slideCount >= 0 && slideCount % 2 == 0) {
            setAnswers((prevItems) => [...prevItems, currentAnswer])
        }

        setSlideCount((prev) => prev + 1)

        console.log(fragmentIndex)
        console.log(slideCount)
    }
    const fetchData = async () => {
        try {
            const response = await getTranslationPage("english", language, level)
            console.log(response)
            if (response) {
                setTitle(response.title)
                setText(response.text)
                setFragments(response.fragments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
          <Container>
            { title === "" ?
                  <>
                  <h1 className="text-xl">Creating exercise</h1>
                  <BeatLoader color="#249FC9" size={30} />
                </>
            :
            <>
              {slideCount === -1 &&
                <>
                <h2 className="text-left ml-35 text-2xl w-full">{title}</h2>
                <div className="bg-cyan-500 flex w-7/8 text-white items-center rounded-xl h-1/2 mt-5 mb-10" >
                  <p className="pl-10 pt-20 pb-20 w-5/6 rounded-xl">{text}</p>
                </div>
                <div className="w-7/8 border-0 rounded-xl p-4 h-1/8 bg-zinc-100">
                    <p className="text-xl">You will translate the above story! Press next to start</p>
                </div>
                </>
              }


              {slideCount >= 0 && slideCount % 2 != 0 && answers.length <= fragments.length && (
                <>
                  <h2 className="text-left ml-35 text-2xl w-full">{title}</h2>
                  <TranslationPageAnswer 
                    originalPhrase={fragments[fragmentIndex].original_sentence} 
                    translation={answers[fragmentIndex]} 
                    answers={fragments[fragmentIndex].translations}  
                  />
               </>

              )}
      
              {slideCount >= 0 && slideCount % 2 == 0 && answers.length < fragments.length && (
                <>
                  <h2 className="text-left ml-35 text-2xl w-full">{title}</h2>
                  <TranslationPageActivityPrompt text={fragments[fragmentIndex].original_sentence} />
                  <ActivityTextField onChange={setCurrentAnswer} prompt="Translate the above sentence into french" />
                </>
              )}

        
            <div className="w-7/8 flex justify-end mt-4">
            {answers.length == fragments.length ? 
                <NavigationButton 
                state={{state: {answers, fragments, title, language, level}}}
                text="NEXT"
                path="/translationgrade"
                /> :
                <button className="text-white bg-cyan-500 rounded-full p-4" onClick={handleClick}>NEXT</button>
            }
            </div>
            </>}
          </Container>
        </>
      );
}

export default TranslationPage;