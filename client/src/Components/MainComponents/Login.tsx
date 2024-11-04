import * as React from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import FinniLogoFoxRight from "../Assests/FinniLogoFoxRight.svg";
import FinniLogo from "../Assests/FinniLogo.svg";
import styled from "styled-components";
import { Button } from "../ComponentStyles/componentStyles";
import { UserData } from "../../types";

const Styled = {
  Background: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    min-width: 500px;
    width: 80%;
    background-color: #e1d2c6;
  `,
  Logos: styled.div`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    gap: 0;
  `,
  LogoText: styled.img`
    height: 60%;
    margin-bottom: 14%;
  `,
  LogoFox: styled.img`
    height: 100%;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #34415b;
      color: white;
    }
  `,
  Button: styled(Button)`
    background-color: #b1d2df;
  `,
};

const defaultValues = {
  email: null,
};
const Login = () => {
  const [userData, setUser] = React.useState<UserData>(defaultValues);
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      setUser({
        email: user.user.email,
      });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (userData.email === null) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [userData]);

  return (
    <Styled.Background>
      <Styled.Logos>
        <Styled.LogoFox src={FinniLogoFoxRight} alt="Finni logo Fox" />
        <Styled.LogoText src={FinniLogo} alt="Finni logo" />
      </Styled.Logos>
      <Styled.ButtonContainer>
        <Styled.Button onClick={signInWithGoogle}>
          Sign In With Google
        </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Background>
  );
};

export default Login;
