import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getAllActivities } from '../../../services/activityApi';
import { useEffect, useState } from 'react';

export default function Activity() {
  const token = useToken();
  const [activities, setActivities] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    const fetchActivities = async() => {
      const allActivities = await getAllActivities(token);
      setActivities(allActivities);
    };
    fetchActivities();
  }, [token]);

  const handleClick = (day) => {
    setSelectedButton(day);
  };

  return (
    <>
      {selectedButton === '' && <SecondTitle>Primeiro, filtre pelo dia do evento: </SecondTitle>}
      <ButtonsWrapper>
        <ActivityButton onClick={() => handleClick('Segunda,29/05')} active={selectedButton === 'Segunda,29/05'}>
          Segunda,29/05
        </ActivityButton>
        <ActivityButton onClick={() => handleClick('Terça,30/05')} active={selectedButton === 'Terça,30/05'}>
          Terça,30/05
        </ActivityButton>
        <ActivityButton onClick={() => handleClick('Quarta,31/05')} active={selectedButton === 'Quarta,31/05'}>
          Quarta,31/05
        </ActivityButton>
      </ButtonsWrapper>
      <ActivitiesWrapper>
        <div style={{ display: selectedButton === 'Segunda,29/05' ? 'block' : 'none' }}>
          {activities
            .filter((activity) => {
              const startDateTime = new Date(activity.startDateTime);
              return startDateTime.getDate() === 29;
            })
            .map((activity) => (
              <>
                <br />
                <div key={activity.id}>{activity.name}</div>
              </>
            ))}
        </div>
        <div style={{ display: selectedButton === 'Terça,30/05' ? 'block' : 'none' }}>
          {activities
            .filter((activity) => {
              const startDateTime = new Date(activity.startDateTime);
              return startDateTime.getDate() === 30;
            })
            .map((activity) => (
              <>
                <br />
                <div key={activity.id}>{activity.name}</div>
              </>
            ))}
        </div>
        <div style={{ display: selectedButton === 'Quarta,31/05' ? 'block' : 'none' }}>
          {activities
            .filter((activity) => {
              const startDateTime = new Date(activity.startDateTime);
              return startDateTime.getDate() === 31;
            })
            .map((activity) => (
              <>
                <br />
                <div key={activity.id}>{activity.name}</div>
              </>
            ))}
        </div>
      </ActivitiesWrapper>
    </>
  );
}

const SecondTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;

const ButtonsWrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 23px;
  flex-direction: row;
`;

const ActivityButton = styled.button`
  width: 131px;
  height: 37px;
  background: ${({ active }) => (active ? '#FFD37D' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin-right: 17px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: ${({ active }) => (active ? '#FFD37D' : '#d6d6d6')};
  }
`;

const ActivitiesWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 60px;
`;
