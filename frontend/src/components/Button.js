import React from "react";
import PropTypes from "prop-types";

export default function Button({ children, text, type, handleClick }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className="py-1 mx-auto w-6/12 bg-gradient-to-br hover:bg-gradient-to-br from-yellow-200 hover:from-green-300 to-green-200 hover:to-yellow-300 rounded-md border-2 border-green-400 shadow-md"
    >
      {children ? children : text}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
};

Button.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  type: PropTypes.string,
  handleClick: PropTypes.func,
};
