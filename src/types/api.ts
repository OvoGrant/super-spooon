import axios from "axios"


export type ReadingPageResponse =  {
    title: string
    text: string

}



const API_BASE_URL = "https://68.183.107.242:5000/"

const apiService = axios.create({
    baseURL: API_BASE_URL,
})

export const getReadingPage = async (readingLevel: string, language: string) 
: Promise<ReadingPageResponse | null>   => {
    try {

        const response = await apiService.post("/readingPage",{
            reading_level: readingLevel,
            language: language,
            model: "openai"
        });

        const rawData = response.data;
        
        // Remove markdown formatting (```json\n and the closing backticks)
        let cleanJsonString = rawData.replace(/^```json\n|\n```$/g, '');

// Parse the cleaned string into a JSON object
        let jsonResponse = JSON.parse(cleanJsonString);

        return jsonResponse;

    } catch (error) {
        console.error("Error fetching content", error)
        return null
    }
}