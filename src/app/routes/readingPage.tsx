import { useEffect, useState } from "react";
import { getReadingPage } from "../../types/api";
import { BeatLoader } from 'react-spinners';
import getUrl from "../utils/dictionaties";

interface readingPageProps {
    readingLevel: string;
    language: string;
}

const ReadingPage = (props: readingPageProps) => {

    const [text, setText] = useState("");
    const [storyTitle, setStoryTitle] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [language, setLanguage] = useState("French");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

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

            const response = await getReadingPage(props.readingLevel, language);
            console.log(response);
            setText(response!.text);
            setStoryTitle(response!.title);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <>
            <div className="bg-white rounded-xl w-6/8 h-7/8 items-center justify-center flex flex-col">
                {storyTitle == "" ? (
                    <>
                        <h1 className="text-xl">Fetching text</h1>
                        <BeatLoader color="#249FC9" size={30} />
                    </>
                ) : (
                    <>
                        <h1 className="text-center text-3xl">{storyTitle}</h1>
                        <p className="center text-4xl px-10">{renderTextWithHoverEffect(text)}</p>
                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="language">Choose a language: </label>
                                <select
                                    id="language"
                                    value={language}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a language</option>
                                    <option value="french">French</option>
                                    <option value="spanish">Spanish</option>
                                </select>
                                <p>Selected language: {language}</p>
                            </div>
                            <button onClick={handleRefresh} className="text-2xl py-2 flex items-center justify-center cursor-pointer bg-cyan-600 px-10 rounded-full text-white">
                                REFRESH
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ReadingPage;
