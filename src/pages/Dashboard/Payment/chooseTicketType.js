import { ButtomWrapper, SquareButtom, Wrapper } from './payment_styled';
import { useState } from 'react';

export default function ChooseTicketType() {
  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showHotelOptions, setShowHotelOptions] = useState(false);
  const [hotelOptionSelected, setHotelOptionSelected] = useState('');

  function handleButton1Click() {
    setButton1Clicked(true);
    setTicketPrice(250);
    setButtonsDisabled(true);
    setShowHotelOptions(true);
  }

  function handleButton2Click() {
    setButton1Clicked(false);
    setButton2Clicked(true);
    setTicketPrice(100);
    setButtonsDisabled(true);
    setShowHotelOptions(false);
    setHotelOptionSelected('');
  }

  function handleHotelOptionClick(option) {
    setHotelOptionSelected(option);
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

      {button1Clicked && showHotelOptions && (
        <div>
          <h1>Ótimo! Agora escolha sua modalidade de hospedagem:</h1>
          <ButtomWrapper>
            <SquareButtom
              onClick={() => handleHotelOptionClick('com-hotel')}
              style={{ backgroundColor: hotelOptionSelected === 'com-hotel' ? '#ffeed2' : 'white' }}
            >
              Com Hotel
              <br />
              <span>+ R$ 350</span>
            </SquareButtom>
            <SquareButtom
              onClick={() => handleHotelOptionClick('sem-hotel')}
              style={{ backgroundColor: hotelOptionSelected === 'sem-hotel' ? '#ffeed2' : 'white' }}
            >
              Sem Hotel
              <br />
              <span>+ R$ 0</span>
            </SquareButtom>
          </ButtomWrapper>
        </div>
      )}
    </Wrapper>
  );
}

