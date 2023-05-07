"use client";
import React from "react";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button
      onClick={() => console.log("ehi")}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
