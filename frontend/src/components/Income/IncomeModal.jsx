import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { update } from '../../utils/Icons';

function IncomeModal({
    id,
    title,
    amount,
    date,
    category,
    description,
    type,
    setShowModal
}) {
    const { error, updateIncome } = useGlobalContext()

    const [newState, setNewState] = useState({
        new_id: id,
        new_title: title,
        new_amount: amount,
        new_date: new Date(date),
        new_category: category,
        new_description: description,
        new_type: type
    })

    const { new_id, new_title, new_amount, new_date, new_category, new_description, new_type } = newState;

    const handleInput = name => e => {
        setNewState({ ...newState, [name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateIncome(newState)
        setShowModal(false)
        setNewState({
            new_id: id,
            new_title: '',
            new_amount: '',
            new_date: new Date(),
            new_category: 'Income',
            new_description: '',
            new_type: ''
        })
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={new_title}
                    name={'title'}
                    placeholder="Salary Title"
                    onChange={handleInput("new_title")}
                />
            </div>
            <div className="input-control">
                <input value={new_amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Salary Amount'}
                    onChange={handleInput("new_amount")}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={new_date}
                    dateFormat="yyyy-MM-dd"
                    onChange={(updated_date) => {
                        setNewState({...newState, new_date: updated_date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={new_type} name="type" id="type" onChange={handleInput("new_type")}>
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
                <textarea name="description" value={new_description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput("new_description")}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Update Income'}
                    icon={update}
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
    position: relative;
    width: 100%;
    left: 0%;
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
export default IncomeModal