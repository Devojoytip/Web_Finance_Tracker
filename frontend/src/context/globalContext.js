import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([])
    const [currIncome, setCurrIncome] = useState({
        curr_id: "",
        curr_title: "",
        curr_amount: "",
        curr_type: "",
        curr_date: "",
        curr_category: "",
        curr_description: ""
    })
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // Incomes
    // Copilot command - create add income function
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    // Copilot command - create function to get incomes
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    // Copilot command - create function to get current income
    const getCurrIncome = async (id) => {
        const response = await axios.get(`${BASE_URL}get-income/${id}`)
        let income = response.data
        let curr_income;
        curr_income = {
            curr_id: income._id,
            curr_title: income.title,
            curr_amount: income.amount,
            curr_type: income.type,
            curr_date: new Date(income.date.substring(0, 10)),
            curr_category: income.category,
            curr_description: income.description
    };
        // let curr_date = curr_income.date;
        // const parts = curr_date.split("-");
        // const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        // curr_income = { ...curr_income, date: formattedDate };
        // setCurrIncome(curr_income)
        console.log('curr income', curr_income)

        return curr_income
    }

    // Copilot command - create function to delete income
    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    // Copilot command - create function to get edit income
    const updateIncome = async (income) => {
        const res = await axios.post(`${BASE_URL}update-income`, income)
        getIncomes()
    }

    // Copilot command - create function to get total income
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    // Expenses

    // Copilot command - create add expense function
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    // Copilot command - create function to get expenses
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    // Copilot command - create function to delete expense
    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    // Copilot command - create function to get total expenses
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    // Copilot command - create function to get total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    // Copilot command - create function to get transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history
    }

    return (
        <GlobalContext.Provider value=
            {{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                currIncome,
                updateIncome,
                setCurrIncome,
                getCurrIncome,
                transactionHistory,
                error,
                setError
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}