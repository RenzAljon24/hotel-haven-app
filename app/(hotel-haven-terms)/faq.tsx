import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native'; 

const faqs = [
    {
        question: "1. What is HotelHaven?",
        answer: "HotelHaven is a hotel room booking service that allows users to find, compare, and book rooms."
    },
    {
        question: "2. Booking Process",
        answer: "Simply search for a hotel by entering a location or hotel name, browse the results, select a room, and click Book Now. You’ll be prompted to select dates and make payment."
    },
    {
        question: "3. Account and Profile",
        answer: "If you forget your password, click on the Forgot Password? link on the login screen and follow the instructions to reset it."
    },
    {
        question: "4. Can I delete my account?",
        answer: "Yes, you can delete your account by going to Profile - Account Security - Delete Account. Please note that once your account is deleted, all your data will be permanently removed."
    },
    {
        question: "5. What amenities does Hotel Haven offer?",
        answer: "We offer free Wi-Fi, air conditioning, a fitness center, and complimentary breakfast for all guests."
    }
];

const FAQs = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="green" />
                </TouchableOpacity>
                <Text style={styles.title}>FAQS</Text>
            </View>
            <ScrollView>
                {faqs.map((faq, index) => (
                    <View key={index} style={styles.faqItem}>
                        <Text style={styles.question}>{faq.question}</Text>
                        <View style={styles.answerContainer}>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f3f4f6',
    },
    header: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10, 
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'green', 
        textAlign: 'center',
        flex: 1, 
    },
    faqItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green', 
        marginBottom: 5,
    },
    answerContainer: {
        backgroundColor: '#fff', 
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
    },
    answer: {
        fontSize: 14,
        color: 'black', 
    },
});

export default FAQs;
