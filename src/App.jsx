import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import "./App.css";

export default function App() {
  let [allTodo, setAllTodo] = useState([]);
  let [newTitle, setNewTitle] = useState("");
  let [newDesc, setNewDesc] = useState("");
  let [completedTodo, setcompletedTodo] = useState([]);

  let [isCompleted, setIsCompleted] = useState(false);

  function handleAddTodo(e) {
    e.preventDefault();
    let allTodoObj = {
      title: newTitle,
      desc: newDesc,
    };

    if (newTitle === "" || newDesc === "") {
      alert("Please Fill the Form perfectly");
      return;
    }
    let updatedTodo = [...allTodo];
    console.log(updatedTodo);
    updatedTodo.push(allTodoObj);
    setAllTodo(updatedTodo);
    localStorage.setItem("allTodo", JSON.stringify(updatedTodo));
    setNewTitle("");
    setNewDesc("");
  }
  const deleteTodo = (index) => {
    const reducedTodo = [...allTodo];
    reducedTodo.splice(index, 1);
    localStorage.setItem("allTodo", JSON.stringify(reducedTodo));
    setAllTodo(reducedTodo);
  };
  const updatedTodo = (index) => {
    let now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    // let completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()} `
    let filteredTodo = {
      ...allTodo[index],
      completedOn: formattedTime,
    };

    let updatedTodoList = [...completedTodo];
    updatedTodoList.push(filteredTodo);
    setcompletedTodo(updatedTodoList);
    deleteTodo(index);
    localStorage.setItem("completedTodo", JSON.stringify(updatedTodoList));
  };

  const deleteCompleteTodo = (index) => {
    const reducedTodo = [...completedTodo];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodo", JSON.stringify(reducedTodo));
    setcompletedTodo(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("allTodo"));
    if (savedTodo) {
      setAllTodo(savedTodo);
    }
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodo"));

    if (savedCompletedTodo) {
      setcompletedTodo(savedCompletedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1 className="text-4xl mt-5">My Todo's</h1>
      <div className="todo-wrapper flex flex-col">
        <form>
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Enter Title of Your Task "
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                required
              />
            </div>
            <div className="todo-input-item">
              <label htmlFor="title">Description</label>
              <input
                type="text"
                placeholder="Enter Description of Your Task "
                onChange={(e) => setNewDesc(e.target.value)}
                value={newDesc}
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                className="primaryBtn"
                onClick={handleAddTodo}
              >
                Add Todo
              </button>
            </div>
          </div>
        </form>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleted === false && "active"}`}
            onClick={() => setIsCompleted(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleted === true && "active"}`}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </button>
        </div>
        {isCompleted === false &&
          allTodo.map((item, index) => {
            return (
              <div className="todo-list" key={index}>
                <div className="todo-list-item">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <div className="flex justify-evenly">
                    <MdDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => deleteTodo(index)}
                    />
                    <FaCheck
                      className="check-icon"
                      onClick={() => updatedTodo(index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        {isCompleted === true &&
          completedTodo.map((item, index) => {
            return (
              <div className="todo-list" key={index}>
                <div className="todo-list-item">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <p>
                      <small>Completed On : {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <MdDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => deleteCompleteTodo(index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
