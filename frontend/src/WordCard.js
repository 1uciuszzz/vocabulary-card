import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaCheck,
  FaTrashAlt,
  FaEdit,
  FaGrinBeamSweat,
  FaHandPeace,
  FaSpellCheck,
  FaInfo,
  FaAlignJustify,
  FaArrowAltCircleRight,
  FaCalendarAlt,
  FaCheckDouble,
} from "react-icons/fa";
import { del_word, master, update_word } from "./http";

const WordCard = ({ word, dispatch, notify, next, index, count }) => {
  const [editing, setEditing] = useState(false);
  const [meaning, setMeaning] = useState(word.meaning);
  const [sentence, setSentence] = useState(word.sentence);
  const [add_from, setAdd_from] = useState(word.add_from);
  const handleDelete = () => {
    if (index === count - 1) {
      next(0);
    }
    del_word(word.id)
      .then((r) => {
        if (r.status === 204) {
          dispatch({ type: "delete", id: word.id });
        } else {
          notify("Something Wrong");
        }
      })
      .catch((e) => console.log(e));
  };
  const handleMaster = () => {
    master(word.id)
      .then(() => dispatch({ type: "master", id: word.id }))
      .catch((e) => console.log(e));
    notify("挺🐂啊,又背了一个单词");
  };
  const handleMastered = () => {
    notify("你点你🐎呢!!!");
  };
  const handleMeaning = (e) => {
    setMeaning(e.target.value);
  };
  const handleSentence = (e) => {
    setSentence(e.target.value);
  };
  const handleAdd_from = (e) => {
    setAdd_from(e.target.value);
  };
  return editing ? (
    <div className="box-border flex flex-col justify-evenly px-6 h-full bg-gradient-to-br hover:bg-gradient-to-br from-slate-200 hover:from-zinc-200 to-zinc-200 hover:to-slate-200 rounded-lg shadow-md select-none">
      <FaCheck
        size={30}
        onClick={() => {
          setEditing(false);
          if (
            meaning === word.meaning &&
            sentence === word.sentence &&
            add_from === word.add_from
          ) {
            notify("你也妹改啊😅");
            return;
          }
          update_word(word.id, {
            meaning: meaning,
            sentence: sentence,
            add_from: add_from,
          }).then((r) => {
            dispatch({
              type: "update",
              word: r.data,
            });
            notify("应该是修改成功了🤣");
          });
        }}
        className="self-end py-1 w-fit text-black bg-green-300 rounded-md shadow-md cursor-pointer"
      />
      <div className="flex">
        <p className="flex-1">spell:</p>
        <p className="flex-1 font-serif font-bold text-blue-600">
          {word.spell}
        </p>
      </div>
      <label htmlFor="meaning-c" className="flex">
        <p className="flex-1">meaning:</p>
        <input
          type={"text"}
          id="meaning-c"
          value={meaning}
          onChange={handleMeaning}
          className="flex-1  text-center bg-slate-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <label htmlFor="sentence-c" className="flex">
        <p className="flex-1">sentence:</p>
        <input
          type={"text"}
          id="sentence-c"
          value={sentence}
          onChange={handleSentence}
          className="flex-1  text-center bg-slate-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <label htmlFor="add_from-c" className="flex">
        <p className="flex-1">add from:</p>
        <input
          type={"text"}
          id="add_from-c"
          value={add_from}
          onChange={handleAdd_from}
          className="flex-1  text-center bg-slate-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
        />
      </label>
      <div className="flex">
        <p className="flex-1">add date:</p>
        <p className="flex-1 font-serif font-bold text-center text-blue-600">
          {new Date(word.add_date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">mastered:</p>
        <p className="flex-1 font-serif font-bold text-center text-blue-600">
          {word.mastered ? "已掌握" : "未掌握"}
        </p>
      </div>
    </div>
  ) : (
    <div
      onDoubleClick={() => {
        next((index + 1) % count);
      }}
      className="box-border flex flex-col justify-evenly px-6 h-full bg-gradient-to-br hover:bg-gradient-to-br from-slate-200 hover:from-zinc-200 to-zinc-200 hover:to-slate-200 rounded-lg shadow-md select-none"
    >
      <FaEdit
        size={30}
        onClick={() => setEditing(true)}
        className="self-end py-1 w-fit text-black bg-green-300 rounded-md shadow-md cursor-pointer"
      ></FaEdit>
      <div className="flex">
        <p className="flex-1">
          <FaSpellCheck size={28} className="inline pr-2" />
          spell:
        </p>

        <p className="flex-1 font-serif font-bold text-blue-600">
          {word.spell}
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          <FaInfo size={28} className="inline pr-2" />
          meaning:
        </p>
        <p className="flex-1 font-serif font-bold text-blue-600">
          {word.meaning}
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          <FaAlignJustify size={28} className="inline pr-2" />
          sentence:
        </p>
        <p className="flex-1 font-serif font-bold text-blue-600">
          {word.sentence}
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          <FaArrowAltCircleRight size={28} className="inline pr-2" />
          add from:
        </p>
        <p className="flex-1 font-serif font-bold text-blue-600">
          {word.add_from}
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          <FaCalendarAlt size={28} className="inline pr-2" />
          add date:
        </p>
        <p className="flex-1 font-serif font-bold text-blue-600">
          {new Date(word.add_date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          <FaCheckDouble size={28} className="inline pr-2" />
          mastered:
        </p>
        <p className="flex-1 font-serif font-bold text-blue-600">
          {word.mastered ? (
            <FaHandPeace size={30} />
          ) : (
            <FaGrinBeamSweat size={30} />
          )}
        </p>
      </div>
      <FaCheck
        size={30}
        className="py-1 mx-auto w-6/12 text-center bg-gradient-to-br hover:bg-gradient-to-br from-yellow-200 hover:from-green-300 to-green-200 hover:to-yellow-300 rounded-md border-2 border-green-400 shadow-md cursor-pointer"
        onClick={word.mastered ? handleMastered : handleMaster}
      />
      <FaTrashAlt
        size={30}
        className="py-1 mx-auto w-6/12 text-center bg-gradient-to-br hover:bg-gradient-to-br from-red-400 hover:from-orange-500 to-orange-400 hover:to-red-500 rounded-md border-2 border-purple-700 shadow-md cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
};

WordCard.defaultProps = {
  word: {},
  dispatch: () => {},
  notify: () => {},
  next: () => {},
  index: 0,
  count: 0,
};

WordCard.propTypes = {
  word: PropTypes.object,
  dispatch: PropTypes.func,
  notify: PropTypes.func,
  next: PropTypes.func,
  index: PropTypes.number,
  count: PropTypes.number,
};

export default WordCard;
