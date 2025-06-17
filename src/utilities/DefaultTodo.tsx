interface Todo {
  id: number;
  complete: boolean;
  text: string;
}

const defaultTodo: Todo[] = [
  {
    id: 1,
    complete: true,
    text: "Complete online JavaScript course",
  },
  {
    id: 2,
    complete: false,
    text: "Jog around the park 3x",
  },
  {
    id: 3,
    complete: false,
    text: "10 minutes meditation",
  },
  {
    id: 4,
    complete: false,
    text: "Read for 1 hour",
  },
  {
    id: 5,
    complete: false,
    text: "Pick up groceries",
  },
  {
    id: 6,
    complete: false,
    text: "Complete Todo App on Frontend Mentor",
  },
];

export default defaultTodo;
