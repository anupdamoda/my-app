import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/expense')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  useEffect(() => {
    const fetchValue = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/expense/count'); // Replace with your actual API endpoint
          setValue(response.data); // Set the fetched value to the state
          setLoading(false); // Data has been loaded
      } catch (err) {
          setError('Error fetching data'); // Set an error message
          setLoading(false);
      }
    };
    fetchValue();
  }, []);
  

  return (
    <><style>{"table{border:1px solid black;}"}</style><div>
      <h1> Expenses List </h1>
      <div> AmountSum</div>
      <div> Count : {value} </div>
      <table>
        <thead>
          <tr> 
            <th> Expense Category </th>
            <th> Expense Name </th>
            <th> Amount </th>
            <th> Date </th>
          </tr>
        </thead>
        <tbody>
          <tr> <></> <style>{"table{border:1px solid black;}"}</style>
            <td>
              {data.map(item => (
                <p key={item.id}>{item.expenseCategory}</p>
              ))}</td>
            <td>
              {data.map(item => (
                <p key={item.id}>{item.expenseName}</p>
              ))} </td>
            <td>
              {data.map(item => (
                <p key={item.id}> {item.expenseAmount}$</p>
              ))}   </td>
            <td>
              {data.map(item => (
                <p key={item.id}> {item.date}</p>
              ))}</td> </tr>
        </tbody>

      </table>
    </div></>
  );
}
export default App;