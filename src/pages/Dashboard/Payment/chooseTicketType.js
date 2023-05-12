import { ButtomWrapper, SquareButtom, Wrapper } from './payment_styled';
import { useState } from 'react';

export default function ChooseTicketType() {
  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function handleButton1Click() {
    setButton1Clicked(true);
    setTicketPrice(250);
    setButtonsDisabled(true);
  }

  function handleButton2Click() {
    setButton2Clicked(true);
    setTicketPrice(100);
    setButtonsDisabled(true);
  }

  console.log(ticketPrice);

  return (
    <Wrapper>
      <h1>Primeiro, escolha sua modalidade de ingresso</h1>
      <ButtomWrapper>
        <SquareButtom
          onClick={handleButton1Click}
          disabled={buttonsDisabled}
          style={{ backgroundColor: button1Clicked ? '#ffeed2' : 'white' }}
        >
          Presencial
          <br />
          <span>R$250</span>
        </SquareButtom>
        <SquareButtom
          onClick={handleButton2Click}
          disabled={buttonsDisabled}
          style={{ backgroundColor: button2Clicked ? '#ffeed2' : 'white' }}
        >
          Remoto
          <br />
          <span>R$100</span>
        </SquareButtom>
      </ButtomWrapper>
    </Wrapper>
  );
}
