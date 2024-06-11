import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import {
  getUserInfo,
  getQuestionsPerLevel,
  saveScorePerLevel,
} from "../hooks/Hooks";
import { useImmerReducer } from "use-immer";

import Header from "../components/Header";
import star from "../images/star.png";
import nonstar from "../images/nonstar.png";
import cardChar from "../images/card-filled.png";
import cardEn from "../images/card-simple.png";
import close from "../images/close.png";
import speech_bubble from "../images/speechbubble.png";
import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import arrow_w from "../images/arrow_white.png";
import red_card from "../images/red-levelCard.png";
import green_card from "../images/green-levelCard.png";

function ourReducer(draft, action) {
  switch (action.type) {
    case "startOver":
      draft.playing = true;
      draft.currentQuestion = getCurrentQuestion();
      draft.playerHealth = draft.questionsLength;
      draft.score = 0;
      draft.gameOver = false;
      draft.stars = 0;
      draft.win = false;
      draft.questionCounter = 1;

      window.location.reload();
      return;
    case "noChoiceClicked":
      draft.playerHealth -= 1;
      draft.currentQuestion = getCurrentQuestion();

      if (draft.currentQuestion == null && draft.score > 0) {
        draft.win = true;
      }

      if (draft.playerHealth <= 0) {
        draft.gameOver = true;
      }
      return;
    case "getNewQuestion":
      draft.currentQuestion = getCurrentQuestion();

      if (draft.currentQuestion == null && draft.score > 0) {
        draft.win = true;
      }
      return;
    case "guessAttempt":
      const threeStarLimit = 0.8 * draft.questionsLength;
      const twoStarLimit = 0.6 * draft.questionsLength;

      if (action.value === "false") {
        draft.playerHealth -= 1;
      } else {
        draft.score += 1;
      }

      if (draft.playerHealth <= 0) {
        draft.gameOver = true;
      } else if (draft.score >= threeStarLimit) {
        draft.stars = 3;
      } else if (draft.score >= twoStarLimit) {
        draft.stars = 2;
      } else {
        draft.stars = 1;
      }

      // console.log("Score: " + draft.score);
      // console.log("Stars: " + draft.stars);
      return;

    case "startPlaying":
      draft.playing = true;
      draft.currentQuestion = getCurrentQuestion();
      draft.playerHealth = draft.questionsLength;
      draft.score = 0;
      draft.gameOver = false;
      draft.stars = 0;
      draft.win = false;
      draft.questionCounter = 1;
      return;

    case "addToRandomQuestionsArr":
      draft.randomQuestions = draft.randomQuestions.concat(action.value);
      return;
  }

  // const startTimer = () => {};

  function getCurrentQuestion() {
    if (draft.currentQuestion) {
      draft.randomQuestions = draft.randomQuestions.splice(1);
    }

    if (draft.questionsLength == 0) {
      draft.questionsLength = draft.randomQuestions.length;
    }

    draft.questionCounter++;

    // console.log(draft.randomQuestions);
    // console.log(draft.randomQuestions.length);
    if (draft.randomQuestions.length == 0) {
      return null;
    } else {
      return draft.randomQuestions[0];
    }
  }
}

const initialState = {
  playing: false,
  randomQuestions: [],
  questionsLength: 0,
  score: 0,
  currentQuestion: null,
  playerHealth: 100,
  win: false,
  gameOver: false,
  stars: 0,
  questionCounter: 1,
};

export default function Level() {
  const location = useLocation();
  const navigate = useNavigate();

  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);

  const [characterImg, setCharacterImg] = useState(null);
  const [characterName, setCharacterName] = useState(null);

  const [enlargeImg, setEnlargeImg] = useState(false);

  const levelid = "L" + location.state.num;

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);
  const [choiceClicked, setChoiceClicked] = useState(false);

  const [questionForClicked, setQuestionForClicked] = useState(null);
  const [choiceForClicked, setChoiceForClicked] = useState(null);

  const getPageTitle = () => {
    switch (location.state.num) {
      case 1:
        setPageTitle("Level One");
        break;
      case 2:
        setPageTitle("Level Two");
        break;
      case 3:
        setPageTitle("Level Three");
        break;
      case 4:
        setPageTitle("Level Four");
        break;
      case 5:
        setPageTitle("Level Five");
        break;
      case 6:
        setPageTitle("Level Six");
        break;
      case 7:
        setPageTitle("Level Seven");
        break;
      case 8:
        setPageTitle("Level Eight");
        break;
      case 9:
        setPageTitle("Level Nine");
        break;
      case 10:
        setPageTitle("Level Ten");
        break;
      case 11:
        setPageTitle("Level Eleven");
        break;
      case 12:
        setPageTitle("Level Twelve");
        break;
      case 13:
        setPageTitle("Level Thirteen");
        break;
      default:
        setPageTitle(" ");
        break;
    }
  };

  const setLevelQuestions = (data) => {
    var sessionQuestionCount;
    if (data.length >= 20) {
      sessionQuestionCount = 20;
    } else {
      sessionQuestionCount = data.length;
    }
    var questionCount = 0;

    const questions = [];

    while (questionCount < sessionQuestionCount) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomElement = data[randomIndex];

      if (!questions.includes(randomElement)) {
        questions.push(randomElement);
        questionCount++;
      } else {
        continue;
      }
    }

    return questions;
  };

  const showButtonColors = (q) => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

    if (b1) {
      b1.classList.add(
        `${
          JSON.parse(q.choice1).v.toString() === "true"
            ? "bg-green-300"
            : "bg-red-300"
        }`
      );
      b1.classList.remove("bg-scroll-bg");
      b1.disabled = true;
    }

    if (b2) {
      b2.classList.remove("bg-scroll-bg");
      b2.classList.add(
        `${
          JSON.parse(q.choice2).v.toString() === "true"
            ? "bg-green-300"
            : "bg-red-300"
        }`
      );
      b2.disabled = true;
    }

    if (b3) {
      b3.classList.remove("bg-scroll-bg");
      b3.classList.add(
        `${
          JSON.parse(q.choice3).v.toString() === "true"
            ? "bg-green-300"
            : "bg-red-300"
        }`
      );
      b3.disabled = true;
    }

    if (b4) {
      b4.classList.remove("bg-scroll-bg");
      b4.classList.add(
        `${
          JSON.parse(q.choice4).v.toString() === "true"
            ? "bg-green-300"
            : "bg-red-300"
        }`
      );
      b4.disabled = true;
    }
  };

  const hideButtonColors = () => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

    if (b1) {
      b1.classList.remove("bg-green-300");
      b1.classList.remove("bg-red-300");
      b1.classList.add("bg-scroll-bg");
      b1.disabled = false;

      b1.classList.remove("h-full");
      b1.classList.add("h-2/3");
    }

    if (b2) {
      b2.classList.remove("bg-green-300");
      b2.classList.remove("bg-red-300");
      b2.classList.add("bg-scroll-bg");
      b2.disabled = false;

      b2.classList.remove("h-full");
      b2.classList.add("h-2/3");
    }

    if (b3) {
      b3.classList.remove("bg-green-300");
      b3.classList.remove("bg-red-300");
      b3.classList.add("bg-scroll-bg");
      b3.disabled = false;

      b3.classList.remove("h-full");
      b3.classList.add("h-2/3");
    }

    if (b4) {
      b4.classList.remove("bg-green-300");
      b4.classList.remove("bg-red-300");
      b4.classList.add("bg-scroll-bg");
      b4.disabled = false;

      b4.classList.remove("h-full");
      b4.classList.add("h-2/3");
    }
  };

  const handleCardClick = (q, choiceNum, cardNum) => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");
    const bPick = document.getElementById("pick-card");

    if (cardNum == 1) {
      if (b1) {
        if (b1.classList.contains("h-2/3")) {
          b1.classList.remove("h-2/3");
          b1.classList.add("h-full");
          setChoiceForClicked(1);
        } else {
          b1.classList.remove("h-full");
          b1.classList.add("h-2/3");
          setChoiceForClicked(null);
        }

        if (b2 && b2.classList.contains("h-full")) {
          b2.classList.remove("h-full");
          b2.classList.add("h-2/3");
        }

        if (b3 && b3.classList.contains("h-full")) {
          b3.classList.remove("h-full");
          b3.classList.add("h-2/3");
        }

        if (b4 && b4.classList.contains("h-full")) {
          b4.classList.remove("h-full");
          b4.classList.add("h-2/3");
        }
      }
    } else if (cardNum == 2) {
      if (b2) {
        if (b2.classList.contains("h-2/3")) {
          b2.classList.remove("h-2/3");
          b2.classList.add("h-full");
          setChoiceForClicked(2);
        } else {
          b2.classList.remove("h-full");
          b2.classList.add("h-2/3");
          setChoiceForClicked(null);
        }

        if (b1 && b1.classList.contains("h-full")) {
          b1.classList.remove("h-full");
          b1.classList.add("h-2/3");
        }

        if (b3 && b3.classList.contains("h-full")) {
          b3.classList.remove("h-full");
          b3.classList.add("h-2/3");
        }

        if (b4 && b4.classList.contains("h-full")) {
          b4.classList.remove("h-full");
          b4.classList.add("h-2/3");
        }
      }
    } else if (cardNum == 3) {
      if (b3) {
        if (b3.classList.contains("h-2/3")) {
          b3.classList.remove("h-2/3");
          b3.classList.add("h-full");
          setChoiceForClicked(3);
        } else {
          b3.classList.remove("h-full");
          b3.classList.add("h-2/3");
          setChoiceForClicked(null);
        }

        if (b2 && b2.classList.contains("h-full")) {
          b2.classList.remove("h-full");
          b2.classList.add("h-2/3");
        }

        if (b1 && b1.classList.contains("h-full")) {
          b1.classList.remove("h-full");
          b1.classList.add("h-2/3");
        }

        if (b4 && b4.classList.contains("h-full")) {
          b4.classList.remove("h-full");
          b4.classList.add("h-2/3");
        }
      }
    } else if (cardNum == 4) {
      if (b4) {
        if (b4.classList.contains("h-2/3")) {
          b4.classList.remove("h-2/3");
          b4.classList.add("h-full");
          setChoiceForClicked(4);
        } else {
          b4.classList.remove("h-full");
          b4.classList.add("h-2/3");
          setChoiceForClicked(null);
        }

        if (b2 && b2.classList.contains("h-full")) {
          b2.classList.remove("h-full");
          b2.classList.add("h-2/3");
        }

        if (b3 && b3.classList.contains("h-full")) {
          b3.classList.remove("h-full");
          b3.classList.add("h-2/3");
        }

        if (b1 && b1.classList.contains("h-full")) {
          b1.classList.remove("h-full");
          b1.classList.add("h-2/3");
        }
      }
    }
  };

  const handleChoicePick = () => {
    setChoiceClicked(true);
    showButtonColors(state.currentQuestion);
    clearInterval(intervalRef.current);

    if (choiceForClicked === 1) {
      dispatch({
        type: "guessAttempt",
        value: JSON.parse(state.currentQuestion.choice1).v.toString(),
      });
    } else if (choiceForClicked === 2) {
      dispatch({
        type: "guessAttempt",
        value: JSON.parse(state.currentQuestion.choice2).v.toString(),
      });
    } else if (choiceForClicked === 3) {
      dispatch({
        type: "guessAttempt",
        value: JSON.parse(state.currentQuestion.choice3).v.toString(),
      });
    } else if (choiceForClicked === 4) {
      dispatch({
        type: "guessAttempt",
        value: JSON.parse(state.currentQuestion.choice4).v.toString(),
      });
    } else if (choiceForClicked === null) {
      alert("Pick a card!");
    }

    setChoiceClicked(false);
    setChoiceForClicked(null);

    setTimeout(function () {
      hideButtonColors();
      dispatch({ type: "getNewQuestion" });
    }, 1500);
  };

  const handleNextLvlClick = async () => {
    var currScore = state.score;
    var currStars = state.stars;

    var levelsUnlockedJSON = null;
    var levelStarsJSON = null;
    var starsToAdd = 0;
    var nextLevelId = "";

    const userData = await getUserInfo(profile.id);
    var starTotal = userData.totalStars;
    var starCurrent = userData.currentStars;

    levelsUnlockedJSON = userData.levelsUnlocked;
    levelStarsJSON = userData.levelStars;

    if (currScore > levelsUnlockedJSON[levelid]) {
      if (levelid != "L13" && levelsUnlockedJSON[levelid] == 0) {
        const arr = levelid.split("");
        let lastElement = arr[arr.length - 1];
        const changedVal = parseInt(lastElement) + 1;
        arr[arr.length - 1] = changedVal.toString();
        nextLevelId = arr.join("");

        levelsUnlockedJSON[nextLevelId] = 0;
      }

      levelsUnlockedJSON[levelid] = currScore;
    }

    if (currStars > levelStarsJSON[levelid]) {
      if (levelid != "L13" && levelStarsJSON[levelid] == 0) {
        levelStarsJSON[nextLevelId] = 0;
      }

      starsToAdd = currStars - levelStarsJSON[levelid];
      starTotal += starsToAdd;
      starCurrent += starsToAdd;
      levelStarsJSON[levelid] = currStars;
    }

    await saveScorePerLevel(
      profile.id,
      levelsUnlockedJSON,
      levelStarsJSON,
      starTotal,
      starCurrent
    );

    dispatch({ type: "startOver" });

    const nextLevel = location.state.num + 1;
    // console.log(nextLevel);
    navigate("/singleplayer-level", { state: { num: nextLevel } });
  };

  const handleRetryClick = () => {
    dispatch({ type: "startOver" });
    navigate("/singleplayer-level", {
      state: { num: location.state.num },
    });
  };

  const handleExitBtnClick = async () => {
    var currScore = state.score;
    var currStars = state.stars;

    var levelsUnlockedJSON = null;
    var levelStarsJSON = null;
    var starsToAdd = 0;
    var nextLevelId = "";

    const userData = await getUserInfo(profile.id);
    var starTotal = userData.totalStars;
    var starCurrent = userData.currentStars;

    levelsUnlockedJSON = userData.levelsUnlocked;
    levelStarsJSON = userData.levelStars;

    if (currScore > levelsUnlockedJSON[levelid]) {
      if (levelid != "L13" && levelsUnlockedJSON[levelid] == 0) {
        const arr = levelid.split("");
        let lastElement = arr[arr.length - 1];
        const changedVal = parseInt(lastElement) + 1;
        arr[arr.length - 1] = changedVal.toString();
        nextLevelId = arr.join("");

        levelsUnlockedJSON[nextLevelId] = 0;
      }

      levelsUnlockedJSON[levelid] = currScore;
    }

    if (currStars > levelStarsJSON[levelid]) {
      if (levelid != "L13" && levelStarsJSON[levelid] == 0) {
        levelStarsJSON[nextLevelId] = 0;
      }

      starsToAdd = currStars - levelStarsJSON[levelid];
      starTotal += starsToAdd;
      starCurrent += starsToAdd;
      levelStarsJSON[levelid] = currStars;
    }

    await saveScorePerLevel(
      profile.id,
      levelsUnlockedJSON,
      levelStarsJSON,
      starTotal,
      starCurrent
    );

    navigate("/");
    window.location.reload();
  };

  const setCharacter = (data) => {
    setCharacterImg(data.selectedImgUrl);
    const b = data.selectedImgUrl.split("/");
    setCharacterName(b[b.length - 1].split(".").slice(0, -1).join("."));
  };

  // const handleQuesImgClick = (img) => {};
  const startTimer = () => {
    clearInterval(intervalRef.current);
    let timerValue = 30;
    setTimer(timerValue);

    intervalRef.current = setInterval(() => {
      const timerDiv = document.getElementById("timer");
      if (timerDiv) {
        if (timerDiv.classList.contains("bg-pink-600")) {
          timerDiv.classList.add("bg-emerald-600");
          timerDiv.classList.remove("bg-pink-600");
        }
      }
      timerValue--;
      setTimer(timerValue);
      if (timerValue <= 15) {
        if (timerDiv.classList.contains("bg-emerald-600")) {
          timerDiv.classList.add("bg-pink-600");
          timerDiv.classList.remove("bg-emerald-600");
        }
      }
      if (timerValue <= 0) {
        setEnlargeImg(false);
        clearInterval(intervalRef.current);

        if (!choiceClicked) {
          setTimeout(function () {
            dispatch({
              type: "noChoiceClicked",
            });
          }, 1500);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    getPageTitle();

    // getUserInfo(session?.user.id).then(function (res) {
    //   setUserInfo(res);
    //   setUsername(res?.username);
    //   setCharacter(res);
    // });

    if (profile) {
      setUserInfo(profile);
      setUsername(profile.username);
      setCharacter(profile);
    }

    async function go() {
      try {
        const levelData = await getQuestionsPerLevel(levelid);
        const levelQuestions = setLevelQuestions(levelData);
        dispatch({ type: "addToRandomQuestionsArr", value: levelQuestions });
        dispatch({ type: "startPlaying" });
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }

    go();
  }, []);

  useEffect(() => {
    startTimer();
    setChoiceClicked(false);
  }, [state.currentQuestion]);

  useEffect(() => {
    if (profile) {
      setUserInfo(profile);
      setUsername(profile.username);
      setCharacter(profile);
    }
  }, [state.playing]);

  const handleBackBtnClick = () => {
    navigate("/singleplayermap");
  };

  return (
    <>
      {profile && (
        <div className="flex flex-col w-screen h-screen place-content-end bg-stone-bg bg-cover">
          {state.playing && (
            <>
              {state.win && (
                <div className="h-screen w-screen flex absolute place-content-center place-items-center z-30">
                  <div className="h-screen w-screen bg-black opacity-50"></div>
                  <div className="flex flex-col absolute h-3/4 w-1/3 rounded-xl px-10 py-14 text-center gap-5 text-white place-items-center">
                    <img
                      src={green_card}
                      className="flex absolute h-full w-full top-0 left-0"
                    />
                    <div className="flex flex-row place-content-center gap-3 z-10">
                      {[...Array(state.stars)].map((item, index) => {
                        return (
                          <img
                            className="w-16"
                            key={index}
                            src={star}
                            alt="Star"
                          />
                        );
                      })}
                      {[...Array(3 - state.stars)].map((item, index) => {
                        return (
                          <img
                            className="w-16"
                            key={index}
                            src={nonstar}
                            alt="Non-Star"
                          />
                        );
                      })}
                    </div>
                    <span className="text-6xl font-bold text-white z-10">
                      You Win
                    </span>
                    <span className="text-2xl z-10">Score: {state.score}</span>
                    <button
                      className="bg-red-500 z-10 rounded p-5 w-2/3 text-lg hover:w-full hover:text-2xl transition-all"
                      onClick={() => handleNextLvlClick()}
                    >
                      Next Level
                    </button>
                    <button
                      className="bg-blue-500 z-10 rounded p-5 w-2/3 text-lg hover:w-full hover:text-2xl transition-all"
                      onClick={() => handleExitBtnClick()}
                    >
                      Exit
                    </button>
                  </div>
                </div>
              )}

              {state.gameOver && (
                <div className="h-screen w-screen flex absolute place-content-center place-items-center z-30">
                  <div className="h-screen w-screen bg-black opacity-50"></div>
                  <div className="flex flex-col absolute h-3/4 w-1/3 rounded-xl px-10 py-24 text-center gap-5 text-white place-items-center">
                    <img
                      src={red_card}
                      className="flex absolute h-full w-full top-0 left-0"
                    />
                    <span className="text-6xl font-bold z-10">Game Over</span>
                    <span className="text-lg z-10">
                      Perhaps you have a lot more to learn regarding this
                      topic...
                    </span>
                    <button
                      className="bg-emerald-600 z-10 rounded p-5 w-2/3 text-lg hover:w-full hover:text-2xl transition-all"
                      onClick={() => {
                        handleRetryClick();
                      }}
                    >
                      Retry
                    </button>
                    <button
                      className="bg-blue-400 z-10 rounded p-5 w-2/3 text-lg hover:w-full hover:text-2xl transition-all"
                      onClick={() => navigate("/singleplayermap")}
                    >
                      Exit
                    </button>
                  </div>
                </div>
              )}

              {state.currentQuestion !== null && (
                <>
                  {/* Start of Header */}
                  {/* <div className="flex relative w-screen h-min z-20 bg-stone-bg bg-cover place-items-center">
                    <div className="flex h-3/4">
                      <div className="flex relative place-items-center p-7 gap-5 bg-emerald-700 rounded-e-xl outline outline-yellow-300 outline-2">
                        <div className="flex flex-row gap-5 place-items-center place-content-center">
                          <img
                            src={arrow_w}
                            alt="home"
                            className="w-6 z-10 cursor-pointer"
                            onClick={handleBackBtnClick}
                          />
                          <span className="z-30 text-3xl text-white">
                            {pageTitle}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="flex absolute right-0 h-3/4 bg-[rgba(250,229,187,255)] rounded-s-xl outline outline-amber-950 outline-2 place-content-center place-items-center gap-4 p-7 w-1/6 hover:w-1/3 transition-all"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <span className="z-10 text-xl text-amber-950">
                        {username}
                      </span>
                      <img
                        src={characterImg}
                        alt="Profile"
                        className="w-9 fill-white rounded-full z-10 "
                      />
                    </button>
                  </div> */}
                  {/* End of Header */}
                  <Header
                    pageTitle={pageTitle}
                    username={username}
                    profilePicture={characterImg}
                    titleColor={"bg-emerald-700"}
                    isLevel
                  />
                  <div>
                    {timer && (
                      <div className="flex flex-row place-items-center gap-5 p-2 place-content-center w-full">
                        <span className="text-white text-xl">{timer}</span>
                        <div
                          id="timer"
                          className="bg-emerald-600 w-full h-2 transition-all rounded-full"
                          style={{ width: `${timer}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col place-items-center w-screen h-full gap-2 p-2">
                    {enlargeImg && (
                      <>
                        <div className="flex absolute place-content-center place-items-center h-screen top-0 z-30 gap-5">
                          <div className="flex absolute bg-black w-screen h-screen opacity-75"></div>
                          <button
                            className=" w-10 h-10 z-30"
                            onClick={() => setEnlargeImg(!enlargeImg)}
                          >
                            <img src={close} className="w-20" />
                          </button>
                          <img
                            className="flex w-fit h-fit z-30"
                            src={state.currentQuestion.imgRef}
                          />
                        </div>
                      </>
                    )}
                    <div className="flex flex-row relative gap-5 w-8/12 h-[18vh] pt-5 px-20 text-center place-content-center text-white rounded-[50px]">
                      <img
                        src={speech_bubble}
                        className="flex absolute top-0 left-0 w-full h-full"
                      />
                      {state.currentQuestion.imgRef && (
                        <img
                          className="w-[4vw] h-[7vh] cursor-pointer outline outline-1 z-10"
                          src={state.currentQuestion.imgRef}
                          onClick={() => setEnlargeImg(!enlargeImg)}
                        />
                      )}
                      <span className="text-2xl z-10">
                        {state.currentQuestion.question}
                      </span>
                    </div>
                    <div className="flex relative  flex-row h-5/6 w-screen place-items-center gap-40 place-content-center">
                      <div className="flex flex-col bg-card-bg bg-cover rounded-xl relative w-[16vw] h-full place-items-center p-2">
                        <div className="flex flex-col outline w-full h-full rounded-lg place-content-center place-items-center text-amber-900">
                          <span className="py-2 left-10 text-3xl w-full text-center text-black drop-shadow-[0_2px_2px_rgba( ,255,255,1)]">
                            {username}
                          </span>
                          <img
                            className="rounded w-[12vw] z-10"
                            src={characterImg}
                          />
                          <div className="flex flex-row place-items-center gap-5 py-2">
                            <span>HP</span>
                            <div className=" h-3 w-36 bg-red-500 rounded-lg">
                              <div
                                className="h-3 w-full bg-green-600 rounded-lg"
                                style={{
                                  width: `${
                                    (state.playerHealth /
                                      state.questionsLength) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xl">Score: {state.score}</span>
                        </div>
                      </div>
                      <div className="flex flex-col place-content-center place-items-center gap-4">
                        <span className="text-white text-3xl">
                          Question: {state.questionCounter}/
                          {state.questionsLength}
                        </span>
                        <button
                          id="pick-card"
                          className="text-white py-10 px-32 rounded-xl transition-all text-2xl"
                          onClick={() => {
                            handleChoicePick();
                          }}
                          disabled={!choiceForClicked}
                          style={{
                            background: choiceForClicked
                              ? "rgb(0, 158, 96)"
                              : "gray",
                          }}
                        >
                          Play Card
                        </button>
                      </div>
                      <div className="flex flex-col relative place-items-center p-2  w-[16vw] h-full bg-card-bg rounded-xl">
                        <div className="flex flex-col place-items-center place-content-center outline rounded-lg w-full h-full text-amber-900">
                          <span className="flex place-items-center place-content-center text-3xl w-full text-black font-bold z-10 py-2">
                            Luan
                          </span>
                          <div className="w-5/6 z-10">
                            <img
                              className="rounded"
                              src="https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/playable-characters/Luan.jpg"
                            />
                          </div>
                          <div className="flex flex-row place-items-center gap-5 py-2"></div>
                          <span className="text-xl">Game Master</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row h-[35vh] w-screen place-content-center px-10 overflow-hidden">
                    {JSON.parse(state.currentQuestion.choice1).v !== null && (
                      <button
                        id="button1"
                        className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3 p-5 place-self-end hover:animate-pulse transition-all"
                        onClick={() =>
                          handleCardClick(
                            state.currentQuestion,
                            state.currentQuestion.choice1,
                            1
                          )
                        }
                      >
                        <img
                          src={card1}
                          className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                        />
                        <span className="z-10 text-xl">
                          {JSON.parse(state.currentQuestion.choice1).c}
                        </span>
                      </button>
                    )}
                    {JSON.parse(state.currentQuestion.choice2).v !== null && (
                      <button
                        id="button2"
                        className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3  p-5 place-self-end hover:animate-pulse transition-all"
                        onClick={() =>
                          handleCardClick(
                            state.currentQuestion,
                            state.currentQuestion.choice2,
                            2
                          )
                        }
                      >
                        <img
                          src={card2}
                          className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                        />
                        <span className="z-10 text-xl">
                          {JSON.parse(state.currentQuestion.choice2).c}
                        </span>
                      </button>
                    )}
                    {JSON.parse(state.currentQuestion.choice3).v !== null && (
                      <button
                        id="button3"
                        className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3  p-5 place-self-end hover:animate-pulse transition-all"
                        onClick={() =>
                          handleCardClick(
                            state.currentQuestion,
                            state.currentQuestion.choice3,
                            3
                          )
                        }
                      >
                        <img
                          src={card3}
                          className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                        />
                        <span className="z-10 text-xl">
                          {JSON.parse(state.currentQuestion.choice3).c}
                        </span>
                      </button>
                    )}
                    {JSON.parse(state.currentQuestion.choice4).v !== null && (
                      <button
                        id="button4"
                        className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3  p-5 place-self-end hover:animate-pulse transition-all"
                        onClick={() =>
                          handleCardClick(
                            state.currentQuestion,
                            state.currentQuestion.choice4,
                            4
                          )
                        }
                      >
                        <img
                          src={card4}
                          className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                        />
                        <span className="z-10 text-xl">
                          {JSON.parse(state.currentQuestion.choice4).c}
                        </span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
