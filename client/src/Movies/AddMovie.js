import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from 'react-router'

const initialState={
        id: 987654321,
        title: "test one1",
        director: "test two2",
        metascore: "10",
        stars: ["test11","test22","test33"]
}

export const AddMovie = () => {
    const [formState, setFormState] = useState({
        id: Date.now(),
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

    const history= useHistory();

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
         axios.post(`http://localhost:5000/api/movies`, formState)
            .then(res=>{
                console.log(res)
                setFormState(initialState)
                history.push('/')
                
            })
            .catch(err=>{
                console.log(err)
            })
     }

    return(
        <div className='addForm'>
            <form onSubmit={handleSubmit}>
            <label>
                    <input 
                        type='text'
                        name="title"
                        value={formState.title}
                        onChange={handleChanges}
                        placeholder="title"/>
                </label>
                <label>
                    <input 
                        type='text'
                        name="director"
                        value={formState.director}
                        onChange={handleChanges}
                        placeholder="director"/>
                </label>
                <label>
                    <input 
                        type='text'
                        name="metascore"
                        value={formState.metascore}
                        onChange={handleChanges}
                        placeholder="metascore"/>
                </label>
            <button>Add</button>

            </form>
        </div>
    )



}
export default AddMovie;