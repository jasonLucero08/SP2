import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import {
  getUserInfo,
  getQuestionsPerLevel,
  saveScorePerLevel,
} from "../hooks/Hooks";
import { useImmerReducer } from "use-immer";
import axios from "axios";

import Header from "../components/Header";
import star from "../images/star.png";
import nonstar from "../images/nonstar.png";

import cardChar from "../images/card-filled.png";
import cardEn from "../images/card-simple.png";

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
      // draft.currentQuestion = getCurrentQuestion();
      draft.playerHealth = 100;
      draft.score = 100;
      draft.gameOver = false;
      draft.stars = 3;
      draft.win = false;
      return;

    case "addToRandomQuestionsArr":
      draft.randomQuestions = action.value;
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
  playerHealth: 0,
  win: false,
  gameOver: false,
  stars: 3,
};

export default function HeadOnGame() {
  const socket = initializeSocket();

  const location = useLocation();

  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);

  const [characterImg, setCharacterImg] = useState(null);
  const [characterName, setCharacterName] = useState(null);

  const [playerHealth, setPlayerHealth] = useState(null);
  const [playerScore, setPlayerScore] = useState(null);

  const [enlargeImg, setEnlargeImg] = useState(false);

  // const levelid = "L" + location.state.num;

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const [enemyData, setEnemyData] = useState(null);
  const [enemyHealth, setEnemyHealth] = useState(null);
  const [enemyScore, setEnemyScore] = useState(null);

  const [playing, setPlaying] = useState(false);
  const [currQues, setCurrQues] = useState(null);
  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);

  const [choiceClicked, setChoiceClicked] = useState(false);

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

  const showButtonColors = () => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

    b1.classList.remove("bg-white");
    b1.classList.add(
      `${
        JSON.parse(currQues.choice1).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b1.disabled = true;

    b2.classList.remove("bg-white");
    b2.classList.add(
      `${
        JSON.parse(currQues.choice2).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b2.disabled = true;

    b3.classList.remove("bg-white");
    b3.classList.add(
      `${
        JSON.parse(currQues.choice3).v.toString() === "true"
          ? "bg-green-200"
          : "bg-red-200"
      }`
    );
    b3.disabled = true;

    b4.classList.remove("bg-white");
    b4.classList.add(
      `${
        JSON.parse(currQues.choice4).v.toString() === "true"
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
    setChoiceClicked(true);
    clearInterval(intervalRef.current);
    let val;

    if (JSON.parse(choiceNum).v.toString() === "false") {
      val = "false";
      var tempHealth = playerHealth;
      tempHealth = tempHealth - 5;
      setPlayerHealth(tempHealth);
      console.log(tempHealth);
    } else {
      val = "true";
      var tempScore = playerScore;
      tempScore = tempScore + 1;
      setPlayerScore(tempScore);
      console.log(tempScore);
    }

    socket.emit("sendChoice", {
      roomCode: location.state.code,
      uData: userInfo,
      val: val,
    });
  };

  const noChoiceClicked = () => {
    setPlayerHealth(playerHealth - 5);
  };

  const handleSaveBtnClick = async () => {
    var currScore = state.score;
    var currStars = state.stars;

    var levelsUnlockedJSON = null;
    var levelStarsJSON = null;
    var starsToAdd = 0;
    var nextLevelId = "";

    const userData = profile;
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
      profile.id,
      levelsUnlockedJSON,
      levelStarsJSON,
      starTotal
    );

    const userData2 = profile;
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
  const fetchData = async () => {
    try {
      await axios.get("http://localhost:4000/fetch-questions");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    let timerValue = 30;
    setTimer(timerValue);

    intervalRef.current = setInterval(() => {
      timerValue--;
      setTimer(timerValue);
      if (timerValue <= 0) {
        clearInterval(intervalRef.current);
        if (!choiceClicked) {
          noChoiceClicked();
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

    async function go() {
      try {
        if (profile) {
          setUserInfo(profile);
          setUsername(profile.username);
          setCharacter(profile);
          setPlayerHealth(100);
          setPlayerScore(0);
        }
        socket.once("timer", () => {
          startTimer();
        });

        socket.emit("clearStatData");
        fetchData();
        socket.once("question", (question) => {
          setCurrQues(question);
        });

        setPlaying(true);
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }

    go();
  }, []);

  useEffect(() => {
    socket.emit("enemyStatChange", {
      roomCode: location.state.code,
      score: playerScore,
      health: playerHealth,
      user: username,
    });

    socket.on("broadcastStatChange", (data) => {
      const arr = Object.keys(data);

      arr.forEach((name) => {
        if (name !== username) {
          console.log(name);
          setEnemyHealth(data[name].health);
          setEnemyScore(data[name].score);
        }
      });
    });

    return () => {
      socket.off("broadcastStatChange");
    };
  }, [playerHealth, playerScore, currQues]);

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

    socket.on("receiveUserList", (data) => {
      const arr = Object.keys(data);

      arr.forEach((name) => {
        if (name !== username) {
          setEnemyData(data[name]);
        }
      });
    });

    return () => {
      socket.off("receiveUserList");
    };
  }, [userInfo, socket]);

  useEffect(() => {
    socket.on("showCorrectChoices", (list) => {
      // showButtonColors();
      clearInterval(intervalRef.current);

      setTimeout(function () {
        socket.emit("clearUserChoiceList");
        // hideButtonColors();

        fetchData();
        socket.once("question", (question) => {
          setCurrQues(question);
          startTimer();
        });
      }, 1500);
    });
  }, []);

  return (
    <>
      {profile && (
        <div className="flex flex-col w-screen h-screen place-content-end bg-stone-bg bg-cover">
          <Header
            pageTitle={pageTitle}
            username={username}
            profilePicture={characterImg}
            actualSocket={socket}
          />

          {playing && (
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

              {currQues !== null && (
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
                            src={currQues.imgRef}
                          />
                        </div>
                      </>
                    )}
                    <div>
                      {timer && (
                        <div className="flex flex-row place-items-center gap-5 p-2 place-content-center">
                          <span className="text-white">{timer}</span>
                          <div
                            className="bg-blue-500 w-full h-2 transition-all rounded-full"
                            style={{ width: `${(timer / 100) * 100}` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-5 bg-white w-10/12 h-1/4 mb-4 p-5">
                      <span className="text-xl">{currQues.question}</span>
                    </div>
                    <div className="flex relative flex-row h-2/3 w-screen">
                      <div className="flex flex-col relative w-2/12 h-full left-40 place-items-center p-5 gap-4">
                        <img
                          src={cardChar}
                          className="flex absolute bottom-0 w-full h-full "
                        />
                        <div className="w-5/6 z-10 mt-7">
                          <img className="rounded" src={characterImg} />
                        </div>
                        <div className="flex gap-10 z-10 place-items-end h-6">
                          <span className="absolute left-10 text-lg font-bold ">
                            {username}
                          </span>
                          <span className="absolute right-10 text-sm">
                            {playerScore}
                          </span>
                        </div>
                        <div className="absolute bottom-9 h-3 w-36 bg-red-500 rounded-lg">
                          <div
                            className="h-3 w-full bg-green-400 rounded-lg"
                            style={{
                              width: `${(playerHealth * 100) / 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      {enemyData && (
                        <div className="flex flex-col absolute right-40 place-items-center p-5 gap-4 rounded-lg w-2/12 h-full">
                          <img
                            src={cardEn}
                            className="flex absolute bottom-0 w-full h-full "
                          />
                          <div className="w-5/6 z-10 mt-7">
                            <img
                              className="rounded"
                              src={enemyData.selectedImgUrl}
                            />
                          </div>
                          <div className="flex gap-10 z-10 place-items-end h-6">
                            <span className="absolute left-10 text-sm">
                              {enemyScore}
                            </span>
                            <span className="absolute right-10 text-lg font-bold ">
                              {enemyData.username}
                            </span>
                          </div>
                          <div className="absolute bottom-9 h-3 w-36 bg-red-500 rounded-lg">
                            <div
                              className="h-3 w-full bg-green-400 rounded-lg"
                              style={{
                                width: `${(enemyHealth / 100) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row h-1/4 w-screen place-content-center px-10">
                    {JSON.parse(currQues.choice1).v !== null && (
                      <button
                        id="button1"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white p-5 text-lg"
                        onClick={() =>
                          handleChoiceClick(currQues, currQues.choice1)
                        }
                      >
                        <span>{JSON.parse(currQues.choice1).c}</span>
                      </button>
                    )}
                    {JSON.parse(currQues.choice2).v !== null && (
                      <button
                        id="button2"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white text-lg"
                        onClick={() =>
                          handleChoiceClick(currQues, currQues.choice2)
                        }
                      >
                        <span>{JSON.parse(currQues.choice2).c}</span>
                      </button>
                    )}
                    {JSON.parse(currQues.choice3).v !== null && (
                      <button
                        id="button3"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white text-lg"
                        onClick={() =>
                          handleChoiceClick(currQues, currQues.choice3)
                        }
                      >
                        <span>{JSON.parse(currQues.choice3).c}</span>
                      </button>
                    )}
                    {JSON.parse(currQues.choice4).v !== null && (
                      <button
                        id="button4"
                        className="w-1/4 h-30 rounded-xl m-3 bg-white text-lg"
                        onClick={() =>
                          handleChoiceClick(currQues, currQues.choice4)
                        }
                      >
                        <span>{JSON.parse(currQues.choice4).c}</span>
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
