import { useState, useRef } from "react";
import ListItem from "./components/UI/List/ListItem.jsx";
import { ToastContainer, toast } from "react-toastify";
// import Header from "./components/Header"

const App = () => {
  const [todo, setTodo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getValues = (e) => {
    setData([...data, { userName, phoneNumber }]);
    setOpenModal(false);
  };
  console.log(data);

  const inputRef = useRef("");

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: inputRef.current?.value,
      isDone: false,
    };

    if (newTask.title.trim().length) {
      setTodo([...todo, newTask]);
      inputRef.current.value = "";
      toast.success("added successfully", {
        position: "top-right",
        autoClose: 500,
      });
    } else {
      toast.error("please enter a task title", {
        position: "top-right",
        hideProgressBar: false,
        theme: "light",
        autoClose: 2000,
      });
    }
  };

  const deleteTask = (id) => {
    const filterdTodo = todo.filter((item) => item.id != id);
    setTodo(filterdTodo);
    toast.info("deleted successfully");
  };

  // const deleteContact = (id) => {
  //   const filterContact = data.filter((item) => item.id != id);
  //   setData(filterContact);
  //   toast.info("deleted successfully");
  // };

  return (
    <>
      <div className="container mx-auto">
        <ToastContainer />
        <div className="wrapper mx-auto mt-8 w-[800px] bg-green-200 p-2">
          <div className="todo">
            <h2 className="text-center font-semibold text-green-600 my-3">
              MY TODO APP
            </h2>
            <div className="todo-header p-2 bg-cyan-100 flex gap-x-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter task name"
                className="py-2 grow ps-4 focus:outline-none focus:shadow-lg duration-100"
              />
              <button
                onClick={() => addTask()}
                className="bg-green-500 px-3 py-2 rounded-lg text-white active:bg-green-700"
              >
                Add new task
              </button>
            </div>

            <div className="todo-body p-2  bg-cyan-100 my-3">
              <ul>
                {" "}
                {todo.length ? (
                  todo.map((item, index) => {
                    return (
                      <ListItem
                        deleteTodo={deleteTask}
                        state={item}
                        index={index}
                        key={item.id}
                      />
                    );
                  })
                ) : (
                  <h1 className="text-center">TASK LIST EMPTY</h1>
                )}{" "}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <nav className="grid place-content-center mx-auto mt-5 rounded-xl">
          <button
            onClick={() => setOpenModal(true)}
            className="p-3 bg-green-500 w-[800px] rounded-xl"
          >
            Add Contact
          </button>
        </nav>
      </div>

      <header className="pt-5">
        {openModal === true && (
          <div className="container mx-auto">
            <div className="absolute z-[99] w-full h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div className="showModal w-[700px] absolute z-[100] top-[35%] bg-white left-[33%] h-[400px] mx-auto shadow-lg rounded-lg hover:shadow-2xl">
              <div className="card p-5 w-[100%] h-full relative">
                <h1 className="text-center text-2xl uppercase leading-4">
                  Add new contact
                </h1>
                <i
                  onClick={() => setOpenModal(false)}
                  className="bx bx-x text-5xl absolute right-5 top-5 hover:bg-[rgba(0,0,0,0.8)] rounded-xl hover:text-white duration-200"
                ></i>
                <form className="w-[600px] p-4" action="#">
                  <label htmlFor="#">Name</label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    name="userName"
                    required
                    className="block mt-3 mb-3 w-full h-[50px] rounded-xl py-2 px-3 border border-black"
                    type="text"
                    placeholder="Enter full name"
                  />
                  <label htmlFor="#">Enter your phone number</label>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="phoneNumber"
                    required
                    type="tel"
                    className="block mt-3 mb-3 w-full rounded-xl py-2 px-3 border border-black"
                    placeholder="Enter Phone number"
                  />
                  <button
                    onClick={() => getValues()}
                    type="submit"
                    className="w-full mt-2 py-2 px-3 bg-blue-600 focus:bg-blue-700 text-white rounded-lg"
                  >
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </header>
      {data.length > 0
        ? data.map((el) => (
            <>
              <div className="container mx-auto w-[700px] pb-3 bg-gray-200">
                <h1 className="text-2xl mb-2 mt-4">
                  New contact name: {el.userName}
                </h1>
                <p>Phone number: {el.phoneNumber}</p>
                <button onClick={() => deleteContact(id)} className="bg-red-400 py-2 px-3 rounded-lg mt-4 mb-4">
                  delete
                </button>
              </div>
            </>
          ))
        : (<h1 className="text-center text-2xl">data not found</h1>)}
    </>
  );
};

export default App;
