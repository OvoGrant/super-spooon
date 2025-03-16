import React from 'react';

type TranslationPageAnswerProps = {
    originalPhrase: string,
    translation: string,
    answers: string[]
}

// Function to generate diff between user's translation and correct answer
const generateDiff = (userTranslation: string, correctAnswer: string) => {
    // Convert both strings to lowercase and trim for comparison
    const userWords = userTranslation.toLowerCase().trim().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().trim().split(/\s+/);
    
    // Create spans for each word with appropriate color
    return correctWords.map((word, index) => {
        const isMatch = userWords.includes(word);
        const className = isMatch ? "text-green-200" : "text-red-200 font-bold";
        return (
            <span key={`${word}-${index}`} className={className}>
                {word}{index < correctWords.length - 1 ? " " : ""}
            </span>
        );
    });
};

const TranslationPageAnswer: React.FC<TranslationPageAnswerProps> = ({originalPhrase, translation, answers}) => {
    // The first answer is considered the correct one
    const correctAnswer = answers[0];
    
    // Create a safe copy of answers to prevent mutation issues
    const otherAnswers = [...answers].slice(1);
    
    return (
        <div className="w-7/8 p-4 flex-col items-center rounded-xl mt-5 mb-10 text-m text-white bg-cyan-500">
            <div className="pb-2">
                <h3 className="font-bold">The original phrase was</h3>
                <p className="text-zinc-200 italic">{originalPhrase}</p>
            </div>
            
            <div className="pb-2">
                <h3 className="font-bold">Your answer</h3>
                <p>{translation}</p>
            </div>
            
            <div className="pb-2">
                <h3 className="font-bold">Correct answer</h3>
                <p className="text-green-200">{correctAnswer}</p>
            </div>
                
            {otherAnswers.length > 0 && (
                <div>
                    <h3 className="font-bold">Other acceptable answers</h3>
                    <ul className="list-disc list-inside">
                        {otherAnswers.map((answer, index) => (
                            <li key={index}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TranslationPageAnswer;