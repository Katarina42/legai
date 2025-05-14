const { transporter } = require('../config/email')

async function emailHandler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

    const { question, aiAnswer, userMessage } = req.body

    if (!question || !aiAnswer || !userMessage) {
        return res.status(400).json({ error: 'Missing fields' })
    }

    const mailOptions = {
        from: 'LegalAI <noreply@yourdomain.com>',
        to: 'katarinarankovic42@gmail.com',
        subject: 'Novi upit za pravnu službu',
        text: `📩 Novi upit sa aplikacije:

❓ Pitanje korisnika:
${question}

🤖 Odgovor AI:
${aiAnswer}

✍️ Poruka korisnika za pravnu službu:
${userMessage}`
    }

    try {
        await transporter.sendMail(mailOptions)
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Email error:', error)
        res.status(500).json({ error: 'Slanje e-maila nije uspelo' })
    }
}

module.exports = emailHandler 