import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import {
  getUserInfo,
  getQuestionsPerLevel,
  saveScorePerLevel,
} from "../hooks/Hooks";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import { supabase } from "../supabaseClient";

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

import red_card from "../images/red-levelCard.png";
import green_card from "../images/green-levelCard.png";

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
  const navigate = useNavigate();

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
  const [choiceForClicked, setChoiceForClicked] = useState(null);

  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const [cardsCanClick, setCardsCanClick] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [playerPicked, setPlayerPicked] = useState("Waiting...");
  const [enemyPicked, setEnemyPicked] = useState("Waiting...");

  const [leftMessage, setLeftMessage] = useState(null);

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
        socket.emit("clearUserChoiceList");
        socket.emit("clearHasPicked");
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
    return () => {
      socket.off("timer");
    };
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
          setEnemyHealth(data[name].health);
          setEnemyScore(data[name].score);
        }
      });
    });

    return () => {
      socket.off("broadcastStatChange");
    };
  }, [playerHealth, currQues]);

  useEffect(() => {
    if (playerHealth !== null && playerHealth <= 0) {
      setCurrQues(null);
      clearInterval(intervalRef.current);
      setGameOver(true);
      setPlaying(false);
    } else if (enemyHealth !== null && enemyHealth <= 0) {
      setCurrQues(null);
      clearInterval(intervalRef.current);
      setGameWin(true);
      setPlaying(false);
    }
  }, [currQues]);

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
      const arr = Object.keys(list);

      arr.forEach((name) => {
        if (name === username) {
          if (
            list[name].choice === "incorrect" ||
            list[name].choice === "null"
          ) {
            var temp = playerHealth;
            temp = temp - 5;
            setPlayerHealth(temp);
          } else {
            var temp = playerScore;
            temp = temp + 1;
            setPlayerScore(temp);
          }
        }
      });

      showButtonColors();
      clearInterval(intervalRef.current);
      setPlayerPicked("");
      setEnemyPicked("");

      setTimeout(function () {
        socket.emit("clearUserChoiceList");
        socket.emit("clearHasPicked");

        fetchData();
        socket.once("question", (question) => {
          setCurrQues(question);
          startTimer();
          setCardsCanClick(false);
          var temp = questionCounter;
          temp = temp + 1;
          setQuestionCounter(temp);
          hideButtonColors();
          setPlayerPicked("Waiting...");
          setEnemyPicked("Waiting...");
        });
      }, 1500);
    });

    return () => {
      socket.off("showCorrectChoices");
    };
  }, [currQues]);

  useEffect(() => {
    socket.on("showHasPicked", (list) => {
      const arr = Object.keys(list);

      arr.forEach((name) => {
        if (name !== username) {
          console.log(list);
          setEnemyPicked(list[name].message);
        }
      });
    });
    return () => {
      socket.off("showHasPicked");
    };
  }, [playerPicked]);

  useEffect(() => {
    socket.on("winner", (data) => {
      setLeftMessage(data);
      setGameWin(true);
    });
  }, []);

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

  const showButtonColors = () => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

    if (b1) {
      b1.classList.remove("bg-scroll-bg");
      b1.classList.add(
        `${
          JSON.parse(currQues.choice1).v.toString() === "true"
            ? "bg-green-300"
            : "bg-red-300"
        }`
      );
      b1.disabled = true;
    }

    if (b2) {
      b2.classList.remove("bg-scroll-bg");
      b2.classList.add(
        `${
          JSON.parse(currQues.choice2).v.toString() === "true"
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
          JSON.parse(currQues.choice3).v.toString() === "true"
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
          JSON.parse(currQues.choice4).v.toString() === "true"
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
    }

    if (b2) {
      b2.classList.remove("bg-green-300");
      b2.classList.remove("bg-red-300");
      b2.classList.add("bg-scroll-bg");
      b2.disabled = false;
    }

    if (b3) {
      b3.classList.remove("bg-green-300");
      b3.classList.remove("bg-red-300");
      b3.classList.add("bg-scroll-bg");
      b3.disabled = false;
    }

    if (b4) {
      b4.classList.remove("bg-green-300");
      b4.classList.remove("bg-red-300");
      b4.classList.add("bg-scroll-bg");
      b4.disabled = false;
    }
  };

  const noChoiceClicked = () => {
    clearInterval(intervalRef.current);
    // setPlayerHealth((prevHealth) => {
    //   const updatedHealth = prevHealth - 5;
    //   console.log(updatedHealth); // This should now reflect the correct updated value
    //   return updatedHealth;
    // });

    const val = "null";
    socket.emit("sendChoice", {
      roomCode: location.state.code,
      uData: profile,
      val: val,
    });
  };

  const setCharacter = (data) => {
    setCharacterImg(data.selectedImgUrl);
    const b = data.selectedImgUrl.split("/");
    setCharacterName(b[b.length - 1].split(".").slice(0, -1).join("."));
  };

  const fetchData = async () => {
    try {
      await axios.get("https://456-server.glitch.me/fetch-questions");
      // await axios.get("http://localhost:3000/fetch-questions");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          noChoiceClicked();
        }
      }
    }, 1000);
  };

  const handleCardClick = (q, choiceNum, cardNum) => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

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

  const handleChoiceClick = (q, choiceNum) => {
    const b1 = document.getElementById("button1");
    const b2 = document.getElementById("button2");
    const b3 = document.getElementById("button3");
    const b4 = document.getElementById("button4");

    setCardsCanClick(true);
    setChoiceClicked(true);
    let val;

    if (b1) {
      if (b1.classList.contains("h-full")) {
        b1.classList.remove("h-full");
        b1.classList.add("h-2/3");
      }
    }

    if (b2) {
      if (b2.classList.contains("h-full")) {
        b2.classList.remove("h-full");
        b2.classList.add("h-2/3");
      }
    }

    if (b3) {
      if (b3.classList.contains("h-full")) {
        b3.classList.remove("h-full");
        b3.classList.add("h-2/3");
      }
    }

    if (b4) {
      if (b4.classList.contains("h-full")) {
        b4.classList.remove("h-full");
        b4.classList.add("h-2/3");
      }
    }

    if (choiceForClicked === 1) {
      if (JSON.parse(currQues.choice1).v.toString() === "false") {
        val = "incorrect";
      } else {
        val = "correct";
      }
    } else if (choiceForClicked === 2) {
      if (JSON.parse(currQues.choice2).v.toString() === "false") {
        val = "incorrect";
      } else {
        val = "correct";
      }
    } else if (choiceForClicked === 3) {
      if (JSON.parse(currQues.choice3).v.toString() === "false") {
        val = "incorrect";
      } else {
        val = "correct";
      }
    } else if (choiceForClicked === 4) {
      if (JSON.parse(currQues.choice4).v.toString() === "false") {
        val = "incorrect";
      } else {
        val = "correct";
      }
    }
    setChoiceForClicked(null);
    setChoiceClicked(false);
    setPlayerPicked("This player has picked a card!");

    socket.emit("sendChoice", {
      roomCode: location.state.code,
      uData: userInfo,
      val: val,
      playerPicked: "This player has picked a card!",
    });
  };

  const handleWinExitBtnClick = async () => {
    var userTotalStars = profile.totalStars;
    var userCurrentStars = profile.currentStars;
    var userTotalHOGames = profile.totalHeadOnGames;
    var userTotalHOWins = profile.totalHeadOnWins;
    var winRate;

    userTotalStars += 2;
    userCurrentStars += 2;
    userTotalHOGames += 1;
    userTotalHOWins += 1;

    winRate = Math.round((userTotalHOWins / userTotalHOGames) * 100);

    console.log("userTotalStars:", userTotalStars);
    console.log("userCurrentStars:", userCurrentStars);
    console.log("userTotalHOGames:", userTotalHOGames);
    console.log("userTotalHOWins:", userTotalHOWins);

    try {
      const { error } = await supabase
        .from("profile")
        .update({
          totalStars: userTotalStars,
          currentStars: userCurrentStars,
          totalHeadOnGames: userTotalHOGames,
          totalHeadOnWins: userTotalHOWins,
          HeadOnWinRate: winRate,
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error updating stars:", error.message);
    }

    socket.disconnect();
    navigate("/");
  };

  const handleLossBtnClick = async () => {
    var userTotalHOGames = profile.totalHeadOnGames;
    var userTotalHOWins = profile.totalHeadOnWins;
    var winRate;

    userTotalHOGames += 1;

    winRate = Math.round((userTotalHOWins / userTotalHOGames) * 100);
    console.log("userTotalHOGames:", userTotalHOGames);
    console.log("userTotalHOWins:", userTotalHOWins);

    try {
      const { error } = await supabase
        .from("profile")
        .update({
          totalHeadOnGames: userTotalHOGames,
          HeadOnWinRate: winRate,
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error updating stars:", error.message);
    }

    socket.disconnect();
    navigate("/");
  };

  return (
    <>
      {profile && (
        <div className="flex flex-col w-screen h-screen place-content-end bg-stone-bg bg-cover">
          <>
            {gameWin && (
              <div className="h-screen w-screen flex absolute place-content-center place-items-center z-40">
                <div className="h-screen w-screen bg-black opacity-50"></div>
                <div className="flex flex-col absolute h-3/4 w-1/3 rounded-xl px-10 py-24 text-center gap-5 text-white place-items-center">
                  <img
                    src={green_card}
                    className="flex absolute h-full w-full top-0 left-0"
                  />
                  <div className="flex flex-row place-content-center gap-3 z-10">
                    {[...Array(2)].map((item, index) => {
                      return (
                        <img
                          className="w-16"
                          key={index}
                          src={star}
                          alt="Star"
                        />
                      );
                    })}
                  </div>
                  <span className="text-6xl font-bold text-white z-10">
                    You Win
                  </span>
                  {leftMessage && (
                    <span className="text-xl z-10">{leftMessage}</span>
                  )}
                  <span className="text-2xl z-10">You get 2 stars!</span>
                  <button
                    className="bg-blue-500 z-10 rounded p-5 w-2/3 text-lg hover:w-full hover:text-2xl transition-all"
                    onClick={() => handleWinExitBtnClick()}
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="h-screen w-screen flex absolute place-content-center place-items-center z-40">
                <div className="h-screen w-screen bg-black opacity-50"></div>
                <div className="flex flex-col absolute h-3/4 w-1/3 rounded-xl px-10 py-32 text-center gap-5 text-white place-items-center">
                  <img
                    src={red_card}
                    className="flex absolute h-full w-full top-0 left-0"
                  />
                  <span className="text-6xl font-bold z-10">Game Over</span>
                  <span className="text-lg z-10">
                    Perhaps you have a lot more to learn regarding this topic...
                  </span>
                  <button
                    className="bg-blue-500 z-10 rounded p-5 w-2/3 text-lg hover:w-full hover:text-2xl transition-all"
                    onClick={() => {
                      handleLossBtnClick();
                    }}
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            {currQues !== null && (
              <>
                <Header
                  pageTitle="Head On"
                  username={username}
                  profilePicture={characterImg}
                  actualSocket={socket}
                  titleColor={"bg-purple-700"}
                />
                <div className="flex flex-col place-items-center w-screen h-full gap-2">
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
                          src={currQues.imgRef}
                        />
                      </div>
                    </>
                  )}
                  <div className="flex w-full h-fit place-items-center place-content-center">
                    {timer && (
                      <div className="flex w-full place-items-center place-content-center gap-5 p-2">
                        <span className="text-white text-xl">{timer}</span>
                        <div
                          id="timer"
                          className="bg-emerald-600 w-full h-2 transition-all rounded-full"
                          style={{ width: `${timer}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row relative gap-5 w-8/12 h-[18vh] pt-5 px-20 text-center place-content-center text-white rounded-[50px]">
                    <img
                      src={speech_bubble}
                      className="flex absolute top-0 left-0 w-full h-full"
                    />
                    {currQues.imgRef && (
                      <img
                        className="w-[4vw] h-[7vh] cursor-pointer outline outline-1 z-10"
                        src={currQues.imgRef}
                        onClick={() => setEnlargeImg(!enlargeImg)}
                      />
                    )}
                    <span className="text-2xl z-10">{currQues.question}</span>
                  </div>
                  <div className="flex relative  flex-row h-5/6 w-screen place-items-center gap-40 place-content-center">
                    <div className="flex flex-col place-content-center place-items-center">
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
                                  width: `${(playerHealth * 100) / 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xl">Score: {playerScore}</span>
                        </div>
                      </div>
                      <span className="text-white text-lg">{playerPicked}</span>
                    </div>
                    <div className="flex flex-col place-content-center place-items-center gap-4">
                      <span className="text-white text-3xl">
                        Question: {questionCounter}
                      </span>
                      <button
                        id="pick-card"
                        className="text-white py-10 px-32 rounded-xl transition-all text-2xl"
                        onClick={() => {
                          handleChoiceClick();
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
                    {enemyData && (
                      <div className="flex flex-col place-items-center">
                        <div className="flex flex-col relative place-items-center p-2 gap-4 w-[16vw] h-full bg-card-bg bg-cover rounded-xl">
                          <div className="flex flex-col outline w-full h-full rounded-lg place-content-center place-items-center text-amber-900">
                            <span className="py-2 left-10 text-3xl w-full text-center text-black drop-shadow-[0_2px_2px_rgba( ,255,255,1)]">
                              {enemyData.username}
                            </span>
                            <img
                              className="rounded w-[12vw] z-10"
                              src={enemyData.selectedImgUrl}
                            />

                            <div className="flex flex-row place-items-center gap-5 py-2">
                              <span>HP: </span>
                              <div className="h-3 w-36 bg-red-500 rounded-lg">
                                <div
                                  className="h-3 w-full bg-green-600 rounded-lg"
                                  style={{
                                    width: `${(enemyHealth / 100) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex gap-10 z-10 place-items-end h-6">
                              <span className="text-xl">
                                Score: {enemyScore}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-white text-lg">
                          {enemyPicked}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row h-[35vh] w-screen place-content-center px-10 overflow-hidden">
                  {JSON.parse(currQues.choice1).v !== null && (
                    <button
                      id="button1"
                      className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3 p-5 place-self-end hover:animate-pulse transition-all"
                      onClick={() =>
                        handleCardClick(currQues, currQues.choice1, 1)
                      }
                      disabled={cardsCanClick}
                    >
                      <img
                        src={card1}
                        className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                      />
                      <span className="z-10 text-xl">
                        {JSON.parse(currQues.choice1).c}
                      </span>
                    </button>
                  )}
                  {JSON.parse(currQues.choice2).v !== null && (
                    <button
                      id="button2"
                      className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3 p-5 place-self-end hover:animate-pulse transition-all"
                      onClick={() =>
                        handleCardClick(currQues, currQues.choice2, 2)
                      }
                      disabled={cardsCanClick}
                    >
                      <img
                        src={card2}
                        className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                      />
                      <span className="z-10 text-xl">
                        {JSON.parse(currQues.choice2).c}
                      </span>
                    </button>
                  )}
                  {JSON.parse(currQues.choice3).v !== null && (
                    <button
                      id="button3"
                      className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3 p-5 place-self-end hover:animate-pulse transition-all"
                      onClick={() =>
                        handleCardClick(currQues, currQues.choice3, 3)
                      }
                      disabled={cardsCanClick}
                    >
                      <img
                        src={card3}
                        className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                      />
                      <span className="z-10 text-xl">
                        {JSON.parse(currQues.choice3).c}
                      </span>
                    </button>
                  )}
                  {JSON.parse(currQues.choice4).v !== null && (
                    <button
                      id="button4"
                      className="flex bg-scroll-bg place-content-center place-items-center relative w-1/4 h-2/3 rounded-t-lg mr-3 p-5 place-self-end hover:animate-pulse transition-all"
                      onClick={() =>
                        handleCardClick(currQues, currQues.choice4, 4)
                      }
                      disabled={cardsCanClick}
                    >
                      <img
                        src={card4}
                        className="flex absolute top-0 left-0 w-full sm:h-full xl:h-max"
                      />
                      <span className="z-10 text-xl">
                        {JSON.parse(currQues.choice4).c}
                      </span>
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        </div>
      )}
    </>
  );
}
