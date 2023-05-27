import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import { getBooking, updateBooking } from '../services/BookingApi';
import { getAllRooms } from '../services/roomApi';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';

export default function ResumeArea() {
  const token = useToken();
  const [allRooms, setAllRooms] = useState([]);
  const [myBooking, setMyBooking] = useState({});
  const [roomsAreaOn, setRoomsAreaOn] = useState('none');
  const [hotelCardOff, setHotelCardOff] = useState('block');
  const [choosedRoom, setChoosedRoom] = useState(null);

  useEffect(async() => {
    const booking = await getBooking(token);
    setMyBooking(booking || null);
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      if (myBooking && myBooking.Room) {
        const response = await getAllRooms(token, myBooking.Room.Hotel.id);
        setAllRooms(response.Rooms || []);
      }
    }
    fetchData();
  }, [token, myBooking]);

  function openRooms() {
    if (roomsAreaOn === 'none') {
      setRoomsAreaOn('block');
    } else {
      setRoomsAreaOn('none');
    }

    if (hotelCardOff === 'none') {
      setHotelCardOff('block');
    } else {
      setHotelCardOff('none');
    }
  }

  async function updateMyBooking() {
    if (myBooking.Room) {
      await updateBooking(myBooking.id, choosedRoom, token);
      window.location.reload(false);
    }
  }

  function getAccommodationType() {
    if (myBooking.Room) {
      const { capacity } = myBooking.Room;
      if (capacity === 1) return 'Single';
      if (capacity === 2) return 'Double';
      if (capacity === 3) return 'Triple';
    }
    return '';
  }

  function getNumPersonsInRoom() {
    if (myBooking.Room) {
      const { capacity } = myBooking.Room;
      if (capacity === 1) return 'Só Você';
      if (capacity === 2) return 'Você e mais um';
      if (capacity === 3) return 'Você e mais dois';
    }
    return '';
  }

  return (
    <>
      <Title>Você já escolheu seu quarto:</Title>
      <HotelCard key={myBooking.Room ? myBooking.Room.Hotel.id : ''}>
        <img src={myBooking.Room ? myBooking.Room.Hotel.image : ''} alt="" />
        <h1>{myBooking.Room ? myBooking.Room.Hotel.name : ''}</h1>
        <h2>
          <span>Tipos de acomodação:</span>
          <br />
          {myBooking.Room ? myBooking.Room.name : ''} ({getAccommodationType()})
        </h2>
        <h2>
          <span>Pessoas no meu quarto</span>
          <br />
          {getNumPersonsInRoom()}
        </h2>
      </HotelCard>
      <ChangeRoomButton onClick={openRooms}>TROCAR DE QUARTO</ChangeRoomButton>
      <Wrap style={{ display: roomsAreaOn }}>
        {allRooms.map((t) => (
          <Option
            key={t.id}
            style={{
              backgroundColor:
                t.capacity === t.Booking.length ? '#E9E9E9' : choosedRoom === t.id ? '#FFEED2' : '#FFFFFF',
              cursor: 'pointer',
            }}
            onClick={() => setChoosedRoom(t.id)}
            disabled={t.capacity === t.Booking.length}
          >
            <h1>{t.name}</h1>
            <div>
              {[...Array(t.capacity)].map((_, index) => {
                const booking = t.Booking && t.Booking[index];
                const isChosen = choosedRoom === t.id && index === t.capacity - 1;
                return booking ? (
                  <BsFillPersonFill key={index} color="black" />
                ) : isChosen ? (
                  <BsFillPersonFill key={index} color="pink" />
                ) : (
                  <BsPerson key={index} />
                );
              })}
            </div>
          </Option>
        ))}
        <ChangeRoomButton onClick={updateMyBooking}>RESERVAR NOVO QUARTO</ChangeRoomButton>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  margin-top: 38px;
  width: auto;
  height: auto;
  display: none;
`;

const Option = styled.button`
  width: 190px;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #cecece;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 17px 8px 0;
  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ChangeRoomButton = styled.button`
  width: auto;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin-top: 38px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
`;

const HotelCard = styled.div`
  width: 196px;
  height: 264px;
  background-color: #ffeed2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-top: 14px;
  color: #3c3c3c;
  img {
    width: 168px;
    height: 109px;
    margin-top: 16px;
    margin-left: 16px;
    border-radius: 5px;
  }
  h1 {
    margin-left: 16px;
    font-size: 20px;
    line-height: 23px;
    font-style: normal;
    font-weight: 400;
  }
  h2 {
    font-size: 12px;
    line-height: 15px;
    font-style: normal;
    font-weight: 400;
    margin-left: 16px;
    margin-top: 10px;
  }
  span {
    font-weight: 700;
  }
`;
