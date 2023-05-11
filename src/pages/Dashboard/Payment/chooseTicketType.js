import { ButtomWrapper, SquareButtom, Wrapper } from './payment_styled';

export default function ChooseTicketType() {
  return (
    <Wrapper>
      <h1>Primeiro, escolha sua modalidade de ingresso</h1>
      <ButtomWrapper>
        <SquareButtom onClick={() => alert('oi')}>
          Presencial
          <br />
          <span>R$250,00</span>
        </SquareButtom>
        <SquareButtom onClick={() => alert('olá')}>
          Remoto
          <br />
          <span>R$100,00</span>
        </SquareButtom>
      </ButtomWrapper>
    </Wrapper>
  );
}
