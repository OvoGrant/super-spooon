type TranslationPageActivityPromptProps = {
    text: string
}
const TranslationPageActivityPrompt: React.FC<TranslationPageActivityPromptProps> = ({text}) => {
    return (
        <div className="bg-cyan-500 flex w-7/8 items-center rounded-xl h-1/4 mt-5 mb-10" >
            <p className="text-3xl pl-12 text-white font-family-sans">{text}</p>
        </div>
    )
}

export default TranslationPageActivityPrompt;