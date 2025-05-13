import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionContext";
import { useContextSelector } from "use-context-selector";


const searchFormSchema = z.object({
    query: z.string(),
})

type searchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const {register, handleSubmit, formState: {isSubmitting}} = useForm<searchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions (data: searchFormInputs) {
        await fetchTransactions(data.query) 
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')}
            />
            {/* isSubmitting retorna true enquanto o formulário estiver sendo submetido, desligando o botão */}
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}
