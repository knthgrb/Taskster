import React, { useRef } from "react";
import style from "../styles/SearchInputField.module.css";
import { FiPlus } from "react-icons/fi";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

const SearchInputField: React.FC<Props> = ({
  todo,
  setTodo,
  handleAddTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className={style.form}
      onSubmit={(e) => {
        handleAddTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input className={style["search-input"]}
        type="input"
        ref={inputRef}
        placeholder="Enter a task..."
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button type="submit">
        <FiPlus size={23} />
      </button>
    </form>
  );
};

export default SearchInputField;
