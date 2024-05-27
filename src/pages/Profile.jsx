import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getQuestionsPerLevel } from "../hooks/Hooks";
import { useImmerReducer } from "use-immer";

import Header from "../components/Header";
import LevelCard from "../components/LevelCard";

export default function Profile() {
  const navigate = useNavigate();

  const { session } = useAuth();

  const [userName, setUsername] = useState(null);
  const [cards, setCards] = useState([]);

  const [characterImg, setCharacterImg] = useState(null);

  useEffect(() => {
    async function get() {
      try {
        const userData = await getUserInfo(session?.user.id);
        setUsername(userData.username);
        setCharacterImg(userData.selectedImgUrl);
        setLevels(userData);
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }

    get();
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-900 place-content-center place-items-center">
      <Header
        pageTitle="Profile"
        username={userName}
        profilePicture={characterImg}
      />

      <div className=""></div>
    </div>
  );
}
