import { supabase } from "../client";

const getUserInfo = async (id) => {
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  if (data) {
    return data;
  }
};

export { getUserInfo };
