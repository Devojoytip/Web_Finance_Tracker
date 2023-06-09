import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { InnerLayout } from '../styles/Layouts';
function Transactions() {
    const { transactionHistory } = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <TransactionStyled>
            <InnerLayout>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>Your Transaction History</h1>
                </div>

                {history.map((item) => {
                    const { _id, title, amount, category, date } = item
                    return (
                        <div className="transaction-con">
                            <div key={_id} className="transaction-item container">
                                <p style={{
                                    color: category === 'Expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {title.substring(0, 10)}
                                </p>

                                <p style={{
                                    color: category === 'Expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {new Date(date).toLocaleDateString()}
                                </p>

                                <p style={{
                                    color: category === 'Expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {
                                        category === 'Expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
                                    }
                                </p>
                            </div>
                        </div>
                    )
                })}
            </InnerLayout>
        </TransactionStyled>
    )
}

const TransactionStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .transaction-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .transaction-con{
        grid-column: 4 / -1;
        h2{
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salary-title{
            font-size: 1.2rem;
            span{
                font-size: 1.8rem;
            }
        }
        .salary-item{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-weight: 600;
                font-size: 1.6rem;
            }
        }

    }
    .container {
        display: grid;
        grid-template-columns: 0.5fr 0.5fr 0.3fr;
        gap: 10px; /* Adjust the gap value as needed */
      }

`;

export default Transactions