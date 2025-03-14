import { useNavigate } from "react-router-dom"

interface NavigationButtonProps {
    path: string
    text: string
    state?: any
    disabled?: boolean
}

export const NavigationButton : React.FC<NavigationButtonProps> = ({path, text, state = {}, disabled = false}) => {

    const navigate = useNavigate()
    
    return (
        <button
        onClick={() => {if (!disabled) navigate(path, state)}}
        className="text-2xl py-2 flex items-center justify-center cursor-pointer bg-cyan-500 px-10 rounded-full text-white">
                {text}
        </button>
    )   
}

export default NavigationButton
