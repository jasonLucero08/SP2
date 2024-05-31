import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getImages, setCharacterSelected } from "../hooks/Hooks";

import Header from "../components/Header";
import star from "../images/star.png";
import { supabase } from "../supabaseClient";

const imgBucketUrl =
  "https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/playable-characters/";

export default function Customize() {
  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [images, setImages] = useState([]);

  const [characterImg, setCharacterImg] = useState(null);
  const [selectedImg, setSelectedImg] = useState(imgBucketUrl + "Kaius.jpg");
  const [selectedImgName, setSelectedImgName] = useState("Kaius");

  const [characterCosts, setCharacterCosts] = useState(null);
  const [selectedCharacterCost, setSelectedCharacterCost] = useState(0);
  const [bought, setBought] = useState(true);

  useEffect(() => {
    // async function get() {
    //   try {
    //     // const userData = await getUserInfo(profile.id);
    //     setUserInfo(userData);
    //     setUsername(userData.username);
    //     setCharacterImg(userData.selectedImgUrl);
    //     showImages();
    //     getCharacterCost();
    //   } catch (err) {
    //     console.error("Error: ", err.message);
    //   }
    // }

    // get();

    if (profile) {
      setUserInfo(profile);
      setUsername(profile.username);
      setCharacterImg(profile.selectedImgUrl);
      showImages();
      getCharacterCost();
    }
  }, [profile]);

  const showImages = async () => {
    const characterData = await getImages();
    setImages(characterData);
  };

  const getCharacterCost = async () => {
    try {
      const { data, error } = await supabase.from("characters").select();
      if (error) {
        throw error;
      }

      if (data) {
        setCharacterCosts(data);
      }
    } catch (error) {
      console.error("Error getting costs:", error.message);
    }
  };

  const handleImgClick = async (data) => {
    // await setCharacterSelected(session?.user.id, imgBucketUrl + data.name);
    setSelectedImg(imgBucketUrl + data.name);
    setSelectedImgName(data.name.split(".").slice(0, -1).join("."));
    Object.values(characterCosts).forEach((element) => {
      if (imgBucketUrl + data.name === element.imgUrl) {
        setSelectedCharacterCost(element.characterCost);
      }
    });

    if (profile.charactersUnlocked[imgBucketUrl + data.name] === "true") {
      setBought(true);
    } else {
      setBought(false);
    }
  };

  const handleEquipDisabled = (data) => {
    if (userInfo.charactersUnlocked[data] === "true") {
      return false;
    } else if (userInfo.charactersUnlocked[data] === "false") {
      return true;
    }
  };

  const handleBuyDisabled = (data) => {
    if (userInfo.charactersUnlocked[data] === "false") {
      return false;
    } else if (userInfo.charactersUnlocked[data] === "true") {
      return true;
    }
  };

  const buy = async () => {
    var updatedStars = 0;
    var updatedTotalCharsCount = 0;
    const charsUnlocked = profile.charactersUnlocked;
    if (profile.currentStars >= selectedCharacterCost) {
      updatedStars = profile.currentStars - selectedCharacterCost;
      updatedTotalCharsCount = profile.totalCharactersUnlocked + 1;
      charsUnlocked[selectedImg] = "true";

      try {
        const { error } = await supabase
          .from("profile")
          .update({
            charactersUnlocked: charsUnlocked,
            currentStars: updatedStars,
            totalCharactersUnlocked: updatedTotalCharsCount,
          })
          .eq("id", profile.id);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Error updating currentStars:", error.message);
      }
    } else {
      console.log("Cannot afford");
    }
    window.location.reload();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-bg bg-cover">
      <Header
        pageTitle="Select Your Character"
        username={username}
        profilePicture={characterImg}
      />

      <div className="flex flex-row w-full h-full gap-5 overflow-hidden place-content-center place-items-center">
        <div className="flex flex-col w-1/3 gap-3 p-10">
          {userInfo && (
            <div className="flex flex-row w-20 h-10 mt-5 bg-white place-content-center place-items-center gap-2 rounded-xl">
              <img src={star} className="w-6 h-6" />
              <span className="text-xl font-bold">{userInfo.currentStars}</span>
            </div>
          )}
          {userInfo && selectedImg && selectedImgName && (
            <div className="flex flex-col p-6 place-items-center bg-white rounded-xl gap-5">
              <img src={selectedImg} className="rounded w-2/3" />
              <div className="flex w-full place-content-center place-items-center">
                <span className="flex grow text-xl font-bold">
                  {selectedImgName}
                </span>
                <span className="text-xl font-bold">
                  Cost: {selectedCharacterCost}
                </span>
              </div>
              {bought ? (
                <span>bought</span>
              ) : (
                <button
                  className="flex w-full bg-red-500 place-content-center text-white p-2 rounded-full"
                  onClick={() => buy()}
                >
                  Buy
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-5 bg-slate-500 w-2/3 h-full p-10 overflow-hidden overflow-y-scroll">
          {images !== null && (
            <>
              {images.map((image) => {
                return (
                  <button
                    className="flex flex-col bg-white place-content-center place-items-center p-2 rounded-md"
                    onClick={() => handleImgClick(image)}
                    key={image.id}
                    // disabled={handleDisabled(image)}
                  >
                    <img
                      className="w-2/3 rounded"
                      src={imgBucketUrl + image.name}
                    />
                    <span className="">
                      {image.name.split(".").slice(0, -1).join(".")}
                    </span>
                  </button>
                );
              })}{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
