import React, { useEffect, useState } from "react";

import left_banner from "../images/left-banner.png";

import home from "../images/home.png";

import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { supabase } from "../supabaseClient";

const imgBucketUrl =
  "https://pnduassrodsmyexxhtsf.supabase.co/storage/v1/object/public/";

export default function AddQuestion() {
  const navigate = useNavigate();

  const [pickerVal, setPickerVal] = useState("L1");
  const [newQId, setNewQId] = useState(null);

  const [question, setQuestion] = useState("");

  const [choice1, setChoice1] = useState(null);
  const [choice1Val, setChoice1Val] = useState("");

  const [choice2, setChoice2] = useState(null);
  const [choice2Val, setChoice2Val] = useState("");

  const [choice3, setChoice3] = useState(null);
  const [choice3Val, setChoice3Val] = useState("");

  const [choice4, setChoice4] = useState(null);
  const [choice4Val, setChoice4Val] = useState("");

  const [file, setFile] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleHomeBtnClick = () => {
    navigate({ pathname: "/" });
  };

  const handleOptionClick = async (e) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select()
        .eq("levelId", e);

      if (error) {
        throw error;
      }

      if (data) {
        var refNum = 0;
        data.forEach((q) => {
          var num = Number(q.questionId.split(e + "Q")[1]);
          if (num > refNum) {
            refNum = num;
          }
        });

        refNum += 1;

        setNewQId(e + "Q" + refNum);
      }
    } catch (error) {
      console.error("Error getting questions from level:", error.message);
    }
    // console.log(e);
  };

  const handleChoiceVals = () => {
    if (choice1 === "") {
      setChoice1(null);
      setChoice1Val(null);
    }

    if (choice1Val === "") {
      setChoice1Val(null);
    } else if (choice1Val === "true") {
      setChoice1Val(true);
    } else if (choice1Val === "false") {
      setChoice1Val(false);
    }

    if (choice2 === "") {
      setChoice2(null);
      setChoice2Val(null);
    }

    if (choice2Val === "") {
      setChoice2Val(null);
    } else if (choice2Val === "true") {
      setChoice2Val(true);
    } else if (choice2Val === "false") {
      setChoice2Val(false);
    }

    if (choice3 === "") {
      setChoice3(null);
      setChoice3Val(null);
    }

    if (choice3Val === "") {
      setChoice3Val(null);
    } else if (choice3Val === "true") {
      setChoice3Val(true);
    } else if (choice3Val === "false") {
      setChoice3Val(false);
    }

    if (choice4 === "") {
      setChoice4(null);
      setChoice4Val(null);
    }

    if (choice4Val === "") {
      setChoice4Val(null);
    } else if (choice4Val === "true") {
      setChoice4Val(true);
    } else if (choice4Val === "false") {
      setChoice4Val(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log("Form submitted");
    console.log("Question id:", newQId);
    console.log("LevelId:", pickerVal);
    console.log("Question:", question);
    handleChoiceVals();
    console.log("Choice1:", choice1, "Val:", choice1Val);
    console.log("Choice2:", choice2, "Val:", choice2Val);
    console.log("Choice3:", choice3, "Val:", choice3Val);
    console.log("Choice4:", choice4, "Val:", choice4Val);
    console.log("File:", file);

    const choice1JSON = { c: choice1, v: choice1Val };
    const choice2JSON = { c: choice2, v: choice2Val };
    const choice3JSON = { c: choice3, v: choice3Val };
    const choice4JSON = { c: choice4, v: choice4Val };

    try {
      if (file) {
        const { data, error } = await supabase.storage
          .from("questionsImgRef")
          .upload(pickerVal + "/" + newQId, file);

        if (error) {
          throw error;
        }

        if (data) {
          const { error } = await supabase.from("questions").insert({
            questionId: newQId,
            levelId: pickerVal,
            question: question,
            choice1: choice1JSON,
            choice2: choice2JSON,
            choice3: choice3JSON,
            choice4: choice4JSON,
            imgRef: imgBucketUrl + data.fullPath,
          });

          if (error) {
            throw error;
          }
        }
      } else {
        const { error } = await supabase.from("questions").insert({
          questionId: newQId,
          levelId: pickerVal,
          question: question,
          choice1: choice1JSON,
          choice2: choice2JSON,
          choice3: choice3JSON,
          choice4: choice4JSON,
          imgRef: file,
        });

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setErrorMessage(
        "Error: Cannot upload question to database:",
        error.message
      );
    }

    setSuccessMessage("Successfully added question!");

    setTimeout(function () {
      setSuccessMessage(null);
      setErrorMessage(null);
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    handleOptionClick(pickerVal);
    handleChoiceVals();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-stone-bg bg-cover">
      {/* Header */}
      <div className="flex py-5 w-screen z-20 bg-stone-bg bg-cover place-items-center">
        <div className="flex relative place-items-center px-5 gap-5">
          <img src={left_banner} className="flex absolute left-0 w-full h-16" />
          <img
            src={home}
            alt="home"
            className="w-8 z-10 cursor-pointer"
            onClick={() => handleHomeBtnClick()}
          />
          <span className="z-10 font-bold text-xl">Add Question</span>
        </div>
      </div>
      {/* End of Header */}

      <div className="flex bg-white p-10">
        <form
          className="flex flex-col w-full h-full gap-10"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-row w-full gap-5">
            <div className="flex grow relative min-w-[200px]">
              <select
                onChange={(e) => handleOptionClick(e.target.value)}
                className="peer h-20 w-full rounded-[7px] border-2 border-black-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="L1">
                  1: Propositional Logic - Basic Terms and Concepts
                </option>
                <option value="L2">
                  2: Propositional Logic - Rules of Inference and Laws of
                  Equivalence
                </option>
                <option value="L3">
                  3: Propositional Logic - Methods of Proof I
                </option>
                <option value="L4">
                  4: Propositional Logic - Methods of Proof II
                </option>
                <option value="L5">
                  5: Predicate Logic - Basic Terms and Concepts
                </option>
                <option value="L6">6: Proving Predicate Logic</option>
                <option value="L7">7: Set Theory</option>
                <option value="L8">8: Proving Sets</option>
                <option value="L9">9: Relations</option>
                <option value="L10">
                  10: Functions, Mathematical Induction and Pigeonhole Principle
                </option>
                <option value="L11">11: Boolean Algebra</option>
                <option value="L12">12: Matrices</option>
                <option value="L13">13: Linear Systems</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Level
              </label>
            </div>
            <InputField
              type={"text"}
              label={"Question ID"}
              placeholder={newQId}
              disabled
            />
          </div>

          <div className="relative">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              type={"text"}
              placeholder={""}
              onChange={(e) => setQuestion(e.target.value)}
              // disabled={props.disabled}
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight  peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Question
            </label>
          </div>

          {/* Choice 1 */}
          <div className="flex flex-row w-full">
            <div className="flex grow relative">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                type={"text"}
                placeholder={""}
                onChange={(e) => setChoice1(e.target.value)}
                // disabled={props.disabled}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight  peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Choice 1 (Leave blank for null)
              </label>
            </div>

            <div className="flex grow relative h-10 w-72 min-w-[200px]">
              <select
                value={choice1Val}
                onChange={(e) => setChoice1Val(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="true">True</option>
                <option value="false">False</option>
                <option value="">None</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select the corresponding answer
              </label>
            </div>
          </div>

          {/* Choice 2 */}
          <div className="flex flex-row w-full">
            <div className="flex grow relative">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                type={"text"}
                placeholder={""}
                onChange={(e) => setChoice2(e.target.value)}
                // disabled={props.disabled}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight  peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Choice 2 (Leave blank for null)
              </label>
            </div>

            <div className="flex grow relative h-10 w-72 min-w-[200px]">
              <select
                value={choice2Val}
                onChange={(e) => setChoice2Val(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="true">True</option>
                <option value="false">False</option>
                <option value="">None</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select the corresponding answer
              </label>
            </div>
          </div>

          {/* Choice 3 */}
          <div className="flex flex-row w-full">
            <div className="flex grow relative">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                type={"text"}
                placeholder={""}
                onChange={(e) => setChoice3(e.target.value)}
                // disabled={props.disabled}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight  peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Choice 3 (Leave blank for null)
              </label>
            </div>

            <div className="flex grow relative h-10 w-72 min-w-[200px]">
              <select
                value={choice3Val}
                onChange={(e) => setChoice3Val(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="true">True</option>
                <option value="false">False</option>
                <option value="">None</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select the corresponding answer
              </label>
            </div>
          </div>

          <div className="flex flex-row w-full">
            <div className="flex grow relative">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                type={"text"}
                placeholder={""}
                onChange={(e) => setChoice4(e.target.value)}
                // disabled={props.disabled}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight  peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Choice 4 (Leave blank for null)
              </label>
            </div>

            <div className="flex grow relative h-10 w-72 min-w-[200px]">
              <select
                value={choice4Val}
                onChange={(e) => setChoice4Val(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="true">True</option>
                <option value="false">False</option>
                <option value="">None</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select the corresponding answer
              </label>
            </div>
          </div>

          <label className="flex gap-5">
            Upload Image:
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>

          {errorMessage && (
            <span className="flex bg-red-100 p-5">{errorMessage}</span>
          )}
          {successMessage && (
            <span className="flex bg-green-100 p-5">{successMessage}</span>
          )}
          <button className="bg-blue-200 place-self-center rounded-full w-max px-20 py-2">
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
}
