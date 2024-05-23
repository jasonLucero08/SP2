import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import { initializeSocket } from "../initSocket";

function ourReducer(draft, action) {
  switch (action.type) {
    case "guessAttempt":
      const threeStarLimit = 0.8 * draft.questionsLength;
      const twoStarLimit = 0.6 * draft.questionsLength;

      if (action.value === "false") {
        draft.playerHealth -= 1;
        draft.score -= 1;
      }

      if (draft.stars == 3 && draft.score < threeStarLimit) {
        draft.stars -= 1;
      } else if (draft.stars == 2 && draft.score < twoStarLimit) {
        draft.stars -= 1;
      } else if (draft.score == 0) {
        draft.stars -= 1;
        draft.gameOver = true;
      }

      console.log("Score: " + draft.score);
      console.log("Stars: " + draft.stars);

      draft.currentQuestion = getCurrentQuestion();

      if (draft.currentQuestion == null) {
        draft.win = true;
      }
      return;

    case "startPlaying":
      draft.playing = true;
      draft.currentQuestion = getCurrentQuestion();
      draft.playerHealth = draft.questionsLength;
      draft.score = draft.questionsLength;
      draft.gameOver = false;
      draft.stars = 3;
      draft.win = false;
      return;

    case "addToRandomQuestionsArr":
      draft.randomQuestions = draft.randomQuestions.concat(action.value);
      return;
  }

  function getCurrentQuestion() {
    if (draft.currentQuestion) {
      draft.randomQuestions = draft.randomQuestions.splice(1);
    }

    if (draft.questionsLength == 0) {
      draft.questionsLength = draft.randomQuestions.length;
    }

    console.log(draft.randomQuestions);
    console.log(draft.randomQuestions.length);
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
  stars: 3,
};

export default function HeadOnGame() {
  const socket = initializeSocket();

  const location = useLocation();

  const { session } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);

  const [characterImg, setCharacterImg] = useState(null);
  const [characterName, setCharacterName] = useState(null);

  const [enlargeImg, setEnlargeImg] = useState(false);

  const levelid = "L" + location.state.num;

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const [enemyData, setEnemyData] = useState(null);

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
    const sessionQuestionCount = data.length / 2;
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

    b1.classList.remove("bg-white");
    b1.classList.add(
      `${
        JSON.parse(q.choice1).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b1.disabled = true;

    b2.classList.remove("bg-white");
    b2.classList.add(
      `${
        JSON.parse(q.choice2).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b2.disabled = true;

    b3.classList.remove("bg-white");
    b3.classList.add(
      `${
        JSON.parse(q.choice3).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b3.disabled = true;

    b4.classList.remove("bg-white");
    b4.classList.add(
      `${
        JSON.parse(q.choice4).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b4.disabled = true;
  };

  const hideButtonColors = () => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

    b1.classList.remove("bg-green-200");
    b1.classList.remove("bg-red-200");
    b1.classList.add("bg-white");
    b1.disabled = false;

    b2.classList.remove("bg-green-200");
    b2.classList.remove("bg-red-200");
    b2.classList.add("bg-white");
    b2.disabled = false;

    b3.classList.remove("bg-green-200");
    b3.classList.remove("bg-red-200");
    b3.classList.add("bg-white");
    b3.disabled = false;

    b4.classList.remove("bg-green-200");
    b4.classList.remove("bg-red-200");
    b4.classList.add("bg-white");
    b4.disabled = false;
  };

  const handleChoiceClick = (q, choiceNum) => {
    showButtonColors(q);

    setTimeout(function () {
      hideButtonColors();

      dispatch({
        type: "guessAttempt",
        value: JSON.parse(choiceNum).v.toString(),
      });
    }, 1500);
  };

  const handleSaveBtnClick = async () => {
    var currScore = state.score;
    var currStars = state.stars;

    var levelsUnlockedJSON = null;
    var levelStarsJSON = null;
    var starsToAdd = 0;
    var nextLevelId = "";

    const userData = await getUserInfo(session?.user.id);
    var starTotal = userData.totalStars;

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
      levelStarsJSON[levelid] = currStars;
    }

    await saveScorePerLevel(
      session?.user.id,
      levelsUnlockedJSON,
      levelStarsJSON,
      starTotal
    );

    const userData2 = await getUserInfo(session?.user.id);
    console.log(userData2.levelsUnlocked);
    console.log(userData2.levelStars);
    console.log(userData2.totalStars);
  };

  const setCharacter = (data) => {
    setCharacterImg(data.selectedImgUrl);
    const b = data.selectedImgUrl.split("/");
    setCharacterName(b[b.length - 1].split(".").slice(0, -1).join("."));
  };

  // const handleQuesImgClick = (img) => {};

  useEffect(() => {
    getPageTitle();

    // getUserInfo(session?.user.id).then(function (res) {
    //   setUserInfo(res);
    //   setUsername(res?.username);
    //   setCharacter(res);
    // });

    async function go() {
      try {
        const uInf = await getUserInfo(session?.user.id);
        setUserInfo(uInf);
        setUsername(uInf.username);
        setCharacter(uInf);
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
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("connect_timeout", (timeout) => {
      console.error("Connection timeout:", timeout);
    });

    socket.emit("userDetails", {
      roomCode: location.state.code,
      uData: userInfo,
    });
    // console.log(userInfo);

    socket.on("receiveUserList", (data) => {
      const arr = Object.keys(data);

      arr.forEach((name) => {
        if (name !== username) {
          setEnemyData(data[name]);
        }
      });

      console.log(enemyData);
    });

    return () => {
      socket.off("receiveUserList");
    };
  }, [userInfo, socket]);

  return (
    <>
      {session && (
        <div className="flex flex-col w-screen h-screen place-content-end bg-slate-900">
          <Header
            pageTitle={pageTitle}
            username={username}
            profilePicture={characterImg}
          />

          {state.playing && (
            <>
              {state.win && (
                <div className="h-screen w-screen flex absolute place-content-center place-items-center z-10">
                  <div className="h-screen w-screen bg-black opacity-50"></div>
                  <div className="flex flex-col absolute h-1/2 w-1/3 bg-white rounded-xl p-5 place-content-center text-center gap-5">
                    <div className="flex flex-row place-content-center gap-3">
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
                    <span className="text-6xl font-bold text-green-500">
                      You Win
                    </span>
                    <span className="text-2xl">Score: {state.score}</span>
                    <button
                      className="bg-blue-300"
                      onClick={() => handleSaveBtnClick()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {state.gameOver && (
                <div className="h-screen w-screen flex absolute place-content-center place-items-center z-10">
                  <div className="h-screen w-screen bg-black opacity-50"></div>
                  <div className="flex flex-col absolute h-1/2 w-1/3 bg-white rounded-xl p-7 place-content-center text-center gap-5">
                    <span className="text-6xl font-bold text-red-500">
                      Game Over
                    </span>
                    <span className="text-base">
                      Perhaps you have a lot more to learn regarding this
                      topic...
                    </span>
                    <button className="bg-blue-300">Retry</button>
                  </div>
                </div>
              )}

              {state.currentQuestion !== null && (
                <>
                  <div className="flex flex-col place-items-center w-screen h-2/3">
                    {enlargeImg && (
                      <>
                        <div className="flex absolute place-content-center place-items-center w-11/12 h-auto z-10 bg-white">
                          <button
                            className="absolute left-0 top-0 w-10 h-10"
                            onClick={() => setEnlargeImg(!enlargeImg)}
                          >
                            X
                          </button>
                          <img
                            className="flex w-fit h-fit"
                            src={state.currentQuestion.imgRef}
                          />
                        </div>
                      </>
                    )}
                    <div className="flex flex-row gap-5 bg-white w-10/12 h-1/4 mb-4 p-5">
                      {state.currentQuestion.imgRef != null && (
                        <img
                          className="w-10 h-10 cursor-pointer"
                          src={state.currentQuestion.imgRef}
                          onClick={() => setEnlargeImg(!enlargeImg)}
                        />
                      )}
                      <span className="text-xl">
                        {state.currentQuestion.question}
                      </span>
                    </div>
                    <div className="flex relative flex-row h-2/3 w-screen">
                      <div className="flex flex-col relative bg-white w-64 h-full left-40 place-items-center p-5 gap-4 rounded-lg">
                        <div className="w-56">
                          <img className="rounded" src={characterImg} />
                        </div>
                        <div className="flex gap-10 place-items-end h-7">
                          <span className="absolute left-5 text-xl font-bold">
                            {username}
                          </span>
                          <span className="absolute right-5 text-sm">
                            {state.score}
                          </span>
                        </div>
                        <div className="absolute bottom-5 h-3 w-56 bg-red-500 rounded-lg">
                          <div
                            className="h-3 w-full bg-green-400 rounded-lg"
                            style={{
                              width: `${
                                (state.playerHealth / state.questionsLength) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      {enemyData && (
                        <div className="flex flex-col absolute bg-white w-64 h-full right-40 place-items-center p-5 gap-4 rounded-lg">
                          <div className="w-56">
                            <img
                              className="rounded"
                              src={enemyData.selectedImgUrl}
                            />
                          </div>
                          <span className="text-xl font-bold w-full text-right">
                            {enemyData.username}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row h-1/4 w-screen place-content-center px-10">
                    {JSON.parse(state.currentQuestion.choice1).v !== null && (
                      <button
                        id="button1"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white p-5 text-lg"
                        onClick={() =>
                          handleChoiceClick(
                            state.currentQuestion,
                            state.currentQuestion.choice1
                          )
                        }
                      >
                        <span>
                          {JSON.parse(state.currentQuestion.choice1).c}
                        </span>
                      </button>
                    )}
                    {JSON.parse(state.currentQuestion.choice2).v !== null && (
                      <button
                        id="button2"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white text-lg"
                        onClick={() =>
                          handleChoiceClick(
                            state.currentQuestion,
                            state.currentQuestion.choice2
                          )
                        }
                      >
                        <span>
                          {JSON.parse(state.currentQuestion.choice2).c}
                        </span>
                      </button>
                    )}
                    {JSON.parse(state.currentQuestion.choice3).v !== null && (
                      <button
                        id="button3"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white text-lg"
                        onClick={() =>
                          handleChoiceClick(
                            state.currentQuestion,
                            state.currentQuestion.choice3
                          )
                        }
                      >
                        <span>
                          {JSON.parse(state.currentQuestion.choice3).c}
                        </span>
                      </button>
                    )}
                    {JSON.parse(state.currentQuestion.choice4).v !== null && (
                      <button
                        id="button4"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white text-lg"
                        onClick={() =>
                          handleChoiceClick(
                            state.currentQuestion,
                            state.currentQuestion.choice4
                          )
                        }
                      >
                        <span>
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
