import axios from "axios";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

// Fetch user badges
export const fetchUserBadges = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/getuser/${userId}`
    );
    return response.data.badges;
  } catch (error) {
    console.error("Error fetching user badges:", error);
    throw error;
  }
};

// Fetch badge details
export const fetchBadgeDetails = async (badgeId) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/getBadgeById/${badgeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching badge details:", error);
    throw error;
  }
};

// Generate Portfolio HTML
export const generatePortfolioHtml = (user, badges) => {
  return `
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
        <p><strong>Name:</strong> ${user?.username || "Unknown"}</p>
        <p><strong>Email:</strong> ${user?.email || "Unknown"}</p>
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
};

// Generate PDF and Share
export const generateAndSharePdf = async (html) => {
  try {
    const file = await printToFileAsync({
      html,
      base64: false,
    });
    await shareAsync(file.uri);
  } catch (error) {
    console.error("Error generating or sharing PDF:", error);
    throw error;
  }
};
