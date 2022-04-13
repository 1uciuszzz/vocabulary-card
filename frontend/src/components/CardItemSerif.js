import React from "react";
import PropTypes from "prop-types";

export default function CardItemSerif({ text, color, children }) {
  return (
    <p className={`flex-1 font-serif font-bold text-center ${color}`}>
      {children ? children : text}
    </p>
  );
}

CardItemSerif.defaultProps = {
  color: "text-blue-600",
};

CardItemSerif.propTypes = {
  text: PropTypes.any,
  color: PropTypes.string,
  children: PropTypes.node,
};
