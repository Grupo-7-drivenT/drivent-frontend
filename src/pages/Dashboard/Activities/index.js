import useTickets from '../../../hooks/api/useTicket';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Activity from './activity';

export default function Activities() {
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket } = useTickets();

  useEffect(() => {
    async function fetchUserTicket() {
      try {
        const ticket = await getTicket();
        setUserTicket(ticket);
      } catch (error) {
        console.error('Erro ao obter informações do ingresso:', error);
      }
    }

    fetchUserTicket();
  }, []);

  if (!userTicket) {
    return (
      <>
        <TitleTypography variant="h4">Escolha de atividades</TitleTypography>
        <CustomCenter>Nenhum ingresso encontrado.</CustomCenter>
      </>
    );
  }

  if (!userTicket.TicketType.includesHotel) {
    return (
      <>
        <TitleTypography variant="h4">Escolha de atividades</TitleTypography>
        <CustomCenter>
          Sua modalidade de ingresso não necessita escolher atividade.
          <br />
          Você terá acesso a todas as atividades
        </CustomCenter>
      </>
    );
  }

  if (userTicket.status === 'PAID') {
    return (
      <>
        <TitleTypography variant="h4">Escolha de atividades</TitleTypography>
        <Activity />
      </>
    );
  }

  return (
    <CustomCenter>
      Seu pagamento ainda não foi confirmado
      <br />
      Não é possível reservar um hotel
    </CustomCenter>
  );
}

const TitleTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const CustomCenter = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e8e;
  font-size: 20px;
  text-align: center;
`;
