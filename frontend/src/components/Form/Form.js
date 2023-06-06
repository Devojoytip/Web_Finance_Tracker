import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function Form() {
    const { addIncome, getIncomes, error, setError, currIncome, setCurrIncome, updateIncome } = useGlobalContext()

    useEffect(() => {
        const func = () => {
            currIncome && setInputState(currIncome)
        }

        func()
    }, [currIncome])

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: 'Income',
        description: '',
        type: ''
    })

    const { title, amount, date, category, description, type } = inputState;

    const { curr_id, curr_title, curr_amount, curr_date, curr_category, curr_description, curr_type } = currIncome;

    const handleInput = name => e => {
            setInputState({ ...inputState, [name]: e.target.value })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (currIncome) {
            await updateIncome(currIncome)
            setCurrIncome({
                curr_title: '',
                curr_amount: '',
                curr_date: '',
                curr_category: '',
                curr_description: '',
                curr_type: ''
            })
        }
        else {
            await addIncome(inputState)
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: 'Income',
                description: '',
                type: ''
            })
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title || curr_title}
                    name={'title'}
                    placeholder="Salary Title"
                    onChange={handleInput("title")}
                />
            </div>
            <div className="input-control">
                <input value={amount || curr_amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Salary Amount'}
                    onChange={handleInput("amount")}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date || curr_date}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleInput("date")}
                />
            </div>
            <div className="selects input-control">
                <select required value={type || curr_type} name="type" id="type" onChange={handleInput("type")}>
                    <option value="" disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description || curr_description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput("description")}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={currIncome ? 'Update Income' : 'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select, button{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        position: relative;
        left: 1%;
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        select{
            width: 100%;
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default Form