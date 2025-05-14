const axios = require('axios')
const { OPENAI_API_KEY } = require('../config/openai')
const { getSystemPrompt, isSerbian } = require('../utils/prompts')

async function legalAiHandler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

    const { question } = req.body
    if (!question) return res.status(400).json({ error: 'Missing question' })

    try {
        const hasSerbian = isSerbian(question)
        const systemPrompt = getSystemPrompt(hasSerbian)

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                temperature: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const aiAnswer = response.data?.choices?.[0]?.message?.content?.trim()

        if (!aiAnswer) {
            return res.status(500).json({ error: 'Empty AI response' })
        }

        const offerContact = aiAnswer.toLowerCase().includes('kontaktirajte pravnika') || 
                           aiAnswer.toLowerCase().includes('contact a lawyer')

        res.status(200).json({ answer: aiAnswer, offerContact })

    } catch (err) {
        console.error('❌ OpenAI error:', err)
        console.error('❌ OpenAI error:', err?.response?.data || err.message || err)
        res.status(500).json({ error: 'Something went wrong while contacting the AI' })
    }
}

module.exports = legalAiHandler 