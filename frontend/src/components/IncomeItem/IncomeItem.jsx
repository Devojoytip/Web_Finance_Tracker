import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, edit, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, rupee } from '../../utils/Icons';
import Button from '../Button/Button';
import { useGlobalContext } from '../../context/globalContext';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () => {
        switch (type) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (type) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    console.log('type', type)

    const ref = useRef(null)
    const refClose = useRef(null)

    const { currIncome, setCurrIncome, getCurrIncome } = useGlobalContext()

    const updateItem = async (id) => {
        const res = await getCurrIncome(id);
        console.log('curr income(res) ',res)
        // await deleteItem(id);
        setCurrIncome(res)
    }

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const handleClick = (e) => {
        console.log('Updating note')
        // editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>

            <div className="icon">
                {category === 'Expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{rupee} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        {/* <p>
                            {comment}
                            {description}
                        </p> */}
                    </div>
                    <div className="btn-con" style={
                        {
                            display: "flex",
                            alignItems: 'center',
                            gap: '1rem'
                        }} >
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                        <Button
                            icon={edit}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => updateItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 60px;
        height: 60px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
            width: 60px;
            height: 50px;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem