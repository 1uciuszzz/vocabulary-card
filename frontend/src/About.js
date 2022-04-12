import React from "react";
import { FaGithub, FaCalendarAlt } from "react-icons/fa";

export default function About() {
  return (
    <div className="flex-1 p-6 bg-gradient-to-tr from-amber-200 to-lime-200 rounded-md shadow-md">
      <p>About</p>
      <p className="text-black">
        Author:
        <br />
        <a
          href="https://1uciuszzz.github.io"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaGithub className="inline pr-2" size={28} />
          @1uciuszzz
        </a>
      </p>
      <p className="text-black">
        Finish Date:
        <br />
        <FaCalendarAlt size={28} className="inline pr-2" />
        2022/4/12
      </p>
    </div>
  );
}
