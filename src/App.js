import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuid} from 'uuid';

// const InitialExpenses = [
//   {id:uuid(), charge:"Rent", amount:1600},
//   {id:uuid(), charge:"Car Payment", amount:400},
//   {id:uuid(), charge:"Credit Card Bill", amount:1200}
// ];


const InitialExpenses = localStorage.getItem('expenses') ? 
                        JSON.parse(localStorage.getItem('expenses')): []



function App() {
// ***********State Values*************
//all expenses,  add expenses
  const [expenses, setExpenses] = useState(InitialExpenses);
  
// single expense  
  //for input of charge
const [charge, setCharge ] = useState('');



// single expense  
   //for input of amount
const [amount, setAmount ] = useState('');


// alert
  const [alert, setAlert] = useState({show:false});


//edit
  const[edit, setEdit] = useState(false)





//edit item
  const [id, setId] = useState(0)


// UseEffect

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses))
},[expenses])
//useEffect runs after every render (change of any component)
//so to stop this, we pass the second parameter to let react
//know , to call useEffect only when the expenses get change





//************functionality*************


const handleCharge = e => {
  setCharge(e.target.value);
}


const handleAmount = e => {
  setAmount(e.target.value);
}

const handleSubmit = e => {
  e.preventDefault();

const handleAlert = ({type, text}) => {
  setAlert({show:true, type, text});
  setTimeout(() => {
    setAlert({show:false})
  }, 3000 );
}


  if(charge !== "" && amount > 0){

    if(edit){
      let tempExpenses = expenses.map( item => {
        return item.id === id ? {...item, charge, amount} : item
      });
      setExpenses(tempExpenses);
      setEdit(false);
    }else{
      const singleExpense = {id:uuid(), charge, amount};
      setExpenses([...expenses , singleExpense]);
    }
    setCharge("");
    setAmount("");
    //to clear out field

    handleAlert({type:"success", text:"Item Added"});
  }else{
    handleAlert({type:'danger', text:'Charge cant be empty value and the value has to be bigger than zero '});
  }
}



// clear all items

const clearItems = () => {
  setExpenses([]);
}

//delete single aitem

const handleDelete = (id) => {
  let tempExpenses = expenses.filter(item => item.id !== id);
  setExpenses(tempExpenses);
}

//edit single aitem

const handleEdit = (id) => {
  console.log(`Item edited with id: ${id}`)

  let expense = expenses.find(item => item.id === id)
  let {charge, amount} = expense
  setCharge(charge)
  setAmount(amount)
  setEdit(true);
  setId(id)


}











  return (
    <>
    {alert.show && <Alert type={alert.type} 
      text={alert.text} />}
    <Alert/>
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpenseForm charge={charge}
                   amount={amount}
                   handleAmount={handleAmount}
                   handleCharge={handleCharge}
                   handleSubmit={handleSubmit}
                   edit={edit}/>
      <ExpenseList expenses={expenses} 
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  clearItems={clearItems}
        />
      <h1>
        Total Spending : <span className="total">
          ${expenses.reduce( (acc, curr) => {
            return (acc += parseInt(curr.amount));
          },0 )}
        </span>
      </h1>
    </main>

    </>
  );
}

export default App;
