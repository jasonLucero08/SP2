import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/Auth";

import Header from "../components/Header";

export default function Stats() {
  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);

  const [allUsers, setAllUsers] = useState(null);
  const [showStarsTab, setShowStarsTab] = useState(true);
  const [showCharsTab, setShowCharsTab] = useState(false);

  useEffect(() => {
    // async function go() {
    //   try {
    //     if (profile) {
    //       setUserInfo(profile);
    //       setUserName(profile.username);
    //       setCharacterImg(profile.selectedImgUrl);
    //       await getStarsLB();
    //     }
    //   } catch (error) {
    //     console.error("Error getting users:", error.message);
    //   }
    // }
    // go();
    if (profile) {
      setUserInfo(profile);
      setUserName(profile.username);
      setCharacterImg(profile.selectedImgUrl);
      getStarsLB();
    }
  }, [profile]);

  const getStarsLB = async () => {
    try {
      const { data, error } = await supabase.from("profile").select();
      if (error) {
        throw error;
      }
      if (data) {
        if (showStarsTab) {
          const sortedData = data.sort((a, b) => b.totalStars - a.totalStars);
          setAllUsers(sortedData);
        } else if (showCharsTab) {
          const sortedData = data.sort((a, b) => b.totalStars - a.totalStars);
          setAllUsers(sortedData);
        }
      }
    } catch (error) {
      console.error("Error getting users:", error.message);
    }
  };

  const handleStarsTabClick = () => {
    setShowStarsTab(true);
    setShowCharsTab(false);
  };

  const handleCharTabClick = () => {
    setShowCharsTab(true);
    setShowStarsTab(false);
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
              className="flex grow bg-white rounded-t-lg p-3"
              onClick={() => handleStarsTabClick()}
            >
              Stars
            </button>
            <button
              className="flex grow bg-white rounded-t-lg p-3"
              onClick={() => handleCharTabClick()}
            >
              Characters
            </button>
          </div>
          <div className="bg-white h-full">
            {allUsers &&
              allUsers.map((user) => {
                return (
                  <div className="flex" key={user.id}>
                    <span>{user.username}</span>
                    <span>{user.totalStars}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
