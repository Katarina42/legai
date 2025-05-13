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
    Linking
} from 'react-native'
import { getLegalAdvice } from '../services/AiService'

export default function ChatScreen() {
    const [input, setInput] = useState('')
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return
        setLoading(true)

        try {
            const answer = await getLegalAdvice(input)
            setChat(prev => [...prev, { role: 'user', text: input }, { role: 'ai', text: answer }])
        } catch (error) {
            console.error('OpenAI error:', error)
            setChat(prev => [...prev, { role: 'ai', text: '⚠️ Došlo je do greške. Pokušajte ponovo kasnije.' }])
        } finally {
            setInput('')
            setLoading(false)
        }
    }


    const contactLawyer = () => {
        const subject = encodeURIComponent('Pitanje za pravnika')
        const body = encodeURIComponent('Poštovani,\n\nImam pitanje u vezi sa sledećom pravnom situacijom:\n\n...\n\nHvala unapred.')
        const email = 'katarinarankovic42@gmail.com' // replace with your NGO email
        const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`
        Linking.openURL(mailtoUrl)
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
                        <Text
                            style={[
                                styles.senderLabel,
                                item.role === 'user' ? styles.userLabel : styles.aiLabel
                            ]}
                        >
                            {item.role === 'user' ? 'You' : 'LegalAI'}
                        </Text>
                        <View
                            style={[
                                styles.bubble,
                                item.role === 'user' ? styles.userBubble : styles.aiBubble
                            ]}
                        >
                            <Markdown style={markdownStyles}>{item.text}</Markdown>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your legal question"
                    value={input}
                    onChangeText={setInput}
                />
                <Button title={loading ? '...' : 'Send'} onPress={handleSend} disabled={loading} />
            </View>

            <View style={styles.ngoButtonWrapper}>
                <Button title="Pošalji pitanje pravniku" onPress={contactLawyer} />
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
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    aiBubble: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
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

    ngoButtonWrapper: {
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f9f9f9'
    }
})

const markdownStyles = {
    body: {
        fontSize: 16,
        color: '#333'
    },
    strong: {
        fontWeight: 'bold',
        color: '#000'
    },
    em: {
        fontStyle: 'italic'
    },
    paragraph: {
        marginBottom: 8
    },
    bullet_list: {
        paddingLeft: 16
    },
    ordered_list: {
        paddingLeft: 16
    },
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
