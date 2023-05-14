import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 37px;

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 15px;
    margin-top: 15px;
  }
`;

export const ButtomWrapper = styled.div`
  height: 145px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const SquareButtom = styled.button`
  background-color: white;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #cecece;
  cursor: pointer;
`;

export const FinishButtomWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  span {
    font-weight: bold;
  }
`;

export const ReserveTicketButtom = styled.button`
  width: 162px;
  height: 37px;
  margin-bottom: 97px;
  background-color: #e0e0e0;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;
