import styled from "styled-components";
import { Button } from "../SubComponents/SubComponentStyles/popOverStyles";

export const Styled = {
  Container: styled.div`
    background-color: #f1eade;
    border-radius: 10px;
    padding: 10px;
    border: solid 2px #6e6176;
    color: black;
    overflow: scroll;
  `,
  ExpandingContainer: styled.div`
    background-color: #f1eade;
    border-radius: 10px;
    padding: 10px;
    border: solid 2px #6e6176;
    overflow: scroll;
    height: 100%;
    color: black;
  `,
  FormFieldContainer: styled.div`
    margin-bottom: 10px;
    padding: 10px;
  `,
  FormField: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-style: none;
  `,
  Section: styled.div`
    width: 100%;
    border-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Label: styled.label`
    font-size: 15px;

    font-weight: bold;
    width: 200px;
    padding-bottom: 5px;
    text-align: left;
  `,
  Input: styled.input`
    width: 90%;
    border: solid 2px black;
    min-width: 100px;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 15px;
    line-height: 1;
    height: 35px;
    margin-bottom: 5px;
  `,
  Select: styled.select`
    width: 92%;
    min-width: 100px;
    border-radius: 5px;
    padding: 0 10px;
    border: solid 2px black;
    font-size: 15px;
    line-height: 1;
    color: #141414;
    height: 35px;
    background-color: #fbf7f0;
    margin-bottom: 5px;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #4a3a54;
      color: white;
    }
  `,
  Button: styled(Button)`
    background-color: #34415b;
    color: white;
    display: block;
    margin-left: auto;
    margin-right: 15px;
  `,
};
