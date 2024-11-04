import { Button } from "./componentStyles";
import styled from "styled-components";

export const Styled = {
  Container: styled.div`
    border-radius: 6px;
    border: solid 2px #34415b;
    padding: 10px;
    width: 400px;
    background-color: #b1d2df;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  `,
  Title: styled.h1`
    padding: 0;
    font-size: 2.2em;
    margin: 0;
  `,
  Line: styled.div`
    border-bottom: 2px solid black;
    width: 100%;
    padding-top: 2px;
  `,
  Content: styled.div`
    margin: 10px;
    gap: 5px;
    font-weight: bold;
    padding-right: 10px;
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  Name: styled.div`
    margin: 5px;
    font-size: 16px;
    font-weight: 900;
    overflow-wrap: breakword;
  `,
  Value: styled.span`
    padding-left: 10px;
  `,
  Button: styled(Button)`
    background-color: #3b553a;
    color: #fbf7f0;
    padding: 0.2em 0.8em;
    border-radius: 5px;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #141414;
      color: white;
      border: solid 2px #3b553a;
    }
  `,
  ViewProfile: styled(Button)``,
};
