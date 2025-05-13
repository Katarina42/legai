import axios from 'axios'

export async function getLegalAdvice(userQuestion) {
    const systemPrompt = `You are a helpful legal assistant for everyday citizens. Answer clearly and simply. Always remind the user this is not official legal advice.`

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userQuestion }
            ],
            temperature: 0.4
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    )

    return response.data.choices[0].message.content
}
