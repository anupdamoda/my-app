import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/expense')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <><style>{"table{border:1px solid black;}"}</style><div>
      <h1> Expenses List </h1>
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