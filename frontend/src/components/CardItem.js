import React from "react";
import PropTypes from "prop-types";

export default function CardItem({ children }) {
  return <div className="flex">{children}</div>;
}

CardItem.propTypes = {
  children: PropTypes.node.isRequired,
};
