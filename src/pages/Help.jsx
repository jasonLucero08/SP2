import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import p1 from "../images/help/01.png";
import p2 from "../images/help/02.png";
import p3 from "../images/help/03.png";
import p4 from "../images/help/04.png";
import p5 from "../images/help/05.png";
import p6 from "../images/help/06.png";
import p7 from "../images/help/07.png";
import p8 from "../images/help/08.png";
import p9 from "../images/help/09.png";
import p10 from "../images/help/10.png";
import p11 from "../images/help/11.png";
import p12 from "../images/help/12.png";
import p13 from "../images/help/13.png";
import p14 from "../images/help/14.png";
import p15 from "../images/help/15.png";
import p16 from "../images/help/16.png";
import p17 from "../images/help/17.png";
import p18 from "../images/help/18.png";
import p19 from "../images/help/19.png";
import p20 from "../images/help/20.png";
import p21 from "../images/help/21.png";
import p22 from "../images/help/22.png";
import p23 from "../images/help/23.png";
import p24 from "../images/help/24.png";
import p25 from "../images/help/25.png";
import p26 from "../images/help/26.png";
import p27 from "../images/help/27.png";
import p28 from "../images/help/28.png";
import p29 from "../images/help/29.png";
import p30 from "../images/help/30.png";
import p31 from "../images/help/31.png";
import p32 from "../images/help/32.png";
import p33 from "../images/help/33.png";
import p34 from "../images/help/34.png";
import p35 from "../images/help/35.png";
import p36 from "../images/help/36.png";
import p37 from "../images/help/37.png";
import p38 from "../images/help/38.png";
import p39 from "../images/help/39.png";
import p40 from "../images/help/40.png";
import p41 from "../images/help/41.png";
import p42 from "../images/help/42.png";

import home_w from "../images/home_white.png";

export default function Help() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("interface");

  const handleSetActive = (tab) => {
    setActiveTab(tab);
  };

  const handleHomeBtnClick = () => {
    navigate({ pathname: "/" });
  };

  return (
    <div className="flex flex-col bg-stone-bg bg-cover w-screen h-screen place-items-center">
      <div className="flex relative w-screen h-min z-20 bg-stone-bg bg-cover place-items-center">
        <div className="flex h-3/4">
          <div
            className={`flex relative place-items-center p-7 gap-5 bg-[rgba(0,156,223,255)] rounded-e-xl outline outline-yellow-300 outline-2`}
          >
            <div className="flex flex-row gap-5 place-items-center place-content-center">
              <img
                src={home_w}
                alt="home"
                className="w-8 z-10 cursor-pointer"
                onClick={handleHomeBtnClick}
              />
              <span className="z-30 text-3xl text-white">Help</span>
            </div>
          </div>
        </div>
      </div>
      {/* End of Header */}

      <div className="flex flex-col place-items-center place-content-center w-full h-full bg-scroll-bg outline outline-2 outline-amber-900 text-amber-950 p-5 overflow-hidden">
        <div className="flex flex-col place-items-center bg-white w-full h-full rounded-xl outline outline-2 outline-amber-900 overflow-hidden gap-2">
          <div className="flex overflow-hidden">
            <div className="flex flex-col w-1/4">
              <button
                className="text-[5vh] flex p-5 cursor-pointer active:underline focus:underline focus:bg-gray-100 rounded-e-full h-fit w-full"
                onClick={() => handleSetActive("interface")}
              >
                Interface
              </button>

              <button
                className="text-[5vh] flex p-5 cursor-pointer active:underline focus:underline focus:bg-gray-100 rounded-e-full h-fit w-full"
                onClick={() => handleSetActive("singleplayer")}
              >
                Singleplayer
              </button>

              <button
                className="text-[5vh] flex p-5 cursor-pointer active:underline focus:underline focus:bg-gray-100 rounded-e-full h-fit w-full"
                onClick={() => handleSetActive("headon")}
              >
                Head On
              </button>

              <button
                className="text-[5vh] flex p-5 cursor-pointer active:underline focus:underline focus:bg-gray-100 rounded-e-full h-fit w-full"
                onClick={() => handleSetActive("about")}
              >
                About
              </button>
            </div>
            <div className="flex flex-col w-3/4">
              {activeTab === "interface" && (
                <div className="flex flex-col p-5 gap-10 overflow-hidden overflow-y-scroll  text-xl text-center">
                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p1} className="w-10vw" />
                    <span className="py-2">This is the homepage</span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p2} className="w-10vw" />
                    <span className="py-2">
                      This button leads you to the Profile page, where you can
                      see the user's information and change the character
                      equipped.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p3} className="w-10vw" />
                    <span className="py-2">
                      This is the Profile page. You can see the Player's
                      Information on the left, and the Unlocked Characters on
                      the right.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p4} className="w-10vw" />
                    <img src={p5} className="w-10vw" />
                    <span className="py-2">
                      You can select a character here and equip that character
                      using the button that appears.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p6} className="w-10vw" />
                    <span className="py-2">
                      This button leads you to the Singleplayer Level Selection.
                      Here you can select a level corresponding to a CMSC 56
                      lesson.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p7} className="w-10vw" />
                    <span className="py-2">
                      This is the Level Selection page. Unlocked levels that you
                      can play are colored while locked levels are grayed. You
                      can return back home using the top-left button. You can
                      also see your username on the top-right.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p8} className="w-10vw" />
                    <span className="py-2">
                      This is a Singleplayer game level.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p9} className="w-10vw" />
                    <span className="py-2">
                      This is the timer for every question. It counts down from
                      30 seconds.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p10} className="w-10vw" />
                    <span className="py-2">
                      This is where the level shows the question.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p11} className="w-10vw" />
                    <span className="py-2">
                      This is the player's card. It shows the player's stats.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p12} className="w-10vw" />
                    <span className="py-2">
                      This is the player's card. It shows the player's username,
                      equipped character, remaining HP, and score for the level.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p13} className="w-10vw" />
                    <span className="py-2">
                      This is the question number. There is also a button which
                      plays the user's selected card from the choices.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p14} className="w-10vw" />
                    <span className="py-2">This is one of the choices.</span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p15} className="w-10vw" />
                    <span className="py-2">
                      A user can select or deselect a card by clicking on it.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p16} className="w-10vw" />
                    <span className="py-2">
                      Once selected, a user can play the card using the green
                      button.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p17} className="w-10vw" />
                    <span className="py-2">
                      Once played, the user is shown the correct answers.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p19} className="w-10vw" />
                    <span className="py-2">
                      This is the Win modal that shows the stars earned and
                      score the user has earned once they win a level. They can
                      retry the level or exit to the level selection using the
                      corresponding buttons.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p20} className="w-10vw" />
                    <span className="py-2">
                      This is the Game Over Modal that shows up when the user
                      scores a 0. They can retry the level or exit to the level
                      selection using the corresponding buttons.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p21} className="w-10vw" />
                    <span className="py-2">
                      This button leads to the Head On Lobby. This leads to the
                      Multiplayer functionality of the application.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p22} className="w-10vw" />
                    <span className="py-2">
                      This is the Head On Lobby. Users can create or join a room
                      here.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p23} className="w-10vw" />
                    <span className="py-2">
                      Once room is created, a prompt is shown with the
                      corresponding room code which another user can use to join
                      the room.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p24} className="w-10vw" />
                    <span className="py-2">
                      Pressing the Join Room button, a prompt is shown where the
                      user can enter the room code.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p25} className="w-10vw" />
                    <img src={p26} className="w-10vw" />
                    <img src={p27} className="w-10vw" />
                    <span className="py-2">
                      This is the Head On Level. It is almost the same as the
                      Singleplayer level, but you can see your enemy's card and
                      stats instead of the game master. An indicator is also
                      shown whether the user or the enemy has picked a card.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p28} className="w-10vw" />
                    <span className="py-2">
                      This is the Win Modal for Head On. The user can exit to
                      the home screen using the button.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p29} className="w-10vw" />
                    <span className="py-2">
                      This is the Game Over Modal for Head On. The user can exit
                      to the home screen using the button.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p30} className="w-10vw" />
                    <span className="py-2">This button leads to the shop.</span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p31} className="w-10vw" />
                    <span className="py-2">This is the Shop interface.</span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p32} className="w-10vw" />
                    <img src={p33} className="w-10vw" />
                    <span className="py-2">
                      On the left, the user can see their current star count.
                      The user is also given a character preview card where they
                      can see the character they clicked on and/or a buy button
                      if the character has not been bought or a prompt that the
                      character has been bought. The name and cost of the
                      character is also shown here.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p34} className="w-10vw" />
                    <span className="py-2">
                      On the right, the user can see a catalogue of characters
                      they can unlock using the stars they have earned. The
                      picture, name, and star cost is shown per character.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p35} className="w-10vw" />
                    <span className="py-2">
                      This button leads to the Leaderboard page.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p36} className="w-10vw" />
                    <span className="py-2">
                      This is the leaderboard for total stars collected. The
                      name and total stars collected are shown and sorted per
                      user.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p37} className="w-10vw" />
                    <span className="py-2">
                      This is the leaderboard for total characters unlocked. The
                      name and total characters unlocked are shown and sorted
                      per user.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p38} className="w-10vw" />
                    <span className="py-2">
                      This is the leaderboard for Head On win rate. The name and
                      the Head On win rate are shown and sorted per user.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p39} className="w-10vw" />
                    <span className="py-2">
                      This leads to the Help section. It contains the how to
                      play and about section.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p40} className="w-10vw" />
                    <span className="py-2">This is the logout button.</span>
                  </div>
                </div>
              )}
              {activeTab === "singleplayer" && (
                <div className="flex flex-col p-5 gap-10 overflow-hidden overflow-y-scroll  text-xl text-center">
                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p8} className="w-10vw" />
                    <span className="py-2">
                      This is the Singleplayer level. The goal is to gain
                      scores. Getting an 80% score gives the user three (3)
                      stars. Getting a 60% score gives the user two (2) stars. A
                      score under that gives the user one (1) star. The user is
                      given thirty (30) seconds to answer every question. If the
                      user scores a zero (0), the game will be over and they
                      will have to restart the level to progress to other levels
                      in the Singleplayer game.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p15} className="w-10vw" />{" "}
                    <img src={p16} className="w-10vw" />
                    <span className="py-2">
                      The user can select or deselect a choice card by clicking
                      on it. To play the selected choice card, the user should
                      click on the green Play Card button. This determines that
                      this is the user's answer to the question.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p17} className="w-10vw" />
                    <img src={p18} className="w-10vw" />
                    <span className="py-2">
                      After playing the card, the user is shown the correct
                      answers for a short time. The user's health is deduced if
                      they answered incorrectly, while they gain a point to
                      their score if they answered correctly.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p19} className="w-10vw" />
                    <span className="py-2">
                      If the user has won, they win stars corresponding to the
                      score number. The user can automatically go to the next
                      level using the button, or exit back to the level
                      selecction page.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p20} className="w-10vw" />
                    <span className="py-2">
                      If the user loses, they do not earn any stars. They have
                      to retry the level in order to progress to the next level.
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "headon" && (
                <div className="flex flex-col p-5 gap-10 overflow-hidden overflow-y-scroll  text-xl text-center">
                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p22} className="w-10vw" />
                    <img src={p23} className="w-10vw" />
                    <img src={p24} className="w-10vw" />
                    <span className="py-2">
                      This is the Head On Lobby. A user can create a room where
                      another user can join for their Head On match. A user can
                      create a room and the resulting room code can be used by
                      another user to join that exact room.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black">
                    <img src={p25} className="w-10vw" />
                    <span className="py-2">
                      Once the user has joined, both users are transferred to
                      the Head On game level. This is a 1 vs. 1 multiplayer game
                      with a "Last Man Standing" type of gameplay. Both users
                      are given thirty (30) secconds each to answer the
                      question. Whenever a user answers incorrectly, their
                      health is reduced. If the user's health is reduced to 0,
                      they will lose and the other user will win. The winner can
                      win two (2) stars in every Head On game.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p26} className="w-10vw" />
                    <img src={p27} className="w-10vw" />
                    <span className="py-2">
                      There is an indicator to show the users if they have
                      played a card. The correct answers are not shown and the
                      user's and enemy's stats are not updated unless both of
                      the users have played a card.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p41} className="w-10vw" />
                    <span className="py-2">
                      In this scenario, both users have already pplayed a card,
                      thus the indicators are gone and the answers are shown.
                      The stat updates are shown for the user.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p28} className="w-10vw" />
                    <span className="py-2">
                      If one of the user survives longer than the other, they
                      win two (2) stars. These can be used to unlock characters.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p29} className="w-10vw" />
                    <span className="py-2">
                      If one of the users dies, this user will lose. This user
                      will not gain any stars.
                    </span>
                  </div>

                  <div className="flex flex-col place-items-center border-b-2 border-black gap-1">
                    <img src={p42} className="w-10vw" />
                    <span className="py-2">
                      In this scenario, one of the users have left the room. The
                      win is automatically given to the user that is still in
                      the room.
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "about" && (
                <div className="flex flex-col p-5 gap-10 overflow-hidden overflow-y-scroll  text-3xl text-center">
                  <div className="flex flex-col place-items-center">
                    The creator of this app is Matthew Jason A. Lucero. A batch
                    2020 Computer Science student. He is a member of UPLB COSS
                    and a DOST-SEI Scholar.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
