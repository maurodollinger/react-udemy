import React , {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter,setEnteredFilter] = useState('')
  const {onLoadIngredients} = props;
  const urlAPI = 'https://react-udemy-ingredients-default-rtdb.firebaseio.com/ingredients.json';
  const inputRef = useRef();

  useEffect(()=>{
    const timer = setTimeout(()=>{
      // enteredFilter is the previous value, when the timeOut has been created, inputRef is the actual value
      if(enteredFilter===inputRef.current.value){
        const query  = (enteredFilter.length===0) ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch(urlAPI + query)
        .then(response=>response.json())
        .then(responseData=>{
          const loadedIngredients = [];
          for(const key in responseData){
            loadedIngredients.push({
              id:key,
              title:responseData[key].title,
              amount:responseData[key].amount
            })
          }
          onLoadIngredients(loadedIngredients);
        })
      }
    },500);
    // cleanUp function
    return ()=>{
      clearTimeout(timer);
    }
  },[enteredFilter,onLoadIngredients]) 

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event=>setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
