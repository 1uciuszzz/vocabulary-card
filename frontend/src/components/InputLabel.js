import React from "react";
import PropTypes from "prop-types";

export default function InputLabel({
  title,
  htmlFor,
  value,
  handleChange,
  type,
}) {
  return (
    <label htmlFor={htmlFor} className="flex">
      <p className="flex-1">{title}</p>
      <input
        type={type}
        id={htmlFor}
        value={value}
        onChange={handleChange}
        className="flex-1 text-center bg-slate-100 rounded-md border-b-2 focus:border-b-red-900 focus:outline-none"
      />
    </label>
  );
}

InputLabel.defaultProps = {
  type: "text",
};

InputLabel.propTypes = {
  title: PropTypes.string,
  htmlFor: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  type: PropTypes.string.isRequired,
};
