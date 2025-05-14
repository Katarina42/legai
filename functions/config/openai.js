const functions = require('firebase-functions')

const OPENAI_API_KEY = functions.config().openai.key

module.exports = {
    OPENAI_API_KEY
} 