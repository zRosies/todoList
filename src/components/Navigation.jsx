import { BsFillPlusSquareFill,BsTrashFill,BsSearch,} from "react-icons/bs";
import {BiHomeAlt,BiMenu,BiSolidMedal,BiLoaderAlt } from "react-icons/bi"
import {MdDoneOutline} from "react-icons/md"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../css/Navigation.css"
import Search from "./Search";

const Navigation = ({todos, completedTask, isVisible, setIsVisible, setUpdatedSearch, resetSearch}) => {
    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");
    const [isloading, setIsLoading]= useState(true);
    const navigate= useNavigate();
   

    const handleNavigate = (e) => {
        e.preventDefault();
        if (search) {
          setSubmittedSearch(search); // Set the submitted search value
          setUpdatedSearch(search);
        }
        setSubmittedSearch("");
        setSearch("");
        

      };

    const toggleMenu = ()=>{
        setIsVisible(!isVisible);
        
    }
    useEffect (()=>{
        const delay= 600;

        setTimeout(() => {
            setIsLoading(false)
        }, delay);
    })
    return (
        
        <>
        <header >
            <div className='head'>
                <div className="new">
                    <span id="toggle" onClick={toggleMenu}><BiMenu/></span>
                    <Link to="/" onClick={resetSearch}><BiHomeAlt id="home"></BiHomeAlt></Link>
                </div>
                <form onSubmit={handleNavigate} >
                    <input type="text" id='search' placeholder='Search'
                       onChange={(e)=>{setSearch(e.target.value)}}
                       value={search}
                       
                    />
                    <button className='scicon'><BsSearch ></BsSearch></button>
                    
                    
                    
                </form>
            </div>
            { isloading?(
                <span >< BiLoaderAlt className='load'></BiLoaderAlt></span>
            
            ):
            (
                <div className="starDiv">
                    <span className="star"><BiSolidMedal></BiSolidMedal></span>
                    <span>{completedTask.length}/{todos.length}</span>
                </div>
            )
            }
        </header>
        {/* <Search search={submittedSearch} /> */}
      </> 
     );
}
 
export default Navigation;