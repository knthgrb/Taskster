import React from "react";
import style from "../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <h2>taskify</h2>
    </div>
  );
};

export default Header;
