import axios from "axios"

export type ListeningPageGradeReponse = {
    score: number, 
    total_points: number
}

export type ListeningFragment = {
    sentence: string
    audio: string
}

export type ListeningPageResponse = {
    title: string
    text: string
    audio: string
    fragments : ListeningFragment[]
}

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

export type TranslationFragment = {
    original_sentence: string
    translations: string[]
}

export type TranslationPageResponse = {
    title: string
    text: string
    fragments: TranslationFragment[]
}
const API_BASE_URL = "https://languagexyz123.store/"

const apiService = axios.create({
    baseURL: API_BASE_URL
})

export const getListeningPageGrade = async (original_text: string[], answers: string[])
: Promise<ListeningPageGradeReponse | null> => {
    try {

        const response = await apiService.post("/listeningGrade", {
            original_text: original_text,
            answers: answers
        })

        return response.data

    } catch (error) {
        console.log("Error fetching content", error)
        return null
    }
}

export const getListeningPage = async (language: string, level: string)
: Promise<ListeningPageResponse | null>  => {
    try {  
        const response = await apiService.post("/listeningPage", {
            language: language,
            reading_level: level
        })

        return response.data
    

    } catch (error) {
        console.log("Error fetching content", error)
        return null        
    }
}

export const getTranslationGrade = async (language: string, source_text: TranslationFragment[], target_text: string[], reading_level: string) 
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
