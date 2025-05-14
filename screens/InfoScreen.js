import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'

export default function InfoScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>O LegalAI aplikaciji</Text>

            <Text style={styles.paragraph}>
                Ova aplikacija pruža osnovne informacije o pravima građana u Srbiji.
            </Text>

            <Text style={styles.paragraph}>
                Aplikacija je besplatna, anonimna i dostupna svima. Njen cilj je da približi osnovna pravna znanja svima koji nemaju lak pristup pravnim savetima.
            </Text>

            <Text style={styles.paragraph}>
                ⚠️ Mi ne pružamo zvanične pravne savete i ne možemo zameniti kontakt sa advokatom. U složenijim slučajevima, preporučujemo da se obratite pravnoj službi.
            </Text>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>← Nazad</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f4f4f8',
        flexGrow: 1
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 12
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        color: '#333'
    },
    linkButton: {
        backgroundColor: '#1e88e5',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center'
    },
    linkText: {
        color: '#fff',
        fontSize: 16
    },
    backButton: {
        marginTop: 24,
        alignItems: 'center'
    },
    backText: {
        color: '#1e88e5',
        fontSize: 14
    }
})
