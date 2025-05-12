import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from '../../assets/logo.svg'
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionsModal";

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />

                <Dialog.Root> {/*Fica por volta de todo o contexto do modal */}

                    {/*asChild aproveita o botão dentro dele como trigger do modal*/}
                    <Dialog.Trigger asChild> 
                        <NewTransactionButton>Nova transação</NewTransactionButton>
    
                    </Dialog.Trigger>

                    <NewTransactionModal />

                </Dialog.Root>
            </HeaderContent>

        </HeaderContainer>
    )
}