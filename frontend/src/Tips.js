import React from "react";

export default function Tips({ count }) {
  return (
    <div className="flex-1 p-6 text-slate-800 bg-gradient-to-br from-orange-200 to-purple-200 rounded-md shadow-md">
      <p>Tips</p>
      <p className="text-red-700">
        {count > 1
          ? `There are ${count} words.`
          : count === 0
          ? `There is no word`
          : `There is a word.`}
      </p>
    </div>
  );
}
