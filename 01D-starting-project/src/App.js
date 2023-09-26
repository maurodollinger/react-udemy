import {useState} from 'react';
import FormCalculator from './Components/FormCalculator';
import TableResults from './Components/TableResults';
import Header from './Components/Header';
function App() {
  const [userInput,setUserInput] = useState(null);

  const handleSubmit = (data) =>{
    //calculateHandler(data);
    setUserInput(data);
  }

    const yearlyData = []; // per-year results

    if(userInput){
      console.log(userInput);
        let currentSavings = +userInput["currentSavings"]; // feel free to change the shape of this input object!
        const yearlyContribution = +userInput["yearlyContribution"]; // as mentioned: feel free to change the shape...
        const expectedReturn = +userInput["expectedReturn"] / 100;
        const duration = +userInput["duration"];
    
        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration; i++) {
          const yearlyInterest = currentSavings * expectedReturn;
          currentSavings += yearlyInterest + yearlyContribution;
          yearlyData.push({
            // feel free to change the shape of the data pushed to the array!
            year: i + 1,
            yearlyInterest: yearlyInterest,
            savingsEndOfYear: currentSavings,
            yearlyContribution: yearlyContribution,
          });
        }        
    }
    

  return (
    <div>
      <Header/>

      <FormCalculator onSubmitForm={handleSubmit}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {}
      {userInput && <TableResults data={yearlyData} initialInvestment={userInput['currentSavings']}/>}
      {!userInput && <p style={{textAlign:'center'}}>No data available </p>}
    </div>
  );
}

export default App;
