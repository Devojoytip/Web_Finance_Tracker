import React from 'react'
import styled from 'styled-components'

function InfoModal({
    description,
    type
}) {

    return (
        <FormStyled>
            Type : <p>{type}</p>
            <br />
            Description: <p>{description}</p>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    position: relative;
    width: 100%;
    left: 0%;
    gap: 2rem;
    font-family: inherit;
    font-size: inherit;
    p{
        font-weight: bold;
        display: inline;
    }
`;
export default InfoModal