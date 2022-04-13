import React from "react";
import PropTypes from "prop-types";

export default function CardItemText({ text, children }) {
  return children ? (
    <p className="flex-1">{children}</p>
  ) : (
    <p className="flex-1">{text}</p>
  );
}

CardItemText.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
