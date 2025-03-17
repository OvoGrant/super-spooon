import { BeatLoader } from "react-spinners";
import Container from "../components/Containers/Container";
import NavigationButton from "../components/Navigation/NavigationButton";
import { useEffect, useState } from "react";
import { getListeningPageGrade, ListeningFragment } from "../../types/api";
import { useLocation } from "react-router-dom";

const ListeningGradePage = () => {

    const [score, setScore] = useState(-1)
    const [totalPoints, setTotalPoints] = useState(0)
    const location = useLocation()
    const {text, fragments, title, answers} = location.state || {}
    const fetchData = async () => {
        const response = await getListeningPageGrade(fragments.map((elem: ListeningFragment) => elem.sentence) , answers)

        if (response){
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
        <p>{text}</p>
        </div>

        <div className="flex justify-between w-full mt-4">
            <p className="text-black">Your score is {score}/{totalPoints} we've taken note of your mistakes and successes</p>
             <NavigationButton text="Home" path="/" />
        </div>
        </div>
        </>
    )}
    </Container>
)}

export default ListeningGradePage;