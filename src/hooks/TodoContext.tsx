import React, { createContext, useContext, useState, useEffect } from "react";
import defaultTodo from "../utilities/DefaultTodo";

interface Todo {
  id: number;
  complete: boolean;
  text: string;
}
interface TodoContextType {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleAddTodo: (text: string) => void;
  handleSetAsComplete: (id: number) => void;
  handleClearCompleteTodo: () => void;
  handleDeleteTodo: (id: number) => void;
}
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  //Generar un nuevo id
  const generateId = (): number => {
    let newId = 1;

    if (todoList.length === 0) {
      return newId;
    }

    const todosIds = todoList.map((todo) => todo.id);

    while (todosIds.includes(newId)) {
      newId++;
    }

    return newId;
  };

  //Añadir al TODO
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      complete: false,
      text: text,
    };

    setTodoList([...todoList, newTodo]);
    localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
  };

  //Completar TODO
  const handleSetAsComplete = (id: number) => {
    const todo: Todo | undefined = todoList.find((todo) => todo.id === id);
    if (todo == undefined) {
      return;
    }

    const todoListUpdated: Todo[] = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          id: id,
          complete: !todo.complete,
          text: todo.text,
        };
      }
      return todo;
    });

    setTodoList(todoListUpdated);
    localStorage.setItem("todoList", JSON.stringify(todoListUpdated));
  };

  //Eliminar un todo
  const handleDeleteTodo = (id: number) => {
    const todoListUpdated: Todo[] = todoList.filter((todo) => todo.id != id);
    setTodoList(todoListUpdated);
    localStorage.setItem("todoList", JSON.stringify(todoListUpdated));
  };

  //Eliminar TODOs terminados
  const handleClearCompleteTodo = () => {
    const todoListUpdated = todoList.filter((todo) => !todo.complete);
    setTodoList(todoListUpdated);
    localStorage.setItem("todoList", JSON.stringify(todoListUpdated));
  };

  //Obtener la lista del local storage cuando se monta el componente
  useEffect(() => {
    const storagedTodoList = localStorage.getItem("todoList");
    if (!storagedTodoList) {
      setTodoList(defaultTodo);
      return;
    }
    setTodoList(JSON.parse(storagedTodoList));
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        handleAddTodo,
        handleSetAsComplete,
        handleClearCompleteTodo,
        handleDeleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const UseTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("UseTodo solo puede usarse dentro de TodoProvider");
  }
  return context;
};
