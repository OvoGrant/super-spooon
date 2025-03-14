import axios from "axios"


export type ReadingPageResponse =  {
    title: string
    text: string

}

const API_BASE_URL = "https://languagexyz123.store/"

const apiService = axios.create({
    baseURL: API_BASE_URL,
})

export const getReadingPage = async (readingLevel: string, language: string) 
: Promise<ReadingPageResponse | null>   => {
    try {

        console.log(language)

        const response = await apiService.post("/readingPage",{
            reading_level: readingLevel,
            language: language,
            model: "openai"
        });

        const rawData = response.data;
        
        let cleanJsonString = rawData.replace(/^```json\n|\n```$/g, '');

        let jsonResponse = JSON.parse(cleanJsonString);

        return jsonResponse;

    } catch (error) {
        console.error("Error fetching content", error)
        return null
    }
}