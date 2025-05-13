import React, { useState } from 'react'
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native'
import { getLegalAdvice } from '../services/AiService'

export default function ChatScreen() {
    const [input, setInput] = useState('')
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return
        setLoading(true)
        const answer = await getLegalAdvice(input)
        setChat([...chat, { question: input, answer }])
        setInput('')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                {chat.map((item, index) => (
                    <View key={index} style={styles.bubbleGroup}>
                        <Text style={styles.question}>You: {item.question}</Text>
                        <Text style={styles.answer}>LegalAI: {item.answer}</Text>
                    </View>
                ))}
            </ScrollView>

            <TextInput
                style={styles.input}
                placeholder="Type your legal question"
                value={input}
                onChangeText={setInput}
            />
            <Button title={loading ? "Thinking..." : "Ask"} onPress={handleSend} disabled={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, marginTop: 40 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginVertical: 10,
        borderRadius: 6
    },
    bubbleGroup: { marginBottom: 16 },
    question: { fontWeight: 'bold', marginBottom: 4 },
    answer: { color: '#333' }
})
