import React from "react";
import PropTypes from "prop-types";
import Card from "./components/Card";

export default function Tips({ count }) {
  return (
    <Card classNameCustom="flex-1">
      <p>Tips</p>
      <p className="font-serif text-red-700">
        {count > 1
          ? `There are ${count} words.`
          : count === 0
          ? `There is no word`
          : `There is a word.`}
      </p>
    </Card>
  );
}

Tips.defaultProps = {
  count: 0,
};

Tips.propTypes = {
  count: PropTypes.number,
};
