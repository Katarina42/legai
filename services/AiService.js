import axios from 'axios'

const LEGAL_AI_ENDPOINT = 'https://europe-west1-legalai-fa061.cloudfunctions.net/legalai'

export async function getLegalAdvice(userQuestion) {
    try {
        console.log('🚀 Attempting to call Cloud Function at:', LEGAL_AI_ENDPOINT)
        const response = await axios.post(LEGAL_AI_ENDPOINT, { 
            question: userQuestion 
        }, {
            timeout: 10000, // 10 second timeout
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log('✅ Cloud Function response received')
        return {
            answer: response.data.answer,
            offerContact: response.data.offerContact
        }
    } catch (error) {
        console.error('❌ LegalAI Function error:', {
            message: error.message,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            data: error?.response?.data,
            config: {
                url: error?.config?.url,
                method: error?.config?.method,
                headers: error?.config?.headers
            }
        })
        
        let errorMessage = 'An error occurred while processing your request.'
        if (error?.response?.status === 404) {
            errorMessage = 'The legal AI service could not be found. Please verify the function name and region.'
        } else if (error?.code === 'ECONNABORTED') {
            errorMessage = 'The request timed out. Please try again.'
        } else if (error?.code === 'ERR_NETWORK') {
            errorMessage = 'Network error. Please check your internet connection and verify the function URL.'
        }

        return {
            answer: errorMessage,
            offerContact: false
        }
    }
}
