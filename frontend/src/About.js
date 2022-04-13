import React from "react";
import { FaGithub, FaCalendarAlt } from "react-icons/fa";
import Card from "./components/Card";

export default function About() {
  return (
    <Card classNameCustom="flex-1">
      <p>About</p>
      <p className="font-serif text-black">
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
      <p className="font-serif text-black">
        Finish Date:
        <br />
        <FaCalendarAlt size={28} className="inline pr-2" />
        2022/4/13
      </p>
    </Card>
  );
}
