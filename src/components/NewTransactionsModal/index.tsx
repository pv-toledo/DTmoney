import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

    const { createTransaction } = useContext(TransactionsContext)

    const { register, handleSubmit, formState: { isSubmitting }, control, reset } = useForm<NewTransactionFormInput>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInput) {
        const { description, price, category, type } = data;

        await createTransaction({
            description,
            price,
            category,
            type
        })




        reset()
    }

    return (
        <Dialog.Portal> {/*Para inserir um componente "por cima" do Header*/}
            <Overlay /> {/*Fundo com a opacidade mais baixa*/}

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')}
                    />

                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        Entrada
                                        <ArrowCircleUp size={24} />
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        Saída
                                        <ArrowCircleDown size={24} />
                                    </TransactionTypeButton>

                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>


            </Content>
        </Dialog.Portal>
    )
}