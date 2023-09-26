import { useState } from "react";
import classes from './FormCalculator.module.css';

const initialUserInput = {
  'current-savings':10000,
  'yearly-contribution':1200,
  'expected-return':7,
  duration:10,
}

const FormCalculator = (props) => {
  const [userInput, setUserInput] = useState(initialUserInput);

  /*const [currentSavings, setCurrentSavings] = useState("");
  const [yearlyContribution, setYearlyContribution] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");*/
  

  const submitForm = (event) => {
    event.preventDefault();
    let data = {
      currentSavings: userInput['current-savings'],
      yearlyContribution: userInput['yearly-contribution'],
      expectedReturn: userInput['expected-return'],
      duration: userInput['duration'],
    };
    props.onSubmitForm(data);
  };

  const resetForm = () => {
    setUserInput(initialUserInput);
    /*setCurrentSavings("");
    setYearlyContribution("");
    setExpectedReturn("");
    setDuration("");*/
  };

  const handleFormChange = (input,value) => {
    setUserInput((prev)=>{
      return {...prev,[input]:+value}
    })
    /*
    switch (input) {
      case "current-savings":        
        //setCurrentSavings(value);
        break;
      case "yearly-contribution":
        //setYearlyContribution(value);
        break;
      case "expected-return":
        //setExpectedReturn(value);
        break;
      case "duration":
        //setDuration(value);
        break;
    }*/
  };

  return (
    <form className={classes.form} onSubmit={submitForm}>
      <div className={classes['input-group']}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            onChange={(e) =>
              handleFormChange("current-savings", e.target.value)
            }
            value={userInput['current-savings']}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            onChange={(e) =>
                handleFormChange("yearly-contribution", e.target.value)
              }
            value={userInput['yearly-contribution']}
          />
        </p>
      </div>
      <div className={classes['input-group']}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            onChange={(e) =>
                handleFormChange("expected-return", e.target.value)
              }
            value={userInput['expected-return']}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            onChange={(e) =>
                handleFormChange("duration", e.target.value)
              }
            value={userInput['duration']}
          />
        </p>
      </div>
      <p className={classes.actions}>
        <button type="reset" className={classes.buttonAlt} onClick={resetForm}>
          Reset
        </button>
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default FormCalculator;
