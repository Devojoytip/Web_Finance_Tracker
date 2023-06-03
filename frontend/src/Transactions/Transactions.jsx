import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function Transactions() {
    const { transactionHistory } = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <TransactionStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, category } = item
                return (
                    <div key={_id} className="transaction-item">
                        <p style={{
                            color: category === 'Expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: category === 'Expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                category === 'Expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
                            }
                        </p>
                    </div>
                )
            })}
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
    }
`;

export default Transactions