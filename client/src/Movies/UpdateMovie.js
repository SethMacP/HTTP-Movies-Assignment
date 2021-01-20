import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from "react-router-dom";

const initialState = {
   id: "",
   title:"",
   director: "",
   metascore: "",
   stars:[],
}



export const UpdateMovie = (props) => {

   const [formState, setFormState]=useState(initialState);
   const params = useParams();
   const history= useHistory();

   useEffect(( )=>{
      axios.get(`http://localhost:5000/api/movies/${params.id}`)
         .then((res) => {
            console.log('res',res.data)
            setFormState(res.data)
         })
         .catch((err) => {
            console.log('err',err.response)
            setFormState({
               title: "ERROR",
               director: "ERROR",
               MetaScore: "ERROR"
            })
         });
   },[params.id])
      
      
      
      
   

   const handleChanges = (ev) => {
      ev.persist()
      // console.log('Changing: ', ev.target.name)
      // console.log('Value: ', ev.target.value)
      setFormState({
         ...formState,
         [ev.target.name]: ev.target.value
      })
   }



   const handleSubmit = (ev) => {
      ev.preventDefault();
      // console.log('params', params.id)
      axios.put(`http://localhost:5000/api/movies/${params.id}`, formState)
         .then(res=>{
            console.log(res)
            setFormState(initialState)
            //Goes back to Root
            // history.push('/')
            // Goes back to this specific movie
            history.push(`/movies/${params.id}`)
         })
         .catch(err=>{
            console.log(err)

         })
   }

   return(
      <div>
         <form 
         onSubmit={handleSubmit}
         >
            <label>
               <input 
                  type='text'
                  value={formState.title}
                  onChange={handleChanges}
                  name="title"
                  placeholder="title"/>
            </label>
            <label>
               <input 
                  type='text'
                  value={formState.director}
                  onChange={handleChanges}
                  name="director"
                  placeholder="director"/>
            </label>
            <label>
               <input 
                  type='text'
                  value={formState.metascore}
                  onChange={handleChanges}
                  name="metascore"
                  placeholder="metascore"/>
            </label>
            {/* <label>
               <input 
                  type='text'
                  value={formState.stars}
                  onChange={handleChanges}
                  name="stars"/>
            </label> */}
            <button>Update</button>
         </form>
         
      </div>

   )
}

export default UpdateMovie;