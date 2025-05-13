import React, { useState } from 'react'
import {
    View,
    TextInput,
    Button,
    Text,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { getLegalAdvice } from '../services/AiService'

export default function ChatScreen() {
    const [input, setInput] = useState('')
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return
        setLoading(true)

        const answer = await getLegalAdvice(input)
        setChat([...chat, { role: 'user', text: input }, { role: 'ai', text: answer }])
        setInput('')
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
                {chat.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.bubble,
                            item.role === 'user' ? styles.userBubble : styles.aiBubble
                        ]}
                    >
                        <Text style={styles.bubbleText}>{item.text}</Text>
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
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f8' },
    chatArea: { flex: 1, padding: 10 },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        marginVertical: 4,
        borderRadius: 12
    },
    userBubble: {
        backgroundColor: '#d1e7dd',
        alignSelf: 'flex-end',
        borderTopRightRadius: 0
    },
    aiBubble: {
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
        borderColor: '#ccc',
        borderWidth: 1
    },
    bubbleText: { fontSize: 16, color: '#333' },
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
    }
})
