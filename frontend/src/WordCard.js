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
import Card from "./components/Card";
import CardItem from "./components/CardItem";
import InputLabel from "./components/InputLabel";
import CardItemText from "./components/CardItemText";
import CardItemSerif from "./components/CardItemSerif";
import Button from "./components/Button";

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
    <Card>
      <FaCheck
        size={28}
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
        className="self-end p-1 w-fit text-black bg-green-300 rounded-md shadow-md cursor-pointer"
      />
      <CardItem>
        <CardItemText text="spell" />
        <CardItemSerif text={word.spell} />
      </CardItem>
      <InputLabel
        htmlFor="meaning-c"
        title="meaning"
        type="text"
        value={meaning}
        handleChange={handleMeaning}
      />
      <InputLabel
        htmlFor="sentence-c"
        title="sentence"
        type="text"
        value={sentence}
        handleChange={handleSentence}
      />
      <InputLabel
        htmlFor="add_from-c"
        title="add from"
        type="text"
        value={add_from}
        handleChange={handleAdd_from}
      />
      <CardItem>
        <CardItemText text="add date" />
        <CardItemSerif text={new Date(word.add_date).toLocaleDateString()} />
      </CardItem>
      <CardItem>
        <CardItemText text="mastered" />
        <CardItemSerif
          text={
            word.mastered ? (
              <FaHandPeace size={28} />
            ) : (
              <FaGrinBeamSweat size={28} />
            )
          }
        />
      </CardItem>
    </Card>
  ) : (
    <Card next={next} index={index} count={count}>
      <FaEdit
        size={28}
        onClick={() => setEditing(true)}
        className="self-end p-1 w-fit text-black bg-green-300 rounded-md shadow-md cursor-pointer"
      ></FaEdit>
      <CardItem>
        <CardItemText>
          <FaSpellCheck size={28} className="inline pr-2" />
          spell
        </CardItemText>
        <CardItemSerif text={word.spell} />
      </CardItem>
      <CardItem>
        <CardItemText>
          <FaInfo size={28} className="inline pr-2" />
          meaning
        </CardItemText>
        <CardItemSerif text={word.meaning} />
      </CardItem>
      <CardItem>
        <CardItemText>
          <FaAlignJustify size={28} className="inline pr-2" />
          sentence
        </CardItemText>
        <CardItemSerif text={word.sentence} />
      </CardItem>
      <CardItem>
        <CardItemText>
          <FaArrowAltCircleRight size={28} className="inline pr-2" />
          add from
        </CardItemText>
        <CardItemSerif text={word.add_from} />
      </CardItem>
      <CardItem>
        <CardItemText>
          <FaCalendarAlt size={28} className="inline pr-2" />
          add date
        </CardItemText>
        <CardItemSerif text={new Date(word.add_date).toLocaleDateString()} />
      </CardItem>
      <CardItem>
        <CardItemText>
          <FaCheckDouble size={28} className="inline pr-2" />
          mastered
        </CardItemText>
        <CardItemSerif
          text={
            word.mastered ? (
              <FaHandPeace size={28} />
            ) : (
              <FaGrinBeamSweat size={28} />
            )
          }
        />
      </CardItem>
      <Button handleClick={word.mastered ? handleMastered : handleMaster}>
        <FaCheck size={28} className="mx-auto" />
      </Button>
      <Button handleClick={handleDelete}>
        <FaTrashAlt size={28} className="mx-auto" />
      </Button>
    </Card>
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
