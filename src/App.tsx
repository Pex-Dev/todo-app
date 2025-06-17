import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { UseTodo } from "./hooks/TodoContext";

function App() {
  const { todoList } = UseTodo();
  return (
    <div className="min-h-[100dvh] pt-[47px] md:pt-[78px] p-4 md:p-0 transition-colors duration-300 bg-zinc-100 bg-mobile-light md:bg-desktop-light dark:bg-gray-900 dark:bg-mobile-dark dark:md:bg-desktop-dark ">
      <main className="max-w-[540px] mx-auto ">
        <Header />
        <TodoForm />
        {todoList.length > 0 && <TodoList />}
      </main>
    </div>
  );
}
export default App;
