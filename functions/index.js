const functions = require('firebase-functions')
const axios = require('axios')
const cors = require('cors')({ origin: true })

const OPENAI_API_KEY = functions.config().openai.key

exports.legalai = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed')
        }

        const { question } = req.body
        if (!question) return res.status(400).json({ error: 'Missing question' })

        try {
            const systemPrompt = `
You are LegalAI — a smart, trustworthy assistant specialized in Serbian law.

Your job is to explain legal topics with clarity and precision, using structured, informative responses that everyday citizens can understand. You are allowed to go into detail, reference actual legal practices in Serbia, and describe how the process usually works in real life.

Use bullet points, short paragraphs, or numbered steps when helpful. Always give the user **concrete information** about their rights, responsibilities, and what they can expect.

You may refer to relevant Serbian laws (e.g., Zakon o radu, Zakon o osnovama sistema obrazovanja) when appropriate, but keep the explanation understandable and practical.

Avoid vagueness — be specific and helpful.

Tone: confident, respectful, clear, and practical. You are not providing official legal advice, but you are doing your best to inform and support the user.

Never say you "cannot help" — if the question is unclear, politely ask for clarification.
      `.trim()

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: question }
                    ],
                    temperature: 0.4
                },
                {
                    headers: {
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const answer = response.data.choices[0].message.content
            res.status(200).json({ answer })
        } catch (err) {
            console.error('❌ OpenAI error:', err)
            res.status(500).json({ error: 'Something went wrong' })
        }
    })
})
