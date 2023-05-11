import React, { useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useEnrollment from '../../hooks/api/useEnrollment';

export default function Payment() {
  const { enrollment } = useEnrollment();

  if (!enrollment) {
    return (
      <>
        <TitleTypography variant="h4">Ingresso e pagamento</TitleTypography>
        <CustomCenter>
          Você precisa completar sua inscrição antes
          <br /> de prosseguir para a escolha de ingresso
        </CustomCenter>
      </>
    );
  }

  return (
    <>
      {/* Restante do código para quando o usuário está inscrito */}
    </>
  );
}

const TitleTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const CustomCenter = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;

