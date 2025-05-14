import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function IntroScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dobrodošli</Text>

            <Text style={styles.description}>
                Ova aplikacija pruža osnovne informacije o pravima građana u Srbiji.{"\n\n"}
                Sadržaj je informativnog karaktera i ne predstavlja zvaničan pravni savet.{"\n\n"}
                U složenijim slučajevima, vaš upit može biti prosleđen pravnoj službi radi dodatne podrške.
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => navigation.navigate('Chat')}
                >
                    <Text style={styles.buttonText}>Započni razgovor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => navigation.navigate('Info')}
                >
                    <Text style={styles.buttonSecondaryText}>Pročitaj više</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        justifyContent: 'center',
        padding: 24
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 32
    },
    buttonContainer: {
        alignItems: 'center'
    },
    buttonPrimary: {
        backgroundColor: '#1e88e5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 12
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    buttonSecondary: {
        padding: 10
    },
    buttonSecondaryText: {
        color: '#1e88e5',
        fontSize: 14
    }
})
