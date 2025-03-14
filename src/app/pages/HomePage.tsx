import { useState } from "react"
import Container from "../components/Containers/Container"
import LanguageSelection from "../components/Input/LanguageSelection"
import LevelSelection from "../components/Input/LevelSelection"
import ActivitySelection from "../components/Input/ActivitySelection"
import { NavigationButton } from "../components/Navigation/NavigationButton"

const HomePage = () => {

    const [language, setLanguage] = useState("")
    const [level, setLevel] = useState("A1")
    const [activity, setActivity] = useState("READING")
    const submitDisabled =  language == "";


    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleLevelChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setLevel(e.currentTarget.textContent || '')
    }


    return (
        <Container>
           <LanguageSelection language={language} handleChange={handleLanguageChange}/>
           <LevelSelection selectedLevel={level} handleChange={handleLevelChange}/>
           <ActivitySelection  selectedActivity={activity} setSelectedActivity={setActivity}/>
           <NavigationButton disabled={submitDisabled} state={{state: {language, level, activity}}} path={activity} text="Submit" />
        </Container>
    )
}

export default HomePage