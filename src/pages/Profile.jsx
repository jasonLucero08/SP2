import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";
import star from "../images/star.png";
import white_card from "../images/white-card.png";
import check from "../images/check.png";
import unlocked_char from "../images/unlockedChar.png";
import unlocked_banner from "../images/unlockedCharBanner.png";
import playerinfo_banner from "../images/playerInfoBanner.png";

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
    <div className="flex flex-col h-screen w-screen bg-stone-bg bg-cover place-content-center place-items-center gap-3 font-titles">
      <Header
        isProfile={true}
        pageTitle="Profile"
        username={userName}
        profilePicture={characterImg}
        titleColor={"bg-[rgba(250,229,187,255)]"}
      />

      {userInfo && (
        <div className="flex flex-row w-full h-full place-content-center place-items-center overflow-hidden">
          <div className="flex flex-col relative w-1/2 h-full place-items-center gap-10">
            <img src={playerinfo_banner} className="w-5/6" />
            <div className="flex flex-row relative w-3/4 h-fit place-items-center place-content-center bg-scroll-bg rounded-lg p-5 py-8 outline outline-amber-900 text-amber-900 gap-5">
              <div className="flex flex-col place-content-center place-items-center gap-4 w-full h-full">
                {selectedImg ? (
                  <img
                    src={selectedImg}
                    className="flex w-full z-10 rounded outline outline-1 outline-amber-950"
                  />
                ) : (
                  <img
                    src={userInfo.selectedImgUrl}
                    className="flex w-full z-10 rounded outline outline-2 outline-amber-950"
                  />
                )}
                {selectedImg && (
                  <button
                    className="flex w-2/3 h-1/4 bg-emerald-600 outline outline-amber-950 outline-2 place-content-center text-white p-2 rounded"
                    onClick={() => equip(selectedImg)}
                  >
                    Equip
                  </button>
                )}
              </div>
              <div className="flex flex-col grow place-items-center z-10 w-full h-full gap-4">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col py-2 px-5 rounded-xl">
                    <span className="text-lg font-bold">Total:</span>
                    <div className="flex flex-row w-full gap-2 place-content-start place-items-center">
                      <img src={star} className="w-8 h-8" />
                      <span className="text-2xl">{userInfo.totalStars}</span>
                    </div>
                  </div>

                  <div className="flex grow"></div>

                  <div className="flex flex-col py-2 px-5 rounded-xl">
                    <span className="text-lg font-bold">Current:</span>
                    <div className="flex flex-row w-full place-items-center place-content-end gap-2">
                      <img src={star} className="w-8 h-8" />
                      <span className="text-2xl">{userInfo.currentStars}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-0 w-full">
                  <span className="text-md font-bold underline underline-offset-4">
                    Username:
                  </span>
                  <span className="text-xl">{userInfo.username}</span>
                </div>

                <div className="flex flex-col gap-0 w-full">
                  <span className="text-md font-bold underline underline-offset-4">
                    Full Name:
                  </span>
                  <span className="text-xl">{userInfo.fullname}</span>
                </div>

                <div className="flex flex-col gap-0 w-full">
                  <span className="text-md font-bold underline underline-offset-4">
                    Email:
                  </span>
                  <span className="text-xl">{userInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col relative place-items-center gap-10">
            <img src={unlocked_banner} className="w-5/6" />
            <div className="w-11/12 h-2/3 rounded-md bg-scroll-bg outline outline-amber-950 flex flex-col gap-5 overflow-hidden overflow-y-scroll">
              {/* <div className="flex font-bold bg-indigo-500 p-10 place-content-center place-items-center gap-5">
                <img src={unlocked_char} className="w-10" />
                <span className="text-3xl text-white">Unlocked Characters</span>
              </div> */}
              {unlockedChars && (
                <div className="grid grid-cols-4 place-items-center p-7 gap-5 w-full  overflow-hidden">
                  {unlockedChars.map((image) => {
                    return (
                      <button
                        className="flex flex-col relative place-content-center place-items-center w-36 h-40 bg-[rgb(168,77,20)] text-white outline outline-amber-900 outline-2 p-2 hover:cursor-pointer rounded gap-1"
                        onClick={() => handleImgClick(image)}
                        key={image}
                        // disabled={handleDisabled(image)}
                      >
                        {profile.selectedImgUrl === image && (
                          <img
                            className="flex absolute right-0 bottom-0 w-6 "
                            src={check}
                          />
                        )}
                        <img
                          className="w-28 h-28 rounded outline outline-amber-950 outline-1"
                          src={image}
                        />
                        <span className="text-xl">
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
