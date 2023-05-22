import styled from 'styled-components';
import { getHotels, getHotelsWithRooms } from '../../../services/hotelApi';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import OptionRoom from '../../../components/OptionRoom';
export default function HotelArea() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [choosedHotelId, setChoosedHotelId] = useState(null);

  useEffect(async() => {
    const allHotels = await getHotels(token);
    setHotels(allHotels);
  }, [token]);

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
  }, [hotels]);

  return (
    <>
      <HotelsWrapper>
        {hotels.map((el) => {
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
              key={el.id}
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
      <OptionRoom choosedHotelId={+choosedHotelId} />
    </>
  );
}
const HotelsWrapper = styled.div`
  height: 100%;
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
