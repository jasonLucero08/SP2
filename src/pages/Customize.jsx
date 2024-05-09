import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getImages, setCharacterSelected } from "../hooks/Hooks";

import Header from "../components/Header";

const imgBucketUrl =
  "https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/playable-characters/";

export default function Customize() {
  const { session } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [images, setImages] = useState([]);

  const [characterImg, setCharacterImg] = useState(null);

  const showImages = async () => {
    const characterData = await getImages();
    setImages(characterData);
  };

  const handleImgClick = async (data) => {
    console.log(data);
    await setCharacterSelected(session?.user.id, imgBucketUrl + data.name);
  };

  const handleDisabled = (data) => {
    // console.log(userInfo.charactersUnlocked[imgBucketUrl + data.name]);
    if (userInfo.charactersUnlocked[imgBucketUrl + data.name] === "true") {
      return false;
    } else if (
      userInfo.charactersUnlocked[imgBucketUrl + data.name] === "false"
    ) {
      return true;
    }
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
  }, [images]);

  return (
    <div className="h-screen w-screen flex flex-col place-items-center place-content-center gap-11 bg-slate-900">
      <Header
        pageTitle="HOME"
        username={username}
        profilePicture={characterImg}
      />

      <span className="w-20 h-20 absolute left-2 bg-white">
        {userInfo.totalStars}
      </span>

      {images !== null && (
        <div className="grid grid-cols-5 w-screen h-screen place-items-center place-content-center mt-10 gap-3">
          {images.map((image) => {
            return (
              <button
                className="w-50 h-50 bg-white p-2 hover:cursor-pointer"
                onClick={() => handleImgClick(image)}
                key={image.id}
                disabled={handleDisabled(image)}
              >
                <img
                  className="w-20 h-20 outline outline-1"
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
  );
}
