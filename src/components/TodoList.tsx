import React from "react";
import { Todo } from "../models/todo";
import TodoCard from "./TodoCard";
import style from "../styles/TodoList.module.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className={style["container"]}>
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className={style["active-todos"]}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={style["active"]}>Active Tasks</span>
            <ul className={style["todos-container"]}>
              {todos?.map((todo, index) => (
                <TodoCard
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <Droppable droppableId={"TodosRemove"}>
        {(provided) => (
          <div
            className={style["completed-todos"]}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={style["completed"]}>Completed Tasks</span>
            {completedTodos && (
              <ul className={style["todos-container"]}>
                {completedTodos?.map((todo, index) => (
                  <TodoCard
                    key={todo?.id}
                    index={index}
                    todo={todo}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
