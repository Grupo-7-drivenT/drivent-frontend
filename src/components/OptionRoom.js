import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { getAllRooms } from '../services/roomApi';
import UserContext from '../contexts/UserContext';
import { useEffect } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { GetBookingRoom } from '../services/BookingApi';

export default function OptionRoom() {
  const { userData } = useContext(UserContext);
  const [typeRoom, setTypeRoom] = useState([]);
  const hotelId = 1;
  const roomId = 1;
  useEffect(() => {
    async function fetchData() {
      const response = await getAllRooms(userData.token, hotelId);
      console.log(response.Rooms);
      setTypeRoom(response.Rooms);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await GetBookingRoom(roomId, userData.token);
      console.log(response);
    }
    fetchData();
  }, [roomId]);

  return (<>
    {typeRoom.map((t) => <>
      {t.name === 'Single' &&
        <Option >
          <h1>{t.id}
          </h1>
          <div>
            <BsPerson />
          </div>
        </Option>
      }
      {t.name === 'Double' &&
        <Option >
          <h1>{t.id}
          </h1>
          <div>
            {t.capacity === 1 ?
              <>
                <BsPerson />
                <BsFillPersonFill />
              </>
              :
              <>
                <BsPerson />
                <BsPerson />
              </>
            }
          </div>
        </Option>
      }
      {t.name === 'Triple' &&
        <Option>
          <h1>{t.id}
          </h1>

          <div>
            {t.capacity === 1 &&
              <>
                <BsPerson />
                <BsFillPersonFill />
                <BsFillPersonFill />
              </>
            }
            {t.capacity === 2 &&
              <>

                <BsFillPersonFill />
                <BsPerson />
                <BsPerson />
              </>
            }
            {t.capacity === 3 &&
              <>
                <BsPerson />
                <BsPerson />
                <BsPerson />
              </>
            }
          </div>
        </Option>
      }

    </>)}
  </>);
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
background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
  color: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;
