import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/Auth";
import Header from "../components/Header";

import star from "../images/star.png";
import unlocked_characters from "../images/unlockedChar.png";
import percent from "../images/percent.png";

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
    const updateTabStyles = (tab, addClasses, removeClasses) => {
      const tabElement = document.getElementById(tab);
      if (tabElement) {
        addClasses.forEach((cls) => tabElement.classList.add(cls));
        removeClasses.forEach((cls) => tabElement.classList.remove(cls));
      }
    };

    if (activeTab === "stars") {
      const charactersTab = document.getElementById("charactersTab");
      const starsTab = document.getElementById("starsTab");
      const winRateTab = document.getElementById("winRateTab");

      charactersTab.classList.remove("bg-red-card-bg");
      charactersTab.classList.add("bg-gray-200");
      charactersTab.classList.add("border-b-2");
      winRateTab.classList.remove("bg-red-card-bg");
      winRateTab.classList.add("bg-gray-200");
      winRateTab.classList.add("border-b-2");
      starsTab.classList.remove("border-b-2");
    } else if (activeTab === "characters") {
      const charactersTab = document.getElementById("charactersTab");
      const starsTab = document.getElementById("starsTab");
      const winRateTab = document.getElementById("winRateTab");

      starsTab.classList.remove("bg-red-card-bg");
      starsTab.classList.add("bg-gray-200");
      starsTab.classList.add("border-b-2");
      winRateTab.classList.remove("bg-red-card-bg");
      winRateTab.classList.add("bg-gray-200");
      winRateTab.classList.add("border-b-2");
      charactersTab.classList.remove("border-b-2");
    } else if (activeTab === "winRate") {
      const charactersTab = document.getElementById("charactersTab");
      const starsTab = document.getElementById("starsTab");
      const winRateTab = document.getElementById("winRateTab");

      charactersTab.classList.remove("bg-red-card-bg");
      charactersTab.classList.add("bg-gray-200");
      charactersTab.classList.add("border-b-2");
      starsTab.classList.remove("bg-red-card-bg");
      starsTab.classList.add("bg-gray-200");
      starsTab.classList.add("border-b-2");
      winRateTab.classList.remove("border-b-2");
    }
  }, [activeTab]);

  const getLeaderboardData = async () => {
    try {
      const { data, error } = await supabase.from("profile").select();
      if (error) {
        throw error;
      }
      if (data) {
        const sortedData = data.sort((a, b) => {
          if (activeTab === "stars") {
            return b.totalStars - a.totalStars;
          } else if (activeTab === "characters") {
            return b.totalCharactersUnlocked - a.totalCharactersUnlocked;
          } else if (activeTab === "winRate") {
            return b.HeadOnWinRate - a.HeadOnWinRate; // Assuming headOnWinRate is a field in your data
          }
          return 0;
        });
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
        titleColor={"bg-red-600"}
      />

      {profile && (
        <div className="flex flex-col w-11/12 h-full overflow-hidden">
          <div className="flex flex-row w-full gap-2">
            <button
              id="starsTab"
              className={`flex grow bg-red-card-bg bg-cover rounded-t-lg p-4 place-items-center gap-4  border-black transition-all ${
                activeTab === "stars" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("stars")}
            >
              <img src={star} className="w-5" />
              <span className="text-xl font-bold">Total Stars Collected</span>
            </button>
            <button
              className={`flex grow bg-red-card-bg rounded-t-lg p-4 place-items-center gap-4 border-black transition-all ${
                activeTab === "characters" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("characters")}
              id="charactersTab"
            >
              <img src={unlocked_characters} className="w-5" />
              <span className="text-xl font-bold">
                Total Characters Unlocked
              </span>
            </button>
            <button
              id="winRateTab"
              className={`flex grow bg-red-card-bg rounded-t-lg p-4 place-items-center gap-4 border-black transition-all ${
                activeTab === "winRate" ? "active-tab-class" : ""
              }`}
              onClick={() => handleTabClick("winRate")}
            >
              <img src={percent} className="w-5" />
              <span className="text-xl font-bold">Head On Win Rate</span>
            </button>
          </div>
          <div className="flex flex-col bg-red-card-bg h-full gap-4 p-5 overflow-y-scroll overflow-hidden">
            {allUsers.length > 0 &&
              allUsers.map((user) => (
                <>
                  {user.username !== "admin-456" && (
                    <div
                      className="flex bg-white outline outline-red-800 outline-2 p-7 rounded-lg place-items-center gap-7 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                      key={user.id}
                    >
                      <img
                        src={user.selectedImgUrl}
                        className="w-16 rounded-full"
                      />
                      <span className="flex grow text-3xl">
                        {user.username}
                      </span>
                      <div className="flex place-content-center place-items-center gap-3">
                        {activeTab === "stars" ? (
                          <>
                            <img src={star} className="w-10" />{" "}
                            <span className="flex text-3xl">
                              {user.totalStars}
                            </span>
                          </>
                        ) : activeTab === "characters" ? (
                          <>
                            <img src={unlocked_characters} className="w-10" />{" "}
                            <span className="flex text-3xl">
                              {user.totalCharactersUnlocked}
                            </span>
                          </>
                        ) : (
                          <div className="flex flex-col place-items-end">
                            {/* <img src={win_rate} className="w-10" />{" "} */}
                            <span className="flex text-3xl text-emerald-600">
                              {user.HeadOnWinRate}%
                            </span>
                            <span>Out of {user.totalHeadOnGames} Games</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
