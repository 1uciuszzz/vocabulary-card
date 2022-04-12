import React, { useState } from "react";
import PropTypes from "prop-types";
import { add_word } from "./http";

const WordForm = ({ notify, dispatch }) => {
  const [spell, setSpell] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [add_from, setAddFrom] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        try {
          add_word({
            spell,
            meaning,
            sentence,
            add_from,
          })
            .then((r) => {
              dispatch({ type: "create", word: r.data });
              notify("又碰到不会的了...");
            })
            .catch(() => {
              notify("出错了😅");
            });
          setSpell("");
          setMeaning("");
          setSentence("");
          setAddFrom("");
        } catch (e) {
          console.log("please check the spell field");
        }
      }}
      className="box-border flex flex-col justify-evenly px-6 h-3/6 bg-gradient-to-br from-white to-slate-200 rounded-lg shadow-md"
    >
      <h2 className="text-center text-green-500">Add new word</h2>
      <label htmlFor="spell" className="flex">
        <span>spell:</span>
        <input
          id="spell"
          value={spell}
          onChange={(e) => setSpell(e.target.value)}
          type={"text"}
          className="flex-1 text-center bg-red-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <label htmlFor="meaning" className="flex">
        <span>meaning:</span>
        <input
          id="meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          type={"text"}
          className="flex-1 text-center bg-red-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <label htmlFor="sentence" className="flex">
        <span>sentence:</span>
        <input
          id="sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          type={"text"}
          className="flex-1 text-center bg-red-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <label htmlFor="add_from" className="flex">
        <span>add from:</span>
        <input
          id="add_from"
          value={add_from}
          onChange={(e) => setAddFrom(e.target.value)}
          type={"text"}
          className="flex-1 text-center bg-red-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <label className="mx-auto w-6/12">
        <input
          type={"submit"}
          value={"➕"}
          className="w-full bg-gradient-to-r from-green-300 hover:from-red-300 to-red-300 hover:to-green-300 rounded-md border-2 border-orange-300 shadow-md hover:cursor-pointer"
        />
      </label>
    </form>
  );
};

WordForm.propTypes = {
  notify: PropTypes.func,
  dispatch: PropTypes.func,
};

export default WordForm;
