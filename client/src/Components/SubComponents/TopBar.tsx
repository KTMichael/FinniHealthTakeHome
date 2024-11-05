import * as React from "react";
import styled from "styled-components";

const Styled = {
  Container: styled.div`
    background-color: #34415b;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    margin: 10px;
    min-width: 480px;
  `,

  Title: styled.h1`
    color: #b1d2df;
  `,
};

const TopBar = ({ title }) => {
  return (
    <Styled.Container aria-label="Top Bar Container">
      <Styled.Title aria-label="Page Title">{title}</Styled.Title>
    </Styled.Container>
  );
};

export default TopBar;
