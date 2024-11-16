import React from "react";
import Header from "./Header";

const HeaderWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default HeaderWrapper;
