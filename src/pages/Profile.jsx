import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";
import star from "../images/star.png";
import white_card from "../images/white-card.png";
import check from "../images/check.png";
import unlocked_char from "../images/unlockedChar.png";

const imgBucketUrl =
  "https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/playable-characters/";

export default function Profile() {
  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);

  const [unlockedChars, setUnlockedChars] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgName, setSelectedImgName] = useState(null);

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

  const equip = async (data) => {
    // await setCharacterSelected(session?.user.id, data);
    try {
      const { error } = await supabase
        .from("profile")
        .update({ selectedImgUrl: data })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      setCharacterImg(data);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleImgClick = async (data) => {
    // await setCharacterSelected(session?.user.id, imgBucketUrl + data.name);
    // console.log(data);
    setSelectedImg(data);
    setSelectedImgName(data.split("/").pop().split(".")[0]);
  };

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
  }, [profile]);

  return (
    <div className="flex flex-col h-screen w-screen bg-stone-bg bg-cover place-content-center place-items-center gap-3">
      <Header
        isProfile={true}
        pageTitle="Profile"
        username={userName}
        profilePicture={characterImg}
      />

      {userInfo && (
        <div className="flex flex-row w-full h-full place-content-center place-items-center">
          <div className="flex w-1/2 h-full place-content-center place-items-center">
            <div className="flex flex-col relative w-3/4 h-max place-items-center place-content-center bg-white rounded-2xl p-5 py-8 gap-5">
              <span className="flex text-xl font-bold text-start  w-full">
                Player Information
              </span>
              {selectedImg ? (
                <img src={selectedImg} className="w-1/2 z-10 rounded" />
              ) : (
                <img
                  src={userInfo.selectedImgUrl}
                  className="w-1/2 z-10 rounded"
                />
              )}
              <div className="flex flex-col place-items-center z-10 w-full px-6 gap-2">
                <div className="flex w-full">
                  <div className="flex flex-col grow gap-0">
                    <span className="text-md">Username:</span>
                    <span className="text-xl font-bold">
                      {userInfo.username}
                    </span>
                  </div>
                  <div className="flex flex-col place-items-center place-content-center">
                    <span className="text-md">Total Stars:</span>
                    <div className="flex flex-row w-full place-items-center place-content-end gap-2">
                      <img src={star} className="w-6 h-6" />
                      <span className="text-xl font-bold">
                        {userInfo.totalStars}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full">
                  <div className="flex flex-col gap-0 grow">
                    <span className="text-md">Full Name:</span>
                    <span className="text-xl font-bold">
                      {userInfo.fullname}
                    </span>
                  </div>
                  <div className="flex flex-col place-items-center place-content-center">
                    <span className="text-md">Current Stars:</span>
                    <div className="flex flex-row w-full place-items-center place-content-end gap-2">
                      <img src={star} className="w-6 h-6" />
                      <span className="text-xl font-bold">
                        {userInfo.currentStars}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-0 w-full">
                  <span className="text-md">Email:</span>
                  <span className="text-xl font-bold">{userInfo.email}</span>
                </div>
              </div>
              {selectedImg && (
                <button
                  className="flex w-2/3 bg-green-500 place-content-center text-white p-2 rounded"
                  onClick={() => equip(selectedImg)}
                >
                  Equip
                </button>
              )}
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col relative place-content-center place-items-center">
            <div className="w-11/12 h-5/6 rounded-xl bg-gray-200 flex flex-col gap-5 overflow-hidden">
              <div className="flex font-bold bg-indigo-500 p-10 place-content-center place-items-center gap-5">
                <img src={unlocked_char} className="w-10" />
                <span className="text-3xl text-white">Unlocked Characters</span>
              </div>
              {unlockedChars && (
                <div className="grid grid-cols-4 place-items-center p-7 gap-5 w-full overflow-y-scroll overflow-hidden">
                  {unlockedChars.map((image) => {
                    return (
                      <button
                        className="flex flex-col relative place-content-center place-items-center w-36 h-40 bg-white p-2 hover:cursor-pointer rounded gap-1"
                        onClick={() => handleImgClick(image)}
                        key={image}
                        // disabled={handleDisabled(image)}
                      >
                        {profile.selectedImgUrl === image && (
                          <img
                            className="flex absolute right-0 bottom-0 w-6"
                            src={check}
                          />
                        )}
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
          </div>
        </div>
      )}
    </div>
  );
}
