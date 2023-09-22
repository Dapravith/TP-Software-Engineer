import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseManagement = () => {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Fetch the expenses for the branch owner
        axios.get(`${process.env.REACT_APP_BACKEND}/branch-owner/expenses`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            setExpenses(response.data);
        }).catch(error => {
            console.error("Error fetching expenses:", error);
        });
    }, []);

    const handleAddExpense = () => {
        // Logic to add a new expense
        const newExpense = {
            amount,
            description,
            date
        };
        axios.post(`${process.env.REACT_APP_BACKEND}/branch-owner/add-expense`, newExpense, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            setExpenses([...expenses, response.data]);
            setAmount('');
            setDescription('');
            setDate('');
        }).catch(error => {
            console.error("Error adding expense:", error);
        });
    };

    return (
        <div className="expense-management">
            <h2>Expense Management</h2>
            <div className="add-expense">
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                />
                <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                />
                <button onClick={handleAddExpense}>Add Expense</button>
            </div>
            <div className="expenses-list">
                {expenses.map(expense => (
                    <div key={expense._id} className="expense-item">
                        <span>{expense.date}</span>
                        <span>{expense.description}</span>
                        <span>${expense.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpenseManagement;
