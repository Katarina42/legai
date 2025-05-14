import React, { useState } from 'react'
import Markdown from 'react-native-markdown-display'
import {
    View,
    TextInput,
    Button,
    Text,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native'
import { getLegalAdvice } from '../services/AiService'
import axios from 'axios'

export default function ChatScreen() {
    const [input, setInput] = useState('')
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)
    const [showContactForm, setShowContactForm] = useState(false)
    const [userMessage, setUserMessage] = useState('')
    const [lastQuestion, setLastQuestion] = useState('')
    const [lastAnswer, setLastAnswer] = useState('')
    const [sending, setSending] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return
        setLoading(true)
        setShowContactForm(false)

        try {
            const { answer, offerContact } = await getLegalAdvice(input)

            setChat(prev => [
                ...prev,
                { role: 'user', text: input },
                { role: 'ai', text: answer }
            ])

            setLastQuestion(input)
            setLastAnswer(answer)

            if (offerContact) setShowContactForm(true)
        } catch (error) {
            console.error('OpenAI error:', error)
            setChat(prev => [...prev, {
                role: 'ai',
                text: '⚠️ Došlo je do greške. Pokušajte ponovo kasnije.'
            }])
        } finally {
            setInput('')
            setLoading(false)
        }
    }

    const handleSendToLawyer = async () => {
        if (!userMessage.trim()) {
            Alert.alert('Molimo unesite poruku za pravnu službu.')
            return
        }

        setSending(true)

        try {
            await axios.post(
                'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendToLawyer',
                {
                    question: lastQuestion,
                    aiAnswer: lastAnswer,
                    userMessage
                }
            )

            Alert.alert('Poruka poslata pravnoj službi.')
            setUserMessage('')
            setShowContactForm(false)
        } catch (err) {
            Alert.alert('Greška pri slanju poruke.')
        }

        setSending(false)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
                {chat.map((item, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                        <Text style={[
                            styles.senderLabel,
                            item.role === 'user' ? styles.userLabel : styles.aiLabel
                        ]}>
                            {item.role === 'user' ? 'Vi' : 'LegalAI'}
                        </Text>
                        <View style={[
                            styles.bubble,
                            item.role === 'user' ? styles.userBubble : styles.aiBubble
                        ]}>
                            <Markdown style={markdownStyles}>{item.text}</Markdown>
                        </View>
                    </View>
                ))}

                {showContactForm && (
                    <View style={styles.contactForm}>
                        <Text style={styles.contactPrompt}>
                            Ovaj slučaj može zahtevati dodatnu podršku. Ako želite da se obratite pravnoj službi, unesite dodatnu poruku:
                        </Text>
                        <TextInput
                            style={styles.contactInput}
                            placeholder="Unesite poruku za pravnika"
                            value={userMessage}
                            onChangeText={setUserMessage}
                            multiline
                        />
                        {sending
                            ? <ActivityIndicator size="small" color="#1e88e5" style={{ marginTop: 10 }} />
                            : <Button title="Pošalji pravniku" onPress={handleSendToLawyer} />}
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Unesite pravno pitanje"
                    value={input}
                    onChangeText={setInput}
                />
                <Button title={loading ? '...' : 'Pošalji'} onPress={handleSend} disabled={loading} />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f8' },
    chatArea: { flex: 1, padding: 10 },

    senderLabel: {
        fontSize: 12,
        marginBottom: 2,
        color: '#888'
    },
    userLabel: { alignSelf: 'flex-end' },
    aiLabel: { alignSelf: 'flex-start' },

    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    userBubble: {
        backgroundColor: '#d1e7dd',
        alignSelf: 'flex-end',
        borderTopRightRadius: 0
    },
    aiBubble: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
        borderColor: '#ccc',
        borderWidth: 1
    },
    inputArea: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40
    },
    contactForm: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#fff7ea',
        borderRadius: 8,
        borderColor: '#ffc107',
        borderWidth: 1
    },
    contactPrompt: {
        marginBottom: 8,
        color: '#444',
        fontSize: 15
    },
    contactInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        minHeight: 60,
        marginBottom: 10,
        backgroundColor: '#fff'
    }
})

const markdownStyles = {
    body: { fontSize: 16, color: '#333' },
    strong: { fontWeight: 'bold', color: '#000' },
    em: { fontStyle: 'italic' },
    paragraph: { marginBottom: 8 },
    bullet_list: { paddingLeft: 16 },
    ordered_list: { paddingLeft: 16 },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 4
    },
    link: {
        color: '#1e88e5',
        textDecorationLine: 'underline'
    },
    heading1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6
    },
    heading2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4
    }
}
