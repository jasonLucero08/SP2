import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getImages, setCharacterSelected } from "../hooks/Hooks";

import Header from "../components/Header";
import star from "../images/star.png";

const imgBucketUrl =
  "https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/playable-characters/";

export default function Customize() {
  const { session } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [images, setImages] = useState([]);

  const [characterImg, setCharacterImg] = useState(null);
  const [selectedImg, setSelectedImg] = useState(imgBucketUrl + "Kaius.jpg");
  const [selectedImgName, setSelectedImgName] = useState("Kaius");

  const showImages = async () => {
    const characterData = await getImages();
    setImages(characterData);
  };

  const handleImgClick = async (data) => {
    // await setCharacterSelected(session?.user.id, imgBucketUrl + data.name);
    setSelectedImg(imgBucketUrl + data.name);
    setSelectedImgName(data.name.split(".").slice(0, -1).join("."));
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

  const equip = async (data) => {
    await setCharacterSelected(session?.user.id, data);
  };

  const buy = async () => {
    // if (userInfo.totalStars)
  };

  useEffect(() => {
    async function get() {
      try {
        const userData = await getUserInfo(session?.user.id);
        setUserInfo(userData);
        setUsername(userData.username);
        setCharacterImg(userData.selectedImgUrl);
        showImages();
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }

    get();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row place-items-center place-content-center gap-10 bg-slate-900">
      <Header
        pageTitle="Select Your Character"
        username={username}
        profilePicture={characterImg}
      />

      <div className="flex flex-col h-screen w-1/3 ml-10 place-content-center gap-3">
        {userInfo && (
          <div className="flex flex-row w-20 h-10 mt-5 bg-white place-content-center place-items-center gap-2 rounded-xl">
            <img src={star} className="w-6 h-6" />
            <span className="text-xl font-bold">{userInfo.totalStars}</span>
          </div>
        )}
        {userInfo && selectedImg && selectedImgName && (
          <div className="flex flex-col h-fit p-6 place-content-center place-items-center bg-white rounded-xl gap-5">
            <img src={selectedImg} className="rounded" />
            <span className="text-xl font-bold">{selectedImgName}</span>
            <div className="flex flex-row w-full gap-3">
              {/* {!handleEquipDisabled(selectedImg) && ( */}
              <button
                className="flex w-full bg-green-500 place-content-center text-white p-2 rounded-full"
                onClick={() => equip(selectedImg)}
              >
                Equip
              </button>
              {/* )} */}
              {/* {!handleBuyDisabled(selectedImg) && ( */}
              <button
                className="flex w-full bg-red-500 place-content-center text-white p-2 rounded-full"
                // onClick={buy()}
              >
                Buy
              </button>
              {/* )} */}
            </div>
          </div>
        )}
      </div>

      <div className="flex h-screen w-2/3 bg-slate-500 place-content-center place-self-end">
        {images !== null && (
          <div className="grid grid-cols-5 place-items-center place-content-start mt-20 mb-5 p-3 gap-5 overflow-y-scroll">
            {images.map((image) => {
              return (
                <button
                  className="flex flex-col place-content-center place-items-center w-36 h-40 bg-white p-2 hover:cursor-pointer rounded gap-1"
                  onClick={() => handleImgClick(image)}
                  key={image.id}
                  // disabled={handleDisabled(image)}
                >
                  <img
                    className="w-28 h-28 rounded"
                    src={imgBucketUrl + image.name}
                  />
                  <span className="">
                    {image.name.split(".").slice(0, -1).join(".")}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
