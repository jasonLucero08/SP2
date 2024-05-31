import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/Auth";
import Header from "../components/Header";

export default function Stats() {
  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("stars");

  useEffect(() => {
    if (profile) {
      setUserInfo(profile);
      setUserName(profile.username);
      setCharacterImg(profile.selectedImgUrl);
      getLeaderboardData();
    }
  }, [profile, activeTab]);

  const getLeaderboardData = async () => {
    try {
      const { data, error } = await supabase.from("profile").select();
      if (error) {
        throw error;
      }
      if (data) {
        const sortedData = data.sort((a, b) =>
          activeTab === "stars"
            ? b.totalStars - a.totalStars
            : b.totalCharactersUnlocked - a.totalCharactersUnlocked
        );
        setAllUsers(sortedData);
      }
    } catch (error) {
      console.error("Error getting users:", error.message);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-stone-bg bg-cover place-content-center place-items-center gap-3">
      <Header
        pageTitle="Leaderboard"
        username={userName}
        profilePicture={characterImg}
      />

      {profile && (
        <div className="flex flex-col w-11/12 h-full">
          <div className="flex flex-row w-full gap-2">
            <button
              className={`flex grow bg-white rounded-t-lg p-3 ${
                activeTab === "stars" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("stars")}
            >
              Stars
            </button>
            <button
              className={`flex grow bg-white rounded-t-lg p-3 ${
                activeTab === "characters" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("characters")}
            >
              Characters
            </button>
          </div>
          <div className="bg-white h-full">
            {allUsers.length > 0 &&
              allUsers.map((user) => (
                <div className="flex" key={user.id}>
                  <span>{user.username}</span>
                  <span>
                    {activeTab === "stars"
                      ? user.totalStars
                      : user.totalCharactersUnlocked}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
