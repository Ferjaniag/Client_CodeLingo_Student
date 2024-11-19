import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const ListOfPortfolios = ({ route }) => {
  const [state, setState] = useContext(AuthContext);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dataString = await AsyncStorage.getItem("@auth");
        const data = JSON.parse(dataString);
        setState(data);
      } catch (err) {
        console.error("Error fetching user from AsyncStorage", err);
      }
    };

    fetchUser();
  }, []);

  const fetchUserBadges = async (userId) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getuser/${userId}`);
      return response.data.badges;
    } catch (error) {
      console.error("Error fetching user badges:", error);
      throw error;
    }
  };

  const fetchBadgeDetails = async (badgeId) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getBadgeById/${badgeId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching badge details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadBadges = async () => {
      if (!state?.user?._id) return;

      setLoading(true);
      setError(null);

      try {
        const userBadges = await fetchUserBadges(state.user._id);
        const badgeDetailsPromises = userBadges.map((badge) => fetchBadgeDetails(badge.badgeId));
        const badgeDetails = await Promise.all(badgeDetailsPromises);
        setBadges(badgeDetails);
      } catch (error) {
        setError("Error loading badges");
      } finally {
        setLoading(false);
      }
    };

    loadBadges();
  }, [state?.user?._id]);


  //generating the pdf
 
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .title { text-align: center; font-size: 24px; margin-bottom: 20px; }
              .badge { margin: 10px 0; padding: 10px; border: 1px solid #ccc; }
              .badge-name { font-weight: bold; }
            </style>
          </head>
          <body>
            <h1 class="title">Portfolio</h1>
            <p><strong>Name:</strong> ${state?.user?.username || "Unknown"}</p>
            <p><strong>Email:</strong> ${state?.user?.email || "Unknown"}</p>
            <h2>Achievements</h2>
            ${
              badges.length > 0
                ? badges
                    .map(
                      (badge) =>
                        `<div class="badge">
                          <p class="badge-name">${badge.badgeName}</p>
                          <p>Awarded on: ${badge.dateAwarded || "N/A"}</p>
                        </div>`
                    )
                    .join("")
                : "<p>No badges available.</p>"
            }
          </body>
        </html>
      `;

      let generatePdf = async() => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });
        await shareAsync(file.uri);

      }

  const BadgeItem = ({ badge }) => (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{badge.badgeName}</Text>
      <Text style={styles.badgeDate}>{badge.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <View style={styles.content}>
  <Text style={styles.mainTitle}>Portfolio</Text>

  <Image source={require("../assets/user-icon.png")} style={styles.userIcon} />

  {state && state.user && (
    <View style={styles.centeredInfo}>
      <Text style={styles.userName}>{state.user.username}</Text>
      <Text style={styles.bio}>Aspiring developer and designer with a love for creativity and tech!</Text>
    </View>
  )}

<View style={styles.contactSection}>
  <Text style={styles.contactTitle}>Contact Me</Text>
  <View style={styles.contactInfo}>
    <Text style={styles.contactLabel}>Email:</Text>
    <Text style={styles.contactValue}>{state?.user?.email || 'Not Available'}</Text>
  </View>
</View>

<View style={styles.badgeSection}>
  <Text style={styles.badgeTitle}>Achievements</Text>
  {loading ? (
    <ActivityIndicator size="large" color="#35E9BC" style={styles.loader} />
  ) : error ? (
    <Text style={styles.errorText}>{error}</Text>
  ) : badges.length > 0 ? (
    <FlatList
      data={badges}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2} // Display badges in two columns
      renderItem={({ item }) => (
        <View style={styles.enhancedBadgeContainer}>
          <Text style={styles.enhancedBadgeName}>{item.badgeName}</Text>
          {item.dateAwarded && (
            <Text style={styles.badgeDate}>
              Awarded on {new Date(item.dateAwarded).toLocaleDateString()}
            </Text>
          )}
        </View>
      )}
      contentContainerStyle={styles.badgeList}
    />
  ) : (
    <Text style={styles.noBadgesText}>No badges yet! Keep going!</Text>
  )}
</View>

  <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={generatePdf} >
            <Text style={styles.buttonText}>Export PDF</Text>
          </TouchableOpacity>
  </View>
</View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1F1244", 
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 80,
      paddingBottom:80,

    },
    content: {
      width: "90%",
      backgroundColor: "#FFF7FC", 
      borderRadius: 15,
      padding: 20,
      marginTop: 50,
      marginBottom: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    //   marginVertical:50,

    },
    mainTitle: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#4CAF50",
      textAlign: "center",
      marginBottom: 20,
    },
    userIcon: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 15,
      alignSelf: "center",
    },
    centeredInfo: {
      alignItems: "center",
      marginBottom: 25,
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    bio: {
      fontSize: 16,
      color: "#555",
      textAlign: "center",
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    contactSection: {
        marginTop: 10, 
        padding: 10,
      backgroundColor: "#F4F4F4",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    contactTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 10,
    },
    contactInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    },
    contactLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    contactValue: {
      fontSize: 16,
      color: "#666",
    },
    badgeSection: {
      marginTop: 20,
      padding: 15,
      backgroundColor: "#F9F9F9",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    badgeTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
      textAlign: "center",
    },
    enhancedBadgeContainer: {
      flex: 1,
      margin: 8,
      padding: 12,
      backgroundColor: "#E9F7EF",
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    enhancedBadgeName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#2E7D32",
      textAlign: "center",
    },
    badgeDate: {
      fontSize: 14,
      color: "#666",
      marginTop: 5,
      textAlign: "center",
    },
    badgeList: {
      justifyContent: "space-between",
    },
    noBadgesText: {
      fontSize: 16,
      color: "#888",
      textAlign: "center",
      marginVertical: 10,
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#4CAF50",
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  

export default ListOfPortfolios;