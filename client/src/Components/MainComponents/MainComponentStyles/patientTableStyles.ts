import styled from "styled-components";
export const Styled = {
  Container: styled.div`
    height: 94%;
    margin-left: auto;
    margin-right: auto;
    background-color: #f1eade;
    border: solid #333333 1px;
    border-radius: 10px;
    padding: 10px;
    overflow: scroll;
  `,
  Add: styled.div`
    display: flex;
    justify-content: right;
    margin: 10px;
    position: sticky;
    top: 0;
    gap: 10px;
  `,
  TableContainer: styled.div`
    height: calc(100% - 100px);
    overflow: scroll;
    border-radius: 10px;
  `,
  Table: styled.table`
    padding: 10px;
    background: #3b553a;
    color: #fbf7f0;
    border-collapse: collapse;
    position: sticky;
    top: 0px;
    border-radius: 10px;
    width: 100%;
    min-width: 800px;
  `,
  Input: styled.input`
    border-radius: 10px;
    padding: 0 5px;
    font-size: 15px;
    line-height: 1;
    color: black;
    height: 35px;
    background-color: white;
    margin: 10px 5px;
    width: 80%;
    min-width: 30px;
  `,
  Select: styled.select`
    border-radius: 4px;
    padding: 0 5px;
    font-size: 15px;
    line-height: 1;
    color: black;
    height: 25px;
    background-color: white;
    cursor: pointer;
  `,
  TBody: styled.tbody`
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: #758875;
    }
  `,
  Th: styled.th`
    padding-top: 10px;
    width: 20%;
  `,
  TrRow: styled.tr``,
  Td: styled.td`
    padding: 10px 0 10px 15px;
    border-bottom: solid 1px #fbf7f0;
  `,
  THead: styled.thead`
    position: sticky;
    top: 0px;
    margin: 0 0 5px 0;
    background-color: #2f442e;
    border-radius: 10px;
  `,
  Button: styled.button`
    background-color: #3b553a;
    color: #fbf7f0;
    padding: 0.2em 0.8em;
    border-radius: 5px;
  `,
  PaginationSection: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
  `,
  ButtonContainer: styled.div`
    :hover {
      background-color: #f1eade;
      color: #3b553a;
      border: solid 2px #3b553a;
    }
  `,
};
