import { supabase } from "../supabaseClient";

const getUserInfo = async (id) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error fetching user information:", err.message);
    return null;
  }
};

const getQuestionsPerLevel = async (levelid) => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select()
      .eq("levelId", levelid);

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error fetching level data:", err.message);
    return null;
  }
};

export { getUserInfo, getQuestionsPerLevel };
