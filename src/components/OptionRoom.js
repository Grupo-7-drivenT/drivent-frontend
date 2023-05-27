import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { getAllRooms } from '../services/roomApi';
import UserContext from '../contexts/UserContext';
import { useEffect } from 'react';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import { createBooking } from '../services/BookingApi';
import { useNavigate } from 'react-router-dom';

export default function OptionRoom({ choosedHotelId }) {
  const { userData } = useContext(UserContext);
  const [typeRoom, setTypeRoom] = useState([]);
  const [choosedRoom, setChoosedRoom] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllRooms(userData.token, +choosedHotelId);
      setTypeRoom(response.Rooms);
    }
    fetchData();
  }, [choosedHotelId]);

  async function createNewBooking() {
    await createBooking(choosedRoom, userData.token);
    window.location.reload(false);
  }

  return (
    <>
      <Main>
        {choosedHotelId !== 0 && (
          <>
            <h2>Ótima pedida! Agora escolha seu quarto:</h2>
            <section>
              <Wrap>
                {typeRoom.map((t) => (
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
              </Wrap>
            </section>
            <button onClick={createNewBooking}>RESERVAR O QUARTO</button>
          </>
        )}
      </Main>
    </>
  );
}

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

const Main = styled.main`
  margin-top: 52px;
  width: 811px;
  height: 260px;
  h2 {
    margin-bottom: 25px;
    color: #8e8e8e;
  }
  button {
    width: 182px;
    height: 37px;
    left: 350px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
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
