import useTicketType from '../../../hooks/api/useTicketType';
import useToken from '../../../hooks/useToken';
import { createTicket } from '../../../services/ticketApi';
import { getAllTicketTypes } from '../../../services/ticketTypeApi';
import { ButtomWrapper, ReserveTicketButtom, SquareButtom, Wrapper, FinishButtomWrapper } from './payment_styled';
import { useState } from 'react';

export default function ChooseTicketType() {
  const token = useToken();
  const allTicketTypes = useTicketType();
  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [finishButtonClicked, setFinishButtonClicked] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [showHotelOptions, setShowHotelOptions] = useState(false);
  const [hotelOptionSelected, setHotelOptionSelected] = useState('');

  function handleButton1Click() {
    setButton1Clicked(true);
    setTicketPrice(250);
    setShowHotelOptions(true);
    setButton2Clicked(false);
    setFinishButtonClicked(false);
    setHotelOptionSelected('');
  }

  function handleButton2Click() {
    setButton1Clicked(false);
    setButton2Clicked(true);
    setTicketPrice(100);
    setShowHotelOptions(false);
    setHotelOptionSelected('');
    setFinishButtonClicked(true);
  }

  function handleHotelOptionClick(option) {
    setHotelOptionSelected(option);
    if (option === 'com-hotel') {
      setTicketPrice(600);
    } else setTicketPrice(250);

    setFinishButtonClicked(true);
  }

  function hadleFinishButtomClick() {
    let ticketTypeId;

    if (ticketPrice === 100) ticketTypeId = allTicketTypes.event[0].id;
    if (ticketPrice === 250) ticketTypeId = allTicketTypes.event[1].id;
    if (ticketPrice === 600) ticketTypeId = allTicketTypes.event[2].id;

    createTicket({ ticketTypeId }, token);

    alert('Tiquete reservado!');
  }

  return (
    <Wrapper>
      <h1>Primeiro, escolha sua modalidade de ingresso</h1>
      <ButtomWrapper>
        <SquareButtom onClick={handleButton1Click} style={{ backgroundColor: button1Clicked ? '#ffeed2' : 'white' }}>
          Presencial
          <br />
          <span>R$250</span>
        </SquareButtom>
        <SquareButtom onClick={handleButton2Click} style={{ backgroundColor: button2Clicked ? '#ffeed2' : 'white' }}>
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
              <span>+ R$600</span>
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
      {finishButtonClicked && (
        <FinishButtomWrapper onClick={hadleFinishButtomClick}>
          <h1>
            Fechado! O total ficou em <span>R${ticketPrice}</span>. Agora é só confirmar:
          </h1>
          <br />
          <ReserveTicketButtom>RESERVAR INGRESSO</ReserveTicketButtom>
        </FinishButtomWrapper>
      )}
    </Wrapper>
  );
}
