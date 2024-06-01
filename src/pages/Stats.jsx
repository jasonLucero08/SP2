import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/Auth";
import Header from "../components/Header";

import star from "../images/star.png";
import unlocked_characters from "../images/unlockedChar.png";

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

  useEffect(() => {
    if (activeTab === "stars") {
      const charactersTab = document.getElementById("charactersTab");
      const starsTab = document.getElementById("starsTab");

      charactersTab.classList.remove("bg-white");
      charactersTab.classList.add("bg-gray-200");
      charactersTab.classList.add("border-b-2");
      starsTab.classList.remove("border-b-2");
    } else if (activeTab === "characters") {
      const charactersTab = document.getElementById("charactersTab");
      const starsTab = document.getElementById("starsTab");

      starsTab.classList.remove("bg-white");
      starsTab.classList.add("bg-gray-200");
      starsTab.classList.add("border-b-2");
      charactersTab.classList.remove("border-b-2");
    }
  }, [activeTab]);

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
        <div className="flex flex-col w-11/12 h-full overflow-hidden">
          <div className="flex flex-row w-full gap-2">
            <button
              id="starsTab"
              className={`flex grow bg-white rounded-t-lg p-4 place-items-center gap-4 border-black transition-all ${
                activeTab === "stars" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("stars")}
            >
              <img src={star} className="w-5" />
              <span className="text-xl font-bold">Stars</span>
            </button>
            <button
              className={`flex grow bg-white rounded-t-lg p-4 place-items-center gap-4 border-black transition-all ${
                activeTab === "characters" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("characters")}
              id="charactersTab"
            >
              <img src={unlocked_characters} className="w-5" />
              <span className="text-xl font-bold">Characters</span>
            </button>
          </div>
          <div className="flex flex-col bg-white h-full gap-4 p-5 overflow-y-scroll overflow-hidden">
            {allUsers.length > 0 &&
              allUsers.map((user) => (
                <div
                  className="flex bg-gray-200 p-7 rounded-lg place-items-center gap-7"
                  key={user.id}
                >
                  <img
                    src={user.selectedImgUrl}
                    className="w-16 rounded-full"
                  />
                  <span className="flex grow text-2xl">{user.username}</span>
                  <div className="flex place-content-center place-items-center gap-3">
                    {activeTab === "stars" ? (
                      <>
                        <img src={star} className="w-10" />{" "}
                        <span className="flex text-2xl">{user.totalStars}</span>
                      </>
                    ) : (
                      <>
                        <img src={unlocked_characters} className="w-10" />{" "}
                        <span className="flex text-2xl">
                          {user.totalCharactersUnlocked}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
