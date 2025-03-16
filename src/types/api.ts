import axios from "axios"

export type TranslationPageGradeResponse = {
    score: number,
    total_points: number,
    strengths: string[],
    weaknesses: string[]
}

export type ReadingPageResponse =  {
    title: string
    text: string
}

export type Fragment = {
    original_sentence: string
    translations: string[]
}

export type TranslationPageResponse = {
    title: string
    text: string
    fragments: Fragment[]
}
const API_BASE_URL = "https://languagexyz123.store/"

const apiService = axios.create({
    baseURL: API_BASE_URL
})

export const gradeTranslationPage = async () => {

}

export const getTranslationGrade = async (language: string, source_text: Fragment[], target_text: string[], reading_level: string) 
: Promise<TranslationPageGradeResponse | null> => {
    try {

        const response = await apiService.post("/translationGrade", {
            language: language,
            source_text: source_text,
            target_text: target_text,
            reading_level: reading_level
        })

        const rawData = response.data

        let cleanJsonString = rawData.replace(/^```json\n|\n```$/g, '');

        let jsonResponse = JSON.parse(cleanJsonString);
        
        return jsonResponse


    } catch (error) {
        console.log("Error fetching content", error)
        return null
    }
}

export const getTranslationPage = async (sourceLanguage: string, targetLanguage: string, readingLevel: string) 
: Promise<TranslationPageResponse | null> => {
    try {
        
        const response = await apiService.post("/translationPage", {
            source_language: sourceLanguage,
            target_language: targetLanguage, 
            reading_level: readingLevel
        })

        const rawData = response.data;
        
        let cleanJsonString = rawData.replace(/^```json\n|\n```$/g, '');

        let jsonResponse = JSON.parse(cleanJsonString);
        
        return jsonResponse;

    } catch (error) {
        console.error("Error fetching content", error)
        return null
    }
 }


export const getReadingPage = async (readingLevel: string, language: string) 
: Promise<ReadingPageResponse | null>   => {
    try {

        const response = await apiService.post("/readingPage", {
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
