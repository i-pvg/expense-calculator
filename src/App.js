import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuid} from 'uuid';

const InitialExpenses = [
  {id:uuid(), charge:"rent", amount:1600},
  {id:uuid(), charge:"car payment", amount:400},
  {id:uuid(), charge:"credit card bill", amount:1200}
];
function App() {

  const [expenses, setExpenses] = useState(InitialExpenses);
    console.log(expenses, setExpenses);

  return (
    <>
    <Alert/>
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpenseForm/>
      <ExpenseList expenses={expenses}/>
      <h1>
        Total Spending : <span className="total">
          ${expenses.reduce( (acc, curr) => {
            return (acc += curr.amount);
          },0 )}
        </span>
      </h1>
    </main>

    </>
  );
}

export default App;
