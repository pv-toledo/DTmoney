import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function NewTransactionModal() {
    return (
        <Dialog.Portal> {/*Para inserir um componente "por cima" do Header*/}
            <Overlay /> {/*Fundo com a opacidade mais baixa*/}

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form action="">
                    <input type="text" placeholder="Descrição" required />
                    <input type="number" placeholder="Preço" required />
                    <input type="text" placeholder="Categoria" required />

                    <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                            Entrada
                            <ArrowCircleUp size={24} />
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="outcome" value="outcome">
                            Saída
                            <ArrowCircleDown size={24} />
                        </TransactionTypeButton>

                    </TransactionType>

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>


            </Content>
        </Dialog.Portal>
    )
}