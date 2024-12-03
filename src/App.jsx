import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { MdEdit, MdDelete } from 'react-icons/md';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const storedTodos = JSON.parse(todoString);
      setTodos(storedTodos);
    }
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    const newTodo = prompt("Edit your todo");
    if (newTodo) {
      setTodos(todos.map(item => item.id === id ? { ...item, todo: newTodo } : item));
      saveToLS();
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (id, isChecked) => {
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: isChecked } : item
    );
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="heading my-10 text-center font-black-2xl font-bold">"Success is not found in perfection, but in persistence. Don't wait for the perfect moment—start now, finish what you began, and let progress be your victory."</div>
      <div className="container mx-auto my-10 rounded-xl p-5 bg-gradient-to-r from-violet-200 to-violet-400 max-w-3xl">
        <div className="addtodo my-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='border border-black rounded-xl w-full px-4 py-2'
          />
          <button
            onClick={handleAdd}
            className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-lg block w-full mt-2'
          >
            Add
          </button>
        </div>
        <div className="my-3 flex items-center">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            id="showFinished"
            className="mr-2"
          />
          <label htmlFor="showFinished" className="font-medium">Show Finished</label>
        </div>
        <h2 className='font-bold text-lg'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold'>No Todos Yet</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) &&
            <div key={item.id} className="todo flex items-center my-3 p-2 border border-gray-300 rounded-lg">
              <input
                name={item.id}
                type="checkbox"
                checked={item.isCompleted}
                onChange={(e) => handleCheckBox(item.id, e.target.checked)}
                className="mr-2"
              />
              <div className={`flex-grow ${item.isCompleted ? "line-through" : ""}`}>
                {item.todo}
              </div>
              <div className="buttons flex ml-4">
                <button onClick={() => handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 rounded-lg text-white'>
                  <MdEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 rounded-lg text-white ml-2'>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
