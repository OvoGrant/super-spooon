const DICTIONARY_WEBSITE : Record<string, string> = {
    "FRENCH": "https://www.larousse.fr/dictionnaires/francais/",
    "SPANISH": "https://dle.rae.es/",
}

const getUrl =  (language: string, word: string) => {
    const url = DICTIONARY_WEBSITE[language.toUpperCase()];
    
    return url + encodeURIComponent(word)
}

export default getUrl