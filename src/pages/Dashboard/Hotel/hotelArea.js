import styled from 'styled-components';
import { getHotels, getHotelsWithRooms } from '../../../services/hotelApi';
import { useContext, useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import OptionRoom from '../../../components/OptionRoom';
import HotelContext from '../../../contexts/HotelContext';
import UserContext from '../../../contexts/UserContext';
import { getAllRooms } from '../../../services/roomApi';
export default function HotelArea() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [choosedHotelId, setChoosedHotelId] = useState(null);
  const [changingHotel, setChangingHotel] = useState(false);
  const { hotelData, setHotelData } = useContext(HotelContext);
  const { userData } = useContext(UserContext);

  useEffect(async() => {
    const allHotels = await getHotels(token);
    setHotels(allHotels);
    const hotels = [];
    for (let el of allHotels) {
      const room = await getAllRooms(token, el.id);
      hotels.push(room);
    }
    setHotels(hotels);
  }, [token]);

  useEffect(() => {
    for (let el of hotels) {
      for (let ely of el.Rooms) {
        const findBooking = ely.Booking?.find(fel => fel.userId === userData.user.id);
        if (findBooking) {
          setHotelData(el);
          break;
        }
      }
    }
  }, [hotels]);

  const backRoom = () => {
    setHotelData(null);
    setChangingHotel(true);
  };

  async function getAccommodation(hotelId) {
    let allBookings = 0;
    let allCapacity = 0;

    const hotelById = await getHotelsWithRooms(token, hotelId);

    hotelById.Rooms.map((el) => {
      allCapacity = allCapacity + el.capacity;
      allBookings = allBookings + el.Booking.length;
    });

    return String(allCapacity - allBookings);
  }

  useEffect(() => {
    async function fetchAccommodation() {
      const accommodationPromises = hotels.map((el) => getAccommodation(el.id));
      const accommodationValues = await Promise.all(accommodationPromises);

      setHotels((prevHotels) =>
        prevHotels.map((hotel, index) => ({
          ...hotel,
          accommodation: accommodationValues[index],
        }))
      );
    }

    fetchAccommodation();
  }, [choosedHotelId]);

  return (
    <>
      <HotelsWrapper>
        {(hotelData && !changingHotel) ?
          <HotelCard
            style={{
              backgroundColor: '#FFEED2',
              cursor: 'pointer'
            }}
          >
            <img src={hotelData.image} />
            <h1>{hotelData.name}</h1>
            <h2>
              <span>Tipos de acomodação:</span>
              <br />
              {hotelData.roomNamesString}
            </h2>
            <h2>
              <span>Vagas disponíveis:</span>
              <br />
              {hotelData.accommodation}
            </h2>
          </HotelCard>
          : hotels.map((el, i) => {
            const roomNames = el.Rooms.map((room) => room.name);
            let roomNamesString = '';

            if (roomNames.length === 2) {
              roomNamesString = roomNames.join(' e ');
            } else if (roomNames.length >= 3) {
              const lastRoomName = roomNames.pop();
              roomNamesString = `${roomNames.join(', ')} e ${lastRoomName}`;
            }

            return (
              <HotelCard
                key={i}
                style={{
                  backgroundColor: choosedHotelId === el.id ? '#FFEED2' : '#EBEBEB',
                  cursor: 'pointer'
                }}
                onClick={() => setChoosedHotelId(el.id)}
              >
                <img src={el.image} />
                <h1>{el.name}</h1>
                <h2>
                  <span>Tipos de acomodação:</span>
                  <br />
                  {roomNamesString}
                </h2>
                <h2>
                  <span>Vagas disponíveis:</span>
                  <br />
                  {el.accommodation}
                </h2>
              </HotelCard>
            );
          })}
      </HotelsWrapper>
      {(hotelData && !changingHotel) ?
        <Buttone onClick={backRoom}>TROCAR DE QUARTO</Buttone>
        : ''}
      <OptionRoom choosedHotelId={+choosedHotelId} hotels={hotels} changeHotel={{ changingHotel, setChangingHotel }} />
    </>
  );
}

const Buttone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
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
`;
const HotelsWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 18px;
`;

const HotelCard = styled.div`
  width: 196px;
  height: 264px;
  background-color: #ebebeb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
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
    line-height: 14px;
    font-style: normal;
    font-weight: 400;
    margin-left: 16px;
    margin-top: 10px;
  }
  span {
    font-weight: 700;
  }
`;
