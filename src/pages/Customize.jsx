import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getImages, setCharacterSelected } from "../hooks/Hooks";

import Header from "../components/Header";
import star from "../images/star.png";
import { supabase } from "../supabaseClient";

import shop from "../images/shop.png";

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

      <div className="flex flex-row w-screen h-screen gap-5 place-content-center place-items-center p-10 overflow-hidden">
        <div className="flex flex-col w-1/3 gap-3 p-10 ">
          {userInfo && selectedImg && selectedImgName && (
            <div className="flex flex-col px-6 py-10 place-items-center bg-white rounded-xl gap-5">
              <img src={selectedImg} className="rounded w-2/3" />
              <div className="flex w-full place-content-center place-items-center">
                <span className="flex grow text-xl font-bold">
                  {selectedImgName}
                </span>
                <span className="flex flex-row gap-2 text-xl font-bold">
                  Cost: <img src={star} className="w-6 h-6" />
                  {selectedCharacterCost}
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

        <div className="flex flex-col relative w-2/3 h-full bg-white overflow-hidden rounded-xl">
          <div className="flex text-black bg-amber-500 place-content-center place-items-center p-5 gap-10">
            <div className="flex flex-row place-items-center gap-10 grow px-5">
              <img src={shop} className="w-20" />
              <span className="text-5xl text-white">Shop</span>
            </div>
            {userInfo && (
              <div className="flex flex-row w-2/5 h-4/5 bg-white place-content-center place-items-center gap-2 rounded-xl">
                <span>Your Current Stars:</span>
                <img src={star} className="w-6 h-6" />
                <span className="text-xl font-bold">
                  {userInfo.currentStars}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-5 gap-5 bg-gray-300 overflow-hidden overflow-y-scroll p-5 h-full">
            {images !== null && (
              <>
                {images.map((image) => {
                  var cost;
                  Object.values(characterCosts).forEach((element) => {
                    if (imgBucketUrl + image.name === element.imgUrl) {
                      cost = element.characterCost;
                    }
                  });
                  return (
                    <button
                      className="flex flex-col gap-5 h-fit w-full bg-white place-content-center place-items-center p-5 rounded-md"
                      onClick={() => handleImgClick(image)}
                      key={image.id}
                      // disabled={handleDisabled(image)}
                    >
                      <img
                        className="w-5/6 rounded"
                        src={imgBucketUrl + image.name}
                      />
                      <div className="flex flex-row w-full gap-1 place-items-center">
                        <span className="flex grow ">
                          {image.name.split(".").slice(0, -1).join(".")}
                        </span>
                        <img src={star} className="w-4 h-4" />
                        <span>{cost}</span>
                      </div>
                    </button>
                  );
                })}{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
