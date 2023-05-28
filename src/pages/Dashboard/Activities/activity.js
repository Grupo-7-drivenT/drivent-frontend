import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getAllActivities, postMatriculation } from '../../../services/activityApi';
import { useContext, useEffect, useState } from 'react';
import { RxEnter } from 'react-icons/rx';
import { CiCircleRemove } from 'react-icons/ci';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import UserContext from '../../../contexts/UserContext';

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
        <MainComponent style={{ display: selectedButton === 'Segunda,29/05' ? 'flex' : 'none' }}>
          {activities
            .filter((activity) => {
              const startDateTime = new Date(activity.startDateTime);
              return startDateTime.getDate() === 29;
            })
            .reduce((acc, activity) => {
              const existingLocation = acc.find((item) => item.location === activity.location);
              if (existingLocation) {
                existingLocation.activities.push(activity);
              } else {
                acc.push({
                  location: activity.location,
                  activities: [activity],
                });
              }
              return acc;
            }, [])
            .map((group) => (
              <ParentComponent key={group.location} location={group.location} activities={group.activities} />
            ))}
        </MainComponent>
        <MainComponent style={{ display: selectedButton === 'Terça,30/05' ? 'flex' : 'none' }}>
          {activities
            .filter((activity) => {
              const startDateTime = new Date(activity.startDateTime);
              return startDateTime.getDate() === 30;
            })
            .reduce((acc, activity) => {
              const existingLocation = acc.find((item) => item.location === activity.location);
              if (existingLocation) {
                existingLocation.activities.push(activity);
              } else {
                acc.push({
                  location: activity.location,
                  activities: [activity],
                });
              }
              return acc;
            }, [])
            .map((group) => (
              <ParentComponent key={group.location} location={group.location} activities={group.activities} />
            ))}
        </MainComponent>
        <MainComponent style={{ display: selectedButton === 'Quarta,31/05' ? 'flex' : 'none' }}>
          {activities
            .filter((activity) => {
              const startDateTime = new Date(activity.startDateTime);
              return startDateTime.getDate() === 31;
            })
            .reduce((acc, activity) => {
              const existingLocation = acc.find((item) => item.location === activity.location);
              if (existingLocation) {
                existingLocation.activities.push(activity);
              } else {
                acc.push({
                  location: activity.location,
                  activities: [activity],
                });
              }
              return acc;
            }, [])
            .map((group) => (
              <ParentComponent key={group.location} location={group.location} activities={group.activities} />
            ))}
        </MainComponent>
      </ActivitiesWrapper>
    </>
  );
}

// Componente filho representando cada objeto da array
const ChildComponent = ({ activity }) => {
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const { userData } = useContext(UserContext);
  const token = useToken();
  
  const diff_hours = () => {
    const dt1 = new Date(activity.startDateTime);
    const dt2 = new Date(activity.endDateTime);

    const hr1_hour = dt1.getHours().toString().padStart(2, '0');
    const hr1_minute = dt1.getMinutes().toString().padStart(2, '0');
    const hr2_hour = dt2.getHours().toString().padStart(2, '0');
    const hr2_minute = dt2.getMinutes().toString().padStart(2, '0');

    return `${hr1_hour}:${hr1_minute} - ${hr2_hour}:${hr2_minute}`;
  };
  const getHoursBy30Min = () => {
    const dt1 = new Date(activity.startDateTime);
    const dt2 = new Date(activity.endDateTime);
    const hours = (dt2.getTime() - dt1.getTime()) / 1000 / 60 / 60;
    return hours;
  };
  const addMatriculation = async() => {
    const activityId = { activityId: activity.id };
    await postMatriculation(activityId, token);
    window.location.reload(false);
  };
  
  if(!hasSubscribed) {
    const haveMatriculation = activity.Matriculation.find(el => el.userId === userData.user.id);
    if(haveMatriculation) setHasSubscribed(true); 
  }
   
  return (
    <EventComponent 
      key={activity.id}
      time={getHoursBy30Min()}
      subscribed={hasSubscribed? 'subscribed': undefined}>
      <div className='eventComponent_leftSide'>
        <div className='eventComponent_titleName'>
          {activity.name}
        </div>
        <div className='eventComponent_hours'>
          {diff_hours()}
        </div>
      </div>
      {hasSubscribed? 
        <div className='eventComponent_rightSide'>
          <AiOutlineCheckCircle color='#007f21' />
          <div style={{ color: '#007f21' }}>Inscrito</div>
        </div>
        :(activity.capacity-activity.Matriculation.length > 0)?
          <div className='eventComponent_rightSide'onClick={addMatriculation}>
            <RxEnter color='#007f21' />
            <div style={{ color: '#007f21' }}>{activity.capacity-activity.Matriculation.length} vagas</div>
          </div>
          :
          <div className='eventComponent_rightSide'>
            <CiCircleRemove color='#c10000' />
            <div style={{ color: '#c10000' }}>Esgotado</div>
          </div>
      }
    </EventComponent>
  );
};

// Componente pai para agrupar atividades com a mesma localização
const ParentComponent = ({ location, activities }) => {
  return (
    <LocationComponent>
      <div className='locationComponent_location'>{location}</div>
      <div className='locationComponent_activities'>
        {activities.map((activity) => (
          <ChildComponent key={activity.id} activity={activity} />
        ))}
      </div>
    </LocationComponent>
  );
};

const EventComponent = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  background-color: ${
  ({ subscribed }) => {
    if( subscribed === 'subscribed' ) return '#d0ffdb';
    else return '#f1f1f1';
  }};
  border-radius: 6px;
  padding: 1rem;
  height: ${ ({ time }) => time? `${(time*80)}px`: '80px' };


  &>.eventComponent_leftSide {  
    width: 80%;
    flex-direction: column;
    justify-content: space-between;
    &>.eventComponent_titleName {
      font-weight: 400;
      font-size: 14px;
    }
    &>.eventComponent_hours {
      font-size: 14px;
    }
  }
  &>.eventComponent_rightSide {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &>div { font-size: 12px }
  }
`;

const LocationComponent = styled.div`
  box-sizing: border-box;
  height: 100%;
  min-width: 360px;
  max-width: 360px;
  width: 360px;
  
  &>.locationComponent_location { 
    font-size: 1.3rem;
    color: gray;
    font-weight: 200;
    font-stretch: expanded;
  }
  &>.locationComponent_activities {
    height: 90%;
    padding: 1rem;
    border-style: solid;
    border-width: 1px 0px 1px 1px;
    border-color: gray;
    font-size: 1rem;
  }
`;

const MainComponent = styled.div`
  overflow-x: scroll;
  display: flex;
  height: 100%;
`;

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
  height: 70%;
  margin-top: 60px;
`;
