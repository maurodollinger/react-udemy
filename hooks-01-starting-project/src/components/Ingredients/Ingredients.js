import React, {useReducer, useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients,action) =>{
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients,action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing=>ing.id !== action.id);
    default:
      throw new Error('Should not get there!')
  }

}

// estas funciones afuera para evitar que se re-rendereen. si utilizo props pueden ir dentro de Ingredients
const httpReducer = (currHttpState,action) =>{
  switch(action.type){
    case 'SEND':
      return {loading:true, error:null};
    case 'RESPONSE':
      return {...currHttpState, loading:false}; // loading is overwritten after the spread operator
    case 'ERROR':
      return {loading:false,error:action.errorMessage};
    case 'CLEAR':
      return {...currHttpState,error:null};
    default:
      throw new Error('Should not get there!')
  }
}


function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []); 
  const [httpState, dispatchHttp] = useReducer(httpReducer,{loading:false,error:null});
  //const [userIngredients,setUserIngredients] = useState([]);
  //const [isLoading,setIsLoading] = useState(false);
  //const [error,setError] = useState();
  const urlAPI = 'https://react-udemy-ingredients-default-rtdb.firebaseio.com/' + 'ingredients.json';


  useEffect(()=>{
    console.log(userIngredients);
  },[userIngredients]) // en el array le puedo pasar las dependencies que tiene que monitorear

  const addIngredientHanlder = ingredient => {
    //setIsLoading(true);
    dispatchHttp({type:'SEND'})
    fetch(urlAPI,{
      method:'POST',
      body:JSON.stringify(ingredient),
      headers:{ 'Content-Type' : 'application/json'}
    }).then(response => {
      //setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});
      return response.json();
    }).then(responseData => {
      dispatch({type:'ADD',ingredient:{ id: responseData.name, ...ingredient}})
      /*
      setUserIngredients(prevIngredients => 
        [...prevIngredients, 
        { id: responseData.name, ...ingredient}]);*/
    }).catch((error)=>{
      //setError(error.message);
      dispatchHttp({type:'ERROR',errorMessage:error.message})
    });
  }

  const removeIngredientHandler = ingredientID => {
    //setIsLoading(true);
    dispatchHttp({type:'SEND'})
    fetch(`https://react-udemy-ingredients-default-rtdb.firebaseio.com/ingredients/${ingredientID}.json`,{
      method:'DELETE',
    }).then(response=>{
      //setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});
      //const updatedIngredients = userIngredients.filter((ig)=> ig.id !== ingredientID );
      //setUserIngredients(updatedIngredients);
      dispatch({type:'DELETE',id:ingredientID});
    }).catch((error)=>{
      //setError(error.message);
      dispatchHttp({type:'ERROR',errorMessage:error.message})
    })

    
  }

  // useCallback, store the function, to prevent call in it again
  const onFilteredIngredients = useCallback(filteredIngredients =>{
    //setUserIngredients(filteredIngredients);
    dispatch({type:'SET',ingredients:filteredIngredients});
  },[]);

  const clearError = () =>{
   // setError(null);
   // setIsLoading(false);
   dispatchHttp({type:'CLEAR'})
  }
  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHanlder} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={onFilteredIngredients}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
