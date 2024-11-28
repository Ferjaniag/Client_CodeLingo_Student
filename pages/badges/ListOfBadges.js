import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ListOfBadges = ({ route }) => {
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
        setState(data); // Set the state from AsyncStorage
      } catch (err) {
        console.error("Error fetching user from AsyncStorage", err);
      }
    };

    fetchUser();
  }, []);

  const fetchUserBadges = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/getuser/${userId}`
      );
      return response.data.badges; // Return badges from response data
    } catch (error) {
      console.error("Error fetching user badges:", error);
      throw error; // Re-throw to handle it in the calling function
    }
  };

  const fetchBadgeDetails = async (badgeId) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/getBadgeById/${badgeId}`
      );
      return response.data; // Return badge data
    } catch (error) {
      console.error("Error fetching badge details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadBadges = async () => {
      if (!state?.user?._id) return; // Wait until state.user._id is available

      setLoading(true); // Start loading
      setError(null); // Reset error

      try {
        const userBadges = await fetchUserBadges(state.user._id); // Fetch user's badges
        const badgeDetailsPromises = userBadges.map((badge) =>
          fetchBadgeDetails(badge.badgeId)
        ); // Fetch badge details
        const badgeDetails = await Promise.all(badgeDetailsPromises); // Wait for all promises
        setBadges(badgeDetails); // Set badge details to state
      } catch (error) {
        setError("Error loading badges");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadBadges();
  }, [state?.user?._id]); // Watch for state.user._id to be defined

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/icon-back.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>My achievements</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#35E9BC" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.badgeList}>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badgeContainer}>
              <Image
                source={require("../../assets/silver-badge.png")}
                style={styles.badgeImage}
              />
              <Text style={styles.badgeTitle}>{badge.badgeName}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1244",
    alignItems: "center",
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    backgroundColor: "#2A1D4D",
    paddingVertical: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  badgeList: {
    padding: 20,
    alignItems: "center",
  },
  badgeContainer: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#2A1D4D",
    borderRadius: 10,
    padding: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  badgeImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  badgeTitle: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: "#35E9BC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
});

export default ListOfBadges;
