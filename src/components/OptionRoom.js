import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { getAllRooms } from '../services/roomApi';
import UserContext from '../contexts/UserContext';
import { useEffect } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { GetBookingRoom, createBooking } from '../services/BookingApi';

export default function OptionRoom({ choosedHotelId }) {
  const { userData } = useContext(UserContext);
  const [typeRoom, setTypeRoom] = useState([]);
  const [choosedRoom, setChoosedRoom] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllRooms(userData.token, +choosedHotelId);
      setTypeRoom(response.Rooms);
    }
    fetchData();
  }, [choosedHotelId]);

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
              {typeRoom.map((t) => <>
                {t.name === 'Single' &&
                  <Option
                    key={t.id}
                    style={{
                      backgroundColor: choosedRoom === t.id ? '#FFEED2' : '#FFFFFF',
                      cursor: 'pointer'
                    }} onClick={() => setChoosedRoom(t.id)} >
                    <h1>{t.id}
                    </h1>
                    <div>
                      {choosedRoom === t.id ?
                        <BsFillPersonFill color='pink' />
                        :
                        <BsPerson />
                      }
                    </div>
                  </Option>
                }
                {t.name === 'Double' &&
                  <Option
                    key={t.id}
                    style={{
                      backgroundColor: choosedRoom === t.id ? '#FFEED2' : '#FFFFFF',
                      cursor: 'pointer'
                    }} onClick={() => setChoosedRoom(t.id)} >
                    <h1>{t.id}
                    </h1>
                    <div>
                      {t.capacity === 1 ?
                        <>
                          {choosedRoom === t.id ?
                            <BsFillPersonFill color='pink' />
                            :
                            <BsPerson />
                          }
                          <BsFillPersonFill />
                        </>
                        :
                        <>
                          <BsPerson />
                          {choosedRoom === t.id ?
                            <BsFillPersonFill color='pink' />
                            :
                            <BsPerson />
                          }
                        </>
                      }
                    </div>
                  </Option>
                }
                {t.name === 'Triple' && t.capacity === 0 &&
                  <OptionDisable disabled={true}>
                    <h1>{t.id}
                    </h1><div>
                      <BsFillPersonFill />
                      <BsFillPersonFill />
                      <BsFillPersonFill />
                    </div>
                  </OptionDisable>
                }
                {t.name === 'Triple' && t.capacity !== 0 &&
                  <Option
                    key={t.id}
                    style={{
                      backgroundColor: choosedRoom === t.id ? '#FFEED2' : '#FFFFFF',
                      cursor: 'pointer'
                    }} onClick={() => setChoosedRoom(t.id)}
                  >
                    <h1>{t.id}
                    </h1>

                    <div>
                      {t.capacity === 1 &&
                        <>
                          {choosedRoom === t.id ?
                            <BsFillPersonFill color='pink' />
                            :
                            <BsPerson />
                          }
                          <BsFillPersonFill />
                          <BsFillPersonFill />
                        </>
                      }
                      {t.capacity === 2 &&
                        <>

                          <BsFillPersonFill />
                          <BsPerson />
                          {choosedRoom === t.id ?
                            <BsFillPersonFill color='pink' />
                            :
                            <BsPerson />
                          }
                        </>
                      }
                      {t.capacity === 3 &&
                        <>
                          <BsPerson />
                          <BsPerson />
                          {choosedRoom === t.id ?
                            <BsFillPersonFill color='pink' />
                            :
                            <BsPerson />
                          }
                        </>
                      }
                    </div>
                  </Option>

                }

              </>)}
            </Wrap>
          </section>
          <button onClick={createNewBooking}>RESERVAR O QUARTO</button>
        </>
      }
    </Main>
  );
};

const Option = styled.button`
width: 190px;
height: 45px;
border-radius: 5px;
border: 1px solid #CECECE;
display: flex;
justify-content: space-around;
align-items: center;
margin: 0 17px 8px 0;
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
