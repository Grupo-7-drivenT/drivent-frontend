import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { getAllRooms } from '../services/roomApi';
import { useEffect } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { GetBookingRoom, createBooking, updateBooking } from '../services/BookingApi';
import HotelContext from '../contexts/HotelContext';
import UserContext from '../contexts/UserContext';

export default function OptionRoom({ choosedHotelId, hotels, changeHotel }) {
  const { changingHotel, setChangingHotel } = changeHotel;
  const { hotelData } = useContext(HotelContext);
  const { userData } = useContext(UserContext);
  const [typeRoom, setTypeRoom] = useState([]);
  const [choosedRoom, setChoosedRoom] = useState(null);
  const [haveBooking, setHaveBooking] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllRooms(userData.token, +choosedHotelId);
      setTypeRoom(response.Rooms);
      console.log(typeRoom);
    }
    fetchData();
  }, [choosedHotelId]);

  const changeBooking = async() => {
    for (let el of hotels) {
      for (let ely of el.Rooms) {
        const findBooking = ely.Booking?.find(fel => fel.userId === userData.user.id);
        if (findBooking) {
          await updateBooking(findBooking.id, +choosedRoom, userData.token);
          break;
        }
      }
    }
  };

  const fill = (value, total, clickedByMe) => {
    const emptyCount = total - value;
    const bsPerson = []; // 0 empty / 1 fill / 2 me
    for (let i = 0; i < emptyCount; i++) {
      bsPerson.push(0);
    }
    if (clickedByMe) bsPerson[emptyCount - 1] = 2;
    for (let i = 0; i < value; i++) {
      bsPerson.push(1);
    }
    const returned = bsPerson.map(el => {
      if (el === 0) return <BsPerson />;
      else if (el === 1) return <BsFillPersonFill />;
      else if (el === 2) return <BsFillPersonFill color='pink' />;
    });
    return returned;
  };
  
  const optionType = (value, total, clickedByMe) => {
    const emptyCount = total - value;
    console.log(emptyCount);
    if(emptyCount === 0) return 'disabled';
    else if (emptyCount > 0 && clickedByMe) return 'selected';
    else if (emptyCount > 0) return 'enabled';
  };

  async function createNewBooking() {
    await createBooking(choosedRoom, userData.token);
    return;
  }
  return (
    <Main>
      {choosedHotelId !== 0 &&
        <>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>
          <section>
            <Wrap>
              {typeRoom?.map((t, i) => <>
                <Option
                  key={i}
                  type={optionType(t.Booking.length, t.capacity, choosedRoom === t.id)}
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => setChoosedRoom(t.id)} >
                  <h1>{t.id}</h1>
                  <div>
                    {fill(t.Booking.length, t.capacity, choosedRoom === t.id)}
                  </div>
                </Option>
              </>)}
            </Wrap>
          </section>
          {
            (hotelData && changingHotel) ?
              <button onClick={changeBooking}>RESERVAR O QUARTO</button>
              : <button onClick={createNewBooking}>RESERVAR O QUARTO</button>
          }
        </>
      }
    </Main>
  );
};

const Option = styled.div`
width: 190px;
height: 45px;
border-radius: 5px;
border: 1px solid #CECECE;
display: flex;
justify-content: space-around;
align-items: center;
margin: 0 17px 8px 0;
background-color: ${ props => {
    if (props.type === 'selected') return '#FFEED2';
    else if (props.type === 'disabled') return '#CECECE';
    else if (props.type === 'enabled') return '#FFFFFF';
  } 
};
`;

const OptionDisable = styled.button`
width: 190px;
height: 45px;
border-radius: 5px;
border: 1px solid #CECECE;
display: flex;
justify-content: space-around;
align-items: center;
margin: 0 17px 8px 0;
background-color: #CECECE;
  color: #8C8C8C;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;
const Main = styled.main`
margin-top: 52px;
width: 811px;
height: 260px;
h2{
  margin-bottom: 25px;
  color: #8E8E8E;
}
button{
  width: 182px;
  height: 37px;
  left: 350px;
  top: 687px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
}
`;

const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: auto;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 20px;
`;
