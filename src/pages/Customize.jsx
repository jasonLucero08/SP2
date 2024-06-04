import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getImages, setCharacterSelected } from "../hooks/Hooks";

import Header from "../components/Header";
import star from "../images/star.png";
import { supabase } from "../supabaseClient";

import shop from "../images/shop.png";
import shop_banner from "../images/shopBanner.png";

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
    <div className="h-screen w-screen flex flex-col place-items-center bg-stone-bg bg-cover">
      <Header
        pageTitle="Buy Characters"
        username={username}
        profilePicture={characterImg}
        titleColor={"bg-amber-500"}
      />

      <img src={shop_banner} className="w-2/5" />

      <div className="flex flex-row w-screen h-screen gap-5 place-content-center place-items-center p-5 overflow-hidden">
        <div className="flex flex-col w-2/5 h-full gap-2">
          {userInfo && (
            <div className="flex flex-row w-full h-full bg-scroll-bg text-amber-900 bg-cover outline outline-3 outline-amber-900 place-content-center place-items-center gap-2 p-3 rounded-xl">
              <span className="text-2xl">Your Current Stars:</span>
              <img src={star} className="w-6 h-6" />
              <span className="text-xl font-bold">{userInfo.currentStars}</span>
            </div>
          )}
          {userInfo && selectedImg && selectedImgName && (
            <div className="flex flex-col w-full h-full place-items-center bg-scroll-bg bg-cover outline outline-amber-900 text-amber-900 rounded-xl p-5 gap-5">
              <span className="flex text-3xl shadow drop-shadow-2xl w-full place-content-center">
                Character Preview
              </span>
              <div className="flex flex-row">
                <div className="flex flex-col place-items-center gap-5 w-full h-fit">
                  <img
                    src={selectedImg}
                    className="rounded w-11/2 outline outline-amber-900"
                  />
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
                <div className="flex flex-col w-full place-items-center place-content-center gap-14">
                  <div className="flex flex-col text-center w-full gap-3">
                    <span className="text-2xl underline underline-offset-4">
                      Character Name:
                    </span>
                    <span className="text-3xl font-bold ">
                      {selectedImgName}
                    </span>
                  </div>

                  <div className="flex flex-col w-full place-items-center place-content-center gap-3">
                    <span className="text-2xl underline underline-offset-4">
                      Cost:
                    </span>
                    <span className="flex flex-row gap-2 text-3xl font-bold place-items-center">
                      <img src={star} className="w-6 h-6" />
                      {selectedCharacterCost}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col relative w-3/5 h-full overflow-hidden rounded-xl outline outline-2 outline-amber-900 text-white">
          <div className="grid grid-cols-4 gap-5 bg-scroll-bg overflow-hidden overflow-y-scroll p-5 h-full">
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
                      className="flex flex-col gap-5 h-fit w-full bg-[rgb(168,77,20)] outline outline-2 outline-amber-900 place-content-center place-items-center p-5 rounded-md"
                      onClick={() => handleImgClick(image)}
                      key={image.id}
                      // disabled={handleDisabled(image)}
                    >
                      <img
                        className="w-5/6 rounded"
                        src={imgBucketUrl + image.name}
                      />
                      <div className="flex flex-row w-full gap-1 text-xl place-items-center">
                        <span className="flex grow">
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
