import * as React from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FinniLogo from "../Assests/FinniLogo.svg";
import styled from "styled-components";
import { Button } from "../ComponentStyles/componentStyles";

const Styled = {
  Container: styled.div`
    background-color: #34415b;
    width: 130px;
    height: 99%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    position: sticky;
    left: 0;
    bottom: 0;
    z-index: 1000;
  `,
  Logo: styled.img`
    height: 5em;
    padding: 0 5px 5px 5px;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #141414;
      color: white;
      border: solid 1px white;
    }
  `,
  Button: styled(Button)`
    margin: 10px;
  `,
};

const SideBar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const logout = async () => {
    try {
      await signOut(auth).then(() => navigate("/"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Styled.Container>
      <Styled.Logo
        src={FinniLogo}
        className="logo"
        alt="Finni logo"
      ></Styled.Logo>

      <Styled.ButtonContainer>
        <Styled.Button onClick={logout}> Sign Out </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default SideBar;
