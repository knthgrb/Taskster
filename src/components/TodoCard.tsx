import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../models/todo";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import style from "../styles/TodoCard.module.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);
  const [editedTodo, setEditedTodo] = useState<string>(todo?.todo);

  //AUTOFOCUS ON INPUT WHEN EDITING STATE
  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

  //HANDLE DELETE TODO
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //HANDLE DELETE TODO
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editedTodo } : todo
      )
    );
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={todo?.id.toString()} index={index}>
      {(provided) => (
        <form
          className={style.card}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <input
              onChange={(e) => setEditedTodo(e.target.value)}
              className={style["edit-input"]}
              type="input"
              ref={editRef}
              value={editedTodo}
              onBlur={() => setIsEditing(!isEditing)}
            />
          ) : (
            <span className={style.text}>{editedTodo}</span>
          )}
          <div className={style.tools}>
            <span
              className={style.icon}
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? <FiSave /> : <FiEdit3 />}
            </span>

            <span className={style.icon} onClick={() => handleDelete(todo?.id)}>
              <AiOutlineDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
