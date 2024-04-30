import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getQuestionsPerLevel } from "../hooks/Getters";
import { supabase } from "../supabaseClient";
import { useImmerReducer } from "use-immer";

import Header from "../components/Header";

function ourReducer(draft, action) {
  switch (action.type) {
    case "guessAttempt":
      if (action.value === "true") {
        draft.score++;
        draft.opponentHealth -= 15;
      } else if (action.value === "false") {
        draft.playerHealth -= 15;
      }

      console.log("Score: " + draft.score);
      console.log("Player: " + draft.playerHealth);
      console.log("Opponent: " + draft.opponentHealth);

      if (draft.playerHealth <= 0) {
        draft.gameOver = true;
      }

      draft.currentQuestion = getCurrentQuestion();
      return;
    case "startPlaying":
      draft.playing = true;
      draft.score = 0;
      draft.playerHealth = 100;
      draft.opponentHealth = 100;
      draft.currentQuestion = getCurrentQuestion();
      draft.gameOver = false;
    case "addToRandomQuestionsArr":
      draft.randomQuestions = draft.randomQuestions.concat(action.value);
      return;
  }

  function getCurrentQuestion() {
    if (draft.currentQuestion) {
      draft.randomQuestions = draft.randomQuestions.slice(1);
    }

    console.log(draft.randomQuestions.length);
    console.log(draft.randomQuestions);
    return draft.randomQuestions[0];
  }
}

const initialState = {
  playing: false,
  randomQuestions: [],
  score: 0,
  currentQuestion: null,
  playerHealth: 100,
  opponentHealth: 100,
  gameOver: false,
};

export default function Level() {
  const location = useLocation();

  const { user, session } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  // const [levelData, setLevelData] = useState([]);

  const levelid = "L" + location.state.num;

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

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

  const handleChoiceClick = (value) => {};

  useEffect(() => {
    getPageTitle();

    getUserInfo(session?.user.id).then(function (res) {
      setUserInfo(res);
      setUsername(res?.username);
    });

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

    return () => {};
  }, []);

  return (
    <>
      {session && (
        <div className="flex flex-col w-screen h-screen place-content-end bg-slate-900">
          <Header pageTitle={pageTitle} username={username} />

          {state.playing && (
            <>
              {state.gameOver && (
                <div className="h-screen w-screen flex absolute place-content-center place-items-center z-10">
                  <div className="h-screen w-screen bg-black opacity-50"></div>
                  <div className="flex flex-col absolute h-1/2 w-2/5 bg-white rounded-xl p-5 place-content-center text-center gap-3">
                    Game Over
                  </div>
                </div>
              )}

              <div className="flex flex-col place-items-center w-screen h-2/3 ">
                <div className="bg-white w-screen h-1/4 mb-4">
                  <span>{state.currentQuestion.question}</span>
                </div>
                <div className="flex relative flex-row  h-2/3 w-screen">
                  <div className="relative bg-orange-300 w-64 h-full left-40"></div>
                  <div className="absolute bg-yellow-300 w-64 h-full inset-y-0 right-40"></div>
                </div>
              </div>

              <div className="flex flex-row  h-1/4 w-screen place-content-center">
                <button
                  className="bg-white w-1/4 h-30 rounded-xl m-3"
                  value={JSON.parse(state.currentQuestion.choice1).v.toString()}
                  onClick={() =>
                    dispatch({
                      type: "guessAttempt",
                      value: JSON.parse(
                        state.currentQuestion.choice1
                      ).v.toString(),
                    })
                  }
                >
                  <span>{JSON.parse(state.currentQuestion.choice1).c}</span>
                </button>
                <button
                  className="bg-white w-1/4 h-30 rounded-xl m-3"
                  value={JSON.parse(state.currentQuestion.choice2).v.toString()}
                  onClick={() =>
                    dispatch({
                      type: "guessAttempt",
                      value: JSON.parse(
                        state.currentQuestion.choice2
                      ).v.toString(),
                    })
                  }
                >
                  <span>{JSON.parse(state.currentQuestion.choice2).c}</span>
                </button>
                <button
                  className="bg-white w-1/4 h-30 rounded-xl m-3"
                  value={JSON.parse(state.currentQuestion.choice3).v.toString()}
                  onClick={() =>
                    dispatch({
                      type: "guessAttempt",
                      value: JSON.parse(
                        state.currentQuestion.choice3
                      ).v.toString(),
                    })
                  }
                >
                  <span>{JSON.parse(state.currentQuestion.choice3).c}</span>
                </button>
                <button
                  className="bg-white w-1/4 h-30 rounded-xl m-3"
                  value={JSON.parse(state.currentQuestion.choice4).v.toString()}
                  onClick={() =>
                    dispatch({
                      type: "guessAttempt",
                      value: JSON.parse(
                        state.currentQuestion.choice4
                      ).v.toString(),
                    })
                  }
                >
                  <span>{JSON.parse(state.currentQuestion.choice4).c}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
