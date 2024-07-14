import React from "react";
import style from "../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <h2>taskster</h2>
    </div>
  );
};

export default Header;
