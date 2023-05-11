import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: red;
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
  }
`;

export const ButtomWrapper = styled.div`
  height: 145px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: blue;
`;

export const SquareButtom = styled.button`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  background-color: yellow;
`;
