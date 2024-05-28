import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";
import star from "../images/star.png";

const imgBucketUrl =
  "https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/playable-characters/";

export default function Profile() {
  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);

  const [unlockedChars, setUnlockedChars] = useState(null);

  useEffect(() => {
    async function go() {
      if (profile) {
        setUserInfo(profile);
        setUserName(profile.username);
        setCharacterImg(profile.selectedImgUrl);
        await getImages(profile);
      }
    }

    go();
  }, []);

  const getImages = async (profile) => {
    try {
      const { data, error } = await supabase.storage
        .from("playable-characters")
        .list();

      if (error) {
        throw error;
      }

      if (data) {
        let charArray = [];
        data.forEach((image) => {
          let url = imgBucketUrl + image.name;
          if (profile.charactersUnlocked[url] === "true") {
            charArray.push(url);
          }
        });
        setUnlockedChars(charArray);
      }
    } catch (error) {
      console.error("Error getting images:", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 place-content-center place-items-center gap-3">
      <Header
        pageTitle="Profile"
        username={userName}
        profilePicture={characterImg}
      />

      {userInfo && (
        <>
          <div className="flex flex-row w-screen h-2/3 bg-gray-500">
            <img src={userInfo.selectedImgUrl} className="w-20 h-20" />
            <div className="flex flex-col">
              <span>{userInfo.username}</span>
              <span>{userInfo.fullname}</span>
              <span>{userInfo.email}</span>
              <div className="flex flex-row w-20 h-10 mt-5 bg-white place-content-center place-items-center gap-2 rounded-xl">
                <img src={star} className="w-6 h-6" />
                <span className="text-xl font-bold">{userInfo.totalStars}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-red-50">
            {unlockedChars && (
              <div className="flex place-items-center place-content-start mt-20 mb-5 p-3 gap-5 overflow-y-scroll">
                {unlockedChars.map((image) => {
                  return (
                    <button
                      className="flex flex-col place-content-center place-items-center w-36 h-40 bg-white p-2 hover:cursor-pointer rounded gap-1"
                      onClick={() => handleImgClick(image)}
                      key={image}
                      // disabled={handleDisabled(image)}
                    >
                      <img className="w-28 h-28 rounded" src={image} />
                      <span className="">
                        {image.split("/").pop().split(".")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
