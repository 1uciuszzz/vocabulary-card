import React, { useReducer, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import reducer from "./reducer";
import WordForm from "./WordForm";
import WordCard from "./WordCard";
import Tips from "./Tips";
import About from "./About";
import { get_words } from "./http";
export default function App() {
  const [state, dispatch] = useReducer(reducer, { words: [] });
  const [index, setIndex] = useState(0);
  const notify = (msg) => {
    toast(msg);
  };
  useDeepCompareEffect(() => {
    get_words().then((o) => dispatch({ type: "get", words: o.data }));
  }, [state.words]);
  return (
    <>
      <div className="box-border flex flex-wrap gap-10 p-10 w-screen h-screen text-lg text-blue-400 bg-gradient-to-br from-slate-300 to-orange-200">
        <div className="flex-1 flex flex-col gap-10">
          <WordForm notify={notify} dispatch={dispatch} />
          <div className="flex flex-wrap h-3/6 gap-10">
            <Tips count={state.words.length} />
            <About />
          </div>
        </div>
        <div className="flex-1">
          {/* state.words.map((word) => {
            return (
              <WordCard
                notify={notify}
                dispatch={dispatch}
                key={word.id}
                word={word}
              />
            );
          }) */}
          {state.words.length ? (
            <WordCard
              count={state.words.length}
              index={index}
              next={setIndex}
              notify={notify}
              dispatch={dispatch}
              key={state.words[index].id}
              word={state.words[index]}
            />
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
