import styled from 'styled-components';
import ChooseTicketType from './chooseTicketType';

export default function Payment() {
  return (
    <>
      <Title>Ingresso e Pagamentos</Title>
      <ChooseTicketType />
    </>
  );
}

const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 34px;
  color: '#000000';
`;
