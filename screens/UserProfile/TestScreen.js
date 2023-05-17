import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR } from "../../constants/styles.js";
import CardDarker from "../../components/UI/CardDarker";
import Card from "../../components/UI/CardDarker";
import Background from "../../components/UI/BackgroundUnsafe";

export default function TestScreen() {
    return (
        <Background>
            <Text style = {styles.text}>We Are Under Construction</Text>
            <Text style = {styles.longText}>
            This screen will take you to current day of the itinerary.
            </Text>
            <Text style = {styles.longText}>
            The way this will be done is it will check the date of the system and check if there exists a corresponding date in any itinerary,
            and render that.
            </Text>
            <Text style = {styles.longText}>
            This will be implemented in the next update!
            </Text>
        </Background>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        color: "white",
        padding: 20,
        marginTop: 100,
    },
    longText: {
        fontSize: 20,
        color: "white",
        padding: 20,
    }
});
