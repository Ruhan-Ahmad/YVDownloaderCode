import React from 'react';
import {useState} from 'react';
import { Result } from './Result';

export const Search = () => {
    const [Value, setValue] = useState([])
    const [query, setquery] = useState('')

    const result = async (e) => {
        e.preventDefault()
        if(query !== ''){
        try {
            let res = await fetch('/find',{
                method: 'POST',
                body: JSON.stringify({
                  query: query 
                })
            })
            let data = await res.json()
            setValue(data.results)
        }
        catch (err) {
            console.log("error")
        }
    }
    }
    /*{(typeof Value.results === 'undefined') ? (
                //here is code for if you start to show loading before the api laods
                console.log("API LOADING")
            ) : (
                Value.results.map((data, i) => (
                    <Result res = {data} key={i}/>
                ))
            )}*/
    return (
        <div className="container">
            <form onSubmit = {result}>
                    <div className="form-group py-4">
                        <label htmlFor="input">Enter Movie To Search</label>
                        <input type="text" name="Search" className="form-control" id="input" placeholder="Enter Youtube Video Link" value={query} onChange = {(e)=>{setquery(e.target.value)}} />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">Search</button>
            </form>
            {Value.map((data,i)=>(
                <Result res = {data} key ={i} />
            ))}
        </div>
    )
}
