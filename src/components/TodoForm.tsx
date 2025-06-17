import { useState } from "react";
import { UseTodo } from "../hooks/TodoContext";

type Props = {};

export default function TodoForm({}: Props) {
  const { handleAddTodo } = UseTodo();
  const [todoInput, setTodoInput] = useState<string>("");

  //Manejar el cambio del input
  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (todoInput.length > 0) {
          handleAddTodo(todoInput);
          setTodoInput("");
        }
      }}
      className="w-full p-4 text-xl flex items-center gap-4 rounded-md shadow-lg mt-[40px] md:mt-[50px] transition-colors duration-300 bg-white dark:bg-slate-800"
    >
      <span className="min-w-[26px] min-h-[26px] rounded-full border border-gray-300 dark:border-gray-600"></span>
      <input
        type="text"
        name="todoText"
        onChange={handleTodoInputChange}
        placeholder="Create a new todo..."
        className="w-full focus:outline-0 font-normal text-zinc-600 dark:text-gray-200"
        value={todoInput}
      />
    </form>
  );
}
