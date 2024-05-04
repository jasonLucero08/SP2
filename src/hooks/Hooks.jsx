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

const saveScorePerLevel = async (
  userid,
  levelsUnlocked,
  levelStars,
  starTotal
) => {
  try {
    const { error } = await supabase
      .from("profile")
      .update({
        levelsUnlocked: levelsUnlocked,
        levelStars: levelStars,
        totalStars: starTotal,
      })
      .eq("id", userid);

    if (error) {
      throw error;
    }
  } catch (err) {
    console.error("Error fetching level data:", err.message);
  }
};

export { getUserInfo, getQuestionsPerLevel, saveScorePerLevel };
