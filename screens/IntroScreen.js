import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function IntroScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to LegalAI</Text>
            <Text style={styles.subtitle}>Get quick, free legal advice</Text>
            <Button title="Start Chat" onPress={() => navigation.navigate('Chat')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 30 }
})
