import axios from 'axios'

const LEGAL_AI_ENDPOINT = 'https://us-central1-yourproject.cloudfunctions.net/legalai'

export async function getLegalAdvice(userQuestion) {
    try {
        const response = await axios.post(LEGAL_AI_ENDPOINT, { question: userQuestion })
        return response.data.answer
    } catch (error) {
        console.error('❌ LegalAI Function error:', error)
        return '⚠️ Došlo je do greške. Pokušajte ponovo kasnije.'
    }
}
