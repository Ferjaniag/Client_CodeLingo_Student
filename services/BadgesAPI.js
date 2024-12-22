import axios from "axios";

export const fetchUserBadges = async (userId) => {
  try {
    console.log("test");
    const response = await axios.get(
      `${process.env.API_URL}/getuser/${userId}`
    );
    const userData = await response.json();
    console.log(userData.badges);
    return userData.badges;
  } catch (error) {
    console.error("Error fetching userrr badges:", error);
  }
};

export const fetchBadgeDetails = async (badgeId) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/getBadgeById/${badgeId}`
    );
    const badgeData = await response.json();
    return badgeData;
  } catch (error) {
    console.error("Error fetching badge detaiils:", error);
  }
};
