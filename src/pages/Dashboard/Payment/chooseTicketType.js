import { ButtomWrapper, SquareButtom, Wrapper } from './payment_styled';
import { useContext, useEffect, useState } from 'react';
import { getAllTicketTypes } from '../../../services/ticketTypeApi';

import Button from '../../../components/Form/Button';

import UserContext from '../../../contexts/UserContext';

export default function ChooseTicketType({ setStep }) {
  const [modalities, setModalities] = useState();
  const [button1Clicked, setButton1Clicked] = useState(-1);
  const [button2Clicked, setButton2Clicked] = useState(-1);
  const [isRemote, setIsRemote] = useState(false);
  const [ticketPrice, setTicketPrice] = useState({
    ticketTypePrice: 0,
    accommodationPrice: 0,
  });

  const userInfos = useContext(UserContext);

  function handleButton1Click(event) {
    event.stopPropagation();
    setButton1Clicked(Number(event.target.dataset.key));
    const updatePrice = Number(event.target.dataset.price);
    setTicketPrice({ ...ticketPrice, ticketTypePrice: updatePrice });
    if(event.target.dataset.isremote === 'true') setIsRemote(Boolean(event.target.dataset.isremote));
    else setIsRemote(Boolean(false));
  }

  function handleButton2Click(event) {
    event.stopPropagation();
    setButton2Clicked(Number(event.target.dataset.key));
    const updatePrice = Number(event.target.dataset.price);
    setTicketPrice({ ...ticketPrice, accommodationPrice: updatePrice });
  }

  useEffect(async() => {
    try {
      const tickets = await getAllTicketTypes(userInfos.userData.token);
      setModalities(tickets);
    } catch (err) { } 
  }, []);

  return (
    <>
      <Wrapper>
        <h1>Primeiro, escolha sua modalidade de ingresso</h1>
        <ButtomWrapper>
          {
            modalities?
              modalities.map( (ev, i) => {
                return (
                  <SquareButtom
                    key={i}
                    data-key={i}
                    data-price={ev.price}
                    data-isremote={ev.isRemote}
                    data-includeshotel={ev.includesHotel}
                    onClick={handleButton1Click}
                    style={{ backgroundColor: i === button1Clicked ? '#ffeed2' : 'white' }}
                  >
                    {ev.name}
                    <br />
                    <span>R$ {ev.price / 100}</span>
                  </SquareButtom>
                );
              })
              :'Procurando...'
          }
        </ButtomWrapper>
      </Wrapper>

      {
        !isRemote &&
          <Wrapper>
            <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
            <ButtomWrapper>
              <SquareButtom
                data-key={1}
                data-price={0}
                onClick={handleButton2Click}
                style={{ backgroundColor: 1 === button2Clicked ? '#ffeed2' : 'white' }}
              >
                Sem Hotel
                <br />
                <span>+ R$ 0</span>
              </SquareButtom>

              <SquareButtom
                data-key={2}
                data-price={35000}
                onClick={handleButton2Click}
                style={{ backgroundColor: 2 === button2Clicked ? '#ffeed2' : 'white' }}
              >
                Com Hotel
                <br />
                <span>+ R$ 350</span>
              </SquareButtom>
                  
            </ButtomWrapper>
          </Wrapper>
      }
      {
        ((button1Clicked !== -1 && isRemote === true) || (button1Clicked !== -1 && button2Clicked !== -1 && isRemote === false)) &&
        <ReserveTicket 
          ticketPrice={ticketPrice}
          setStep={setStep}
        />
      }
    </>
  );
}

function ReserveTicket({ ticketPrice, setStep }) {
  const nextStep = (step) => {
    setStep(step);
  };

  return (
    <>
      <span>Fechado! O total ficou em R$ {(ticketPrice.ticketTypePrice + ticketPrice.accommodationPrice)/100}. Agora é só confirmar:</span>
      <Button onClick={() => nextStep(2)}>RESERVAR INGRESSO</Button>
    </>
  );
}
