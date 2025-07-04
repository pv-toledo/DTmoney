import styled from "styled-components";

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 4rem 1.5rem 0; //Em cima, laterais e abaixo
`

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem; //Laterais e vertical
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background-color: ${props => props.theme["gray-700"]};

        &:first-child { //Primeira td dentro de cada tr
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child { //Última td dentro de cada tr
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }

    }
`

interface PriceHighlightProps {
    variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${props => props.variant === 'income' ? props.theme["green-300"] : props.theme["red-300"]};
`