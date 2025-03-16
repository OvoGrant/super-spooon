import { useLocation, useNavigate } from "react-router-dom"
import Container from "../components/Containers/Container"
import NavigationButton from "../components/Navigation/NavigationButton"
import {Fragment, getTranslationGrade } from "../../types/api";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
const TranslationGradePage = () => {

    const location = useLocation()
    const {answers, fragments, title, language, level} = location.state || {}
    const navigate = useNavigate()
    const [score, setScore] = useState(-1)
    const [totalPoints, setTotalPoints] = useState(0)

    if (!(answers && fragments && title && language &&  level)) navigate("/")

        console.log(fragments)


    const fetchData = async () => {
        const response = await getTranslationGrade(language, fragments, answers, level)
        if (response) {
            console.log(response)
            setScore(response.score)
            setTotalPoints(response.total_points)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container>

            { score === -1 ? 
                  <>
                  <h1 className="text-xl">Grading exercise</h1>
                  <BeatLoader color="#249FC9" size={30} />
                </>
            
            : (
                <>
                <h2 className="text-left ml-35 text-2xl w-full justify-between">{title}</h2>

            <div className="flex-col h-3/4 text-lg w-7/8 text-white">

            <div className="bg-cyan-500 p-4 rounded-lg h-1/2 mb-4">
            <h3 className="white font-bold">Your translation</h3>
            <p >{answers.join(" ")}</p>
            </div>

            <div className="bg-cyan-500 p-4 mb-4 rounded-lg h-1/2">
            <h3 className="white font-bold">Correct translation</h3>
            <p>{
            fragments.map( (fragment : Fragment) =>{
                return fragment.translations[0]
            }).join(" ")}
            </p>
            </div>

            <div className="flex justify-between w-full mt-4">
                <p className="text-black">Your score is {score}/{totalPoints} we've taken note of your mistakes and successes</p>
                 <NavigationButton text="Home" path="/" />
            </div>
            </div>
            </>
        )}
        </Container>
    )
}

export default TranslationGradePage