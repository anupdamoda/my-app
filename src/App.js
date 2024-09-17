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
    <>
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
          gap: 10px;
          border: 1px solid black;
        }
        .grid-item-header {
          font-weight: bold;
          border-bottom: 1px solid black;
        }
        .grid-item {
          border-bottom: 1px solid #ddd;
          padding: 8px;
        }
      `}</style>
      <div>
        <h1> Expenses List </h1>
        <div> Amount Sum :</div>
        <div> Count : {value} </div>
        <div className="grid-container">
          {/* Grid Headers */}
          <div className="grid-item-header">Expense Category</div>
          <div className="grid-item-header">Expense Name</div>
          <div className="grid-item-header">Amount</div>
          <div className="grid-item-header">Date</div>
  
          {/* Grid Data */}
          {data.map(item => (
            <>
              <div className="grid-item">{item.expenseCategory}</div>
              <div className="grid-item">{item.expenseName}</div>
              <div className="grid-item">{item.expenseAmount}$</div>
              <div className="grid-item">
                {(() => {
                  const date = new Date(item.date);
                  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                  return formattedDate;
                })()}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
  
}
export default App;