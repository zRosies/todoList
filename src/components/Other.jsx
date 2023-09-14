import { useEffect, useState } from 'react'
import {BiSolidBookBookmark, BiSolidBriefcase} from "react-icons/bi"
import {GiPerspectiveDiceSixFacesRandom} from "react-icons/gi"

import { BsFillPlusSquareFill,BsFillCalendarXFill, BsFire } from "react-icons/bs";
import {BiHomeAlt,BiMenu, BiLoaderAlt } from "react-icons/bi"
import {MdBlockFlipped} from "react-icons/md"
import { dataBase } from './firebase';
import { collection, addDoc, QuerySnapshot } from 'firebase/firestore';
import '../Home.css'
import { Link } from 'react-router-dom';
import AllTasks from './AllTasks';
import Navigation  from './Navigation';
import Search from './Search';


import {
 
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Other() {
  const [todoType, setTodo]= useState("");
  const [selectType, setTodoType]= useState("Other");
  const [isVisible, setIsVisible]= useState(true);
  const [todos, setTodos]= useState([]);
  const [completedTask, setCompletedTask]=useState([]);
  const [PersonalDev, setPersonalDev]= useState([]);
  const [isloading,setIsLoading]=useState(true);
  const [search, setSearch]= useState("");

  //Handle Events

 
  const UpdateSearch = (search)=>{
    setSearch(search);
    
  }

  const resetSearch= ()=>{
    setSearch("")
  }
 
  const  AddTodo = async (e)=>{
    
    e.preventDefault();
    if(todoType != ""){
      await addDoc(collection(dataBase,"Todos"),{
        todoType,
        completed: false,
        categoryType: selectType,
        
      });

      setTodo("");
      setTodoType("Other");
      
    }

  }
  const handleEdit = async (todo, title, category) =>{
    await updateDoc(doc(dataBase,"Todos",todo.id),{todoType: title, categoryType: category})
  }

  const toggleComplete = async (todo) =>{
    await updateDoc(doc(dataBase,"Todos",todo.id),{completed: !todo.completed})
  }
  const handleDelete = async (id) =>{
    await deleteDoc(doc(dataBase,"Todos",id))
  }

  //reset
  useEffect(()=>{
    const delay= 600;
    setTimeout(() => {
      setIsLoading(false)
    }, delay);  


    const q = query(collection(dataBase, "Todos"));
    const unsub =onSnapshot(q,(querySnapshot)=>{
      
      let todosArray=[];
      let completedArray=[];
      let personDev=[];
      
      querySnapshot.forEach((doc)=>{
        const todoData = {...doc.data(), id:doc.id};
        todosArray.push(todoData);
        if(todoData.completed){
          completedArray.push(todoData.id);
        }
        if(todoData.categoryType=="Other" || todoData.categoryType==""){
            personDev.push(todoData)
           
        }
        
       
      });
     
      setTodos(todosArray)
      setCompletedTask(completedArray)
      setPersonalDev(personDev)
    })
    return ()=> unsub();
  },[])

  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsVisible(false);
    }
  }, []);
    
  
  return (
    <>
       <Navigation todos={todos} 
        completedTask={completedTask}
        isVisible ={isVisible}
        setIsVisible={setIsVisible}
        setTodoType={setTodoType}
        setUpdatedSearch={UpdateSearch}
        resetSearch={resetSearch}

      />
      <main>
        
        {isVisible &&(
           <div className={`menu ${isVisible ? 'active' : ''}`}>
            <nav>
              <Link to ="/"><span className='home'><BiHomeAlt/></span> Home</Link>
              <Link to="/dev"> <span className='fire'><BsFire></BsFire></span> Personal Development</Link>
              <Link to="/study"> <span className='book'><BiSolidBookBookmark/></span> Study </Link>
              <Link to="/work"> <span className='case'><BiSolidBriefcase/></span> Work </Link>
              <Link to="/other"> <span className='dice'><GiPerspectiveDiceSixFacesRandom/></span> Other</Link>
            </nav>
          </div>
        )}
         {search.length !== 0 ? (
                            <div className='todoDif'>
                              <h2>Results for <span>{search}</span>...</h2>
                              <Search search={search} />
                            </div>
                          ) : (
                            <form className="todo" onSubmit={AddTodo}>
                              <h2>Other</h2>
                              <div>
                                <input 
                                  type="text" 
                                  placeholder='Write a task'
                                  value={todoType}
                                  onChange={(e)=>setTodo(e.target.value)}
                                />
                                <button id='btn' ><BsFillPlusSquareFill></BsFillPlusSquareFill></button>
                              </div>
                              <select
                                value={selectType}
                                onChange={(e)=>setTodoType(e.target.value)}
                              >
                                <option value="Personal development">Other</option>
                              </select>
                              {isloading ? (
                                <div id="div">
                                  <span>
                                    <BiLoaderAlt className='load' />
                                  </span>
                                </div>
                              ) : PersonalDev.length === 0 ? (
                                <div id='div'>
                                  No tasks added yet!
                                  <span>
                                    <BsFillCalendarXFill />
                                  </span>
                                </div>
                              ) : (
                                PersonalDev.map((todo) => (
                                  <AllTasks
                                    key={todo.id}
                                    todo={todo}
                                    toggleComplete={toggleComplete}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                  />
                                ))
                              )}
                            </form>
                          )}
      </main>
     
     
    </>
  )
}

export default Other;




