interface TodoProps {
  title: string;
  isDone: boolean;
  color: "red" | "blue" | "orange";
  onClick: (e: MouseEvent) => void;
}


function Todo({title, isDone, onClick}:TodoProps) {
  return (
    <div></div>
  )
}

export default Todo