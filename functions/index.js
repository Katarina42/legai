const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const legalAiHandler = require('./handlers/legalAiHandler')
const emailHandler = require('./handlers/emailHandler')

// Legal AI endpoint
exports.legalai = functions.region('europe-west1').https.onRequest((req, res) => {
    cors(req, res, async () => {
        await legalAiHandler(req, res)
    })
})

// Email endpoint
exports.sendToLawyer = functions.region('europe-west1').https.onRequest((req, res) => {
    cors(req, res, async () => {
        await emailHandler(req, res)
    })
})
