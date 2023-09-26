import {useState} from 'react';
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [viewControls, setViewControls] = useState(false);

  const expenseAddHandler = (expense) => {
    let expenseData = {
      ...expense,
      id: Math.random().toString(),
    };
    props.onNewExpense(expenseData);
  };

  const toggleControls = () => {
    setViewControls((prev)=>{
      return !prev
    });
  };

  return (
    <div className="new-expense">
      {viewControls && <ExpenseForm onAddExpense={expenseAddHandler} onCancelEdit={toggleControls}/>}
      {!viewControls && <button type="button" onClick={toggleControls}>
        Add New Expense
      </button>}
    </div>
  );
};

export default NewExpense;
