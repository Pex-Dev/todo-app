import iconCross from "../assets/images/icon-cross.svg";
import iconCheck from "../assets/images/icon-check.svg";
import { useState } from "react";
import { UseTodo } from "../hooks/TodoContext";

type Filter = "all" | "active" | "completed";

interface Todo {
  id: number;
  complete: boolean;
  text: string;
}

export default function TodoList() {
  const [filer, setFilter] = useState<Filter>("all");
  const [draggingTodo, setDraggingTodo] = useState<Todo>();

  const {
    todoList,
    setTodoList,
    handleSetAsComplete,
    handleClearCompleteTodo,
    handleDeleteTodo,
  } = UseTodo();

  //Obtener la lista de todo filtrados
  const getTodoListFiltered = (): Todo[] => {
    if (filer === "active") {
      return todoList.filter((todo) => !todo.complete);
    }
    if (filer === "completed") {
      return todoList.filter((todo) => todo.complete);
    }
    return todoList;
  };

  //Reordenar lista de todo
  const handleReorderTodo = (todoToReplace: Todo) => {
    const updatedTodoList = todoList.map((todo) => {
      //Reemplazar el todo moviendo por el todo sobre el que se solto
      if (draggingTodo) {
        if (todo.id === draggingTodo.id) {
          return todoToReplace;
        }
      }

      //Reemplazar el todo sobre el que se solto por el que se esta moviendo
      if (todo.id === todoToReplace.id) {
        if (draggingTodo) {
          return draggingTodo;
        }
      }
      return todo;
    });

    //Actualizar lista de todo
    setTodoList(updatedTodoList);
  };

  //Obtener la cantidad de todo sin completar
  const getUncompleteCount = (): number => {
    return todoList.filter((todo) => !todo.complete).length;
  };

  return (
    <>
      <div className="transition-all overflow-hidden rounded-md mt-[16px] md:mt-[24px] duration-300 shadow-lg bg-white dark:bg-slate-800">
        <ul>
          {getTodoListFiltered().map((todo, index) => (
            <li
              key={index}
              draggable={true}
              onDragOver={(e) => e.preventDefault()}
              onDrag={() => setDraggingTodo(todo)}
              onDrop={() => handleReorderTodo(todo)}
              className="animate-fade-up group p-4 flex justify-between transition-colors duration-300 border-b border-gray-300 dark:border-gray-600"
            >
              <div className="flex gap-4 items-center overflow-hidden">
                <button
                  aria-label={`Set ${todo.text} as complete`}
                  onClick={() => handleSetAsComplete(todo.id)}
                  className="flex"
                >
                  <span
                    className={`w-[26px] h-[26px] rounded-full cursor-pointer flex justify-center
                     items-center ${
                       todo.complete
                         ? "gradient-check"
                         : "border border-gray-300 dark:border-gray-600 hover:border-violet-300"
                     }`}
                  >
                    {todo.complete && <img src={iconCheck} alt="icon check" />}
                  </span>
                </button>
                <p
                  className={`cursor-pointer break-all ${
                    todo.complete
                      ? "text-zinc-400 line-through"
                      : "dark:text-white"
                  }`}
                >
                  {todo.text}
                </p>
              </div>
              <button
                className="block md:hidden md:group-hover:block"
                aria-label="Delete todo"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <img src={iconCross} alt="Delete todo" />
              </button>
            </li>
          ))}
        </ul>
        <footer className="flex justify-between py-3 px-4">
          <span className="text-zinc-400">
            {getUncompleteCount()} items left
          </span>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`font-semibold cursor-pointer ${
                filer === "all"
                  ? "text-blue-600"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`font-semibold cursor-pointer ${
                filer === "active"
                  ? "text-blue-600"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`font-semibold cursor-pointer ${
                filer === "completed"
                  ? "text-blue-600"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              }`}
            >
              Complete
            </button>
          </div>
          <button
            onClick={() => handleClearCompleteTodo()}
            className="text-zinc-400"
          >
            Clear Completed
          </button>
        </footer>
      </div>
      <div className="flex justify-center gap-4 p-4 rounded-md mt-[16px] shadow-lg transition-colors duration-300 bg-white dark:bg-slate-800 md:hidden">
        <button
          onClick={() => setFilter("all")}
          className={`font-semibold cursor-pointer ${
            filer === "all"
              ? "text-blue-600"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`font-semibold cursor-pointer ${
            filer === "active"
              ? "text-blue-600"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`font-semibold cursor-pointer ${
            filer === "completed"
              ? "text-blue-600"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
          }`}
        >
          Complete
        </button>
      </div>
      <footer>
        <p className="text-zinc-400 text-center mt-11">
          Drag and drop to reorder list
        </p>
      </footer>
    </>
  );
}
