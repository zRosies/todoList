import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import { BsFillCalendarXFill } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import { collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, doc } from "firebase/firestore"; // Import Firebase Firestore functions
import { dataBase } from "./firebase";


const Search = ({ search }) => {
    // const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    // const [todoType, setTodo] = useState("");
    // const [selectType, setTodoType] = useState("");
    // const [isVisible, setIsVisible] = useState(true);
    const [todos, setTodos] = useState([]);
    // const [completedTask, setCompletedTask] = useState([]);
    const [isloading,setIsLoading]= useState(true)
  
    const filterTasks = (query) => {
      if (!query) return todos;
      console.log(query)
      
      return todos.filter(
        (task) =>
          task.todoType.toLowerCase() == query.toLowerCase() ||
          task.categoryType.toLowerCase() == query.toLowerCase() ||
          task.todoType.toLowerCase().slice(0,3) == query.toLowerCase().slice(0,3)
          
      );
    };
  
   
  
    const handleEdit = async (todo, title, category) => {
      await updateDoc(doc(dataBase, "Todos", todo.id), {
        todoType: title,
        categoryType: category,
      });
    };
  
    const toggleComplete = async (todo) => {
      await updateDoc(doc(dataBase, "Todos", todo.id), {
        completed: !todo.completed,
      });
      
    };
  
    const handleDelete = async (id) => {
      await deleteDoc(doc(dataBase, "Todos", id));
    };
  
    // Reset todos based on the taskName prop
    useEffect(() => {
      const delay= 600;

      setTimeout(() => {
        setIsLoading(false)
      }, delay);


      const q = query(collection(dataBase, "Todos"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        let completedArray = [];
        search= search.toLowerCase()
  
        querySnapshot.forEach((doc) => {
          const todoData = { ...doc.data(), id: doc.id };
          todosArray.push(todoData);
          
            
            if (todoData.completed) {
              completedArray.push(todoData.id);
            }
          
        });
  
        setTodos(todosArray);
        setCompletedTask(completedArray);
      });
      return () => unsub();
    }, [search,isloading]);

    useEffect(() => {
        const filtered = filterTasks(search);
        setFilteredTasks(filtered);
        console.log(filtered)
      }, [search, todos]);
  
    return (
      <>
        {isloading ? (
                <div id="div">
                  <span>
                    <BiLoaderAlt className='load' />
                  </span>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="task-list">
                  <div id="div">
                    <p>No task found</p>
                    <span>
                      <BsFillCalendarXFill />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="task-list">
                  {filteredTasks.map((task) => (
                    <AllTasks
                      key={task.id}
                      todo={task}
                      toggleComplete={toggleComplete}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  ))}
                </div>
              )}
      
      </>
    );
  };
  
  export default Search;