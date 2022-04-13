import React from "react";
import PropTypes from "prop-types";

export default function Card({
  children,
  classNameCustom,
  next,
  index,
  count,
}) {
  return (
    <div
      onDoubleClick={() => next((index + 1) % count)}
      className={"box-border flex flex-col justify-evenly px-6 h-full bg-gradient-to-br hover:bg-gradient-to-br from-slate-200 hover:from-zinc-200 to-zinc-200 hover:to-slate-200 rounded-lg shadow-md".concat(
        classNameCustom ? " " + classNameCustom : null
      )}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  classNameCustom: PropTypes.string,
  next: PropTypes.func,
  index: PropTypes.number,
  count: PropTypes.number,
};
