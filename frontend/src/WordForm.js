import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";
import { add_word } from "./http";
import Card from "./components/Card";
import InputLabel from "./components/InputLabel";
import Button from "./components/Button";

const WordForm = ({ notify, dispatch }) => {
  const [spell, setSpell] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [add_from, setAddFrom] = useState("");
  const handleSpell = (e) => {
    setSpell(e.target.value);
  };
  const handleMeaning = (e) => {
    setMeaning(e.target.value);
  };
  const handleSentence = (e) => {
    setSentence(e.target.value);
  };
  const handleAddFrom = (e) => {
    setAddFrom(e.target.value);
  };

  return (
    <Card>
      <form
        className="box-border flex flex-col justify-evenly h-full "
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
            notify("你起码填个拼写吧😅");
          }
        }}
      >
        <h2 className="text-center text-green-500">Add new word</h2>
        <InputLabel
          htmlFor="spell"
          handleChange={handleSpell}
          title="spell"
          type="text"
          value={spell}
        />
        <InputLabel
          htmlFor="meaning"
          handleChange={handleMeaning}
          title="meaning"
          type="text"
          value={meaning}
        />
        <InputLabel
          htmlFor="sentence"
          handleChange={handleSentence}
          title="sentence"
          type="text"
          value={sentence}
        />
        <InputLabel
          htmlFor="add_from"
          handleChange={handleAddFrom}
          title="add from"
          type="text"
          value={add_from}
        />
        <Button type="submit">
          <FaPlusCircle size={28} className="mx-auto" />
        </Button>
      </form>
    </Card>
  );
};

WordForm.propTypes = {
  notify: PropTypes.func,
  dispatch: PropTypes.func,
};

export default WordForm;
