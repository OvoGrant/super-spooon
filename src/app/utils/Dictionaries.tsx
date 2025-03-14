export const DICTIONARY_WEBSITE : Record<string, string> = {
    "FRENCH": "https://www.larousse.fr/dictionnaires/francais/",
    "SPANISH": "https://dle.rae.es/",
}

export const LANGUAGES = [
    "FRENCH", "SPANISH", "ITALIAN"
]

const getUrl =  (language: string, word: string) => {
    const url = DICTIONARY_WEBSITE[language.toUpperCase()];
    
    return url + encodeURIComponent(word)
}

export const LEVELS = [
    "A1", "A2", "B1", "B2", "C1", "C2"
]

export const ACTIVITIES = [
    "READING", "LISTENING", "TRANSLATION"
]

export default getUrl
