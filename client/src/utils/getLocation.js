import axios from "axios";

export const getLocation = async () => {
  try {
    const { data } = await axios.get(
      `https://ipinfo.io?token=${import.meta.env.VITE_INFO_API_ACCESS_TOKEN}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
