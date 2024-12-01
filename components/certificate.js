import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const Certificate = ({ name, course, date }) => {
  return (
    <ImageBackground
      source={require("../assets/bg-certificat.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Icon />
        <Text style={styles.byline}>Certificate of completion</Text>

        <View style={styles.content}>
          <Text style={styles.text}>Awarded to</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>for completing:</Text>
          <Text style={styles.course}>{course}</Text>
        </View>

        {date && (
          <Text style={styles.date}>
            Issued on <Text style={styles.bold}>{date}</Text>
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

Certificate.defaultProps = {
  name: "James Lee",
  course: "Creating PDFs with React & Make.cm",
  date: "March 15, 2021",
};

const Icon = () => (
  <View style={styles.icon}>
    <Text>📜</Text>
    {/* Alternatively, add SVG or image assets as required */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    color: "#9AC9FF",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  byline: {
    position: "absolute",
    right: 20,
    top: 20,
    fontSize: 16,
    color: "#9AC9FF",
  },
  content: {
    alignItems: "center",
    marginTop: 60,
  },
  text: {
    fontSize: 16,
    color: "#9AC9FF",
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 20,
  },
  course: {
    fontSize: 22,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  date: {
    position: "absolute",
    bottom: 5,
    fontSize: 12,
    color: "#9AC9FF",
  },
  bold: {
    fontWeight: "700",
    color: "#9AC9FF",
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 20,
  },
});

export default Certificate;
