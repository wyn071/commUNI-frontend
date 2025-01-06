import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function PersonalityResultScreen() {
    const route = useRoute();
    const router = useRouter();
    const { userData } = route.params || {}; // Extracting userData from the route parameters
    console.log("We are now in the Personality Test Results screen");
    console.log("Here is what was received from the previous screen: ");
    console.log(userData);
    console.log("Here is what will be passed to the Interests screen: ");
    console.log(userData);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText} onPress={() => router.back()}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your personality type is:</Text>
                <Text style={styles.headerSubtitle}>Campaigner</Text>
                <Text style={styles.personalityType}>ENFP-T</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Introduction</Text>
                <Text style={styles.description}>
                    As an ENFP (Campaigner), you’re a true free spirit – outgoing, openhearted, and open-minded.
                    Your lively, upbeat energy makes you stand out in any crowd, and while you know how to have fun,
                    there’s so much more to you. You have a deep desire for meaningful, emotional connections with others,
                    and that’s what really drives you.
                </Text>

                <Text style={styles.sectionTitle}>Key Traits</Text>
                <View style={styles.traitsContainer}>
                    <Text style={styles.trait}>Enthusiastic</Text>
                    <Text style={styles.trait}>Creative</Text>
                    <Text style={styles.trait}>Social</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {/* Navigate to the interests.js screen and pass userData */}
                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={() => router.push({ pathname: 'interests', params: { userData } })}
                >
                    <Text style={styles.buttonText}>Choose your interests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]} onPress={() => router.navigate({ pathname: 'dashboard', params: { userData } })}>Find communities</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    backButtonText: {
        fontFamily: "Poppins-Bold",
        fontSize: 19,
        color: '#FFFFFF',
    },
    headerTitle: {
        fontFamily: "Inter-Regular",
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
    },
    headerSubtitle: {
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 24,
        // fontWeight: 'bold',
        marginTop: 5,
    },
    personalityType: {
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 5,
        fontWeight: '600',
    },
    content: {
        padding: 20,
        flex: 1, // Ensure the content takes up available space

    },
    sectionTitle: {
        fontFamily: "Poppins-Bold",

        fontSize: 16,
        // fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    description: {
        fontFamily: "Inter-Regular",
        textAlign: "justify",
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 15,
        paddingHorizontal: 5, // Add horizontal padding to prevent text cutoff

    },
    traitsContainer: {
        marginTop: 5,
        marginBottom: 35,
        paddingHorizontal: 5
    },
    trait: {
        fontSize: 14,
        color: '#333',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    buttonContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        borderRadius: 25,
        paddingVertical: 15,
        marginVertical: 5,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#635EE2',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryButtonText: {
        fontFamily: "Inter-Bold",
        color: '#000000',
    },
});
