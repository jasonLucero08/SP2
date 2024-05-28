import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../hooks/Auth";

import Header from "../components/Header";
import { all } from "axios";

export default function Stats() {
  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);

  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    async function go() {
      try {
        if (profile) {
          setUserInfo(profile);
          setUserName(profile.username);
          setCharacterImg(profile.selectedImgUrl);
          await getAllUsers();
        }
      } catch (error) {
        console.error("Error getting users:", error.message);
      }
    }
    go();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data, error } = await supabase.from("profile").select();
      if (error) {
        throw error;
      }
      if (data) {
        setAllUsers(data);
      }
    } catch (error) {
      console.error("Error getting users:", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 place-content-center place-items-center gap-3">
      {/* <Header
        pageTitle="Profile"
        username={userName}
        profilePicture={characterImg}
      /> */}

      {profile && (
        <div className="flex w-full h-full bg-red-50">
          {allUsers && (
            <div className="w-full h-20">
              {allUsers.map((person) => {
                return (
                  <span className="text-black" key={person.id}>
                    {person.username}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
