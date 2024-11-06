import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DialogContent = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: white;
  border-radius: 6px;
  position: fixed;
  top: 0;
  right: 0;
  width: 40dvw;
  height: calc(100dvh - 48px);
  padding: 24px;
  min-width: 320px;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #ed762f;
  color: #141414;
  cursor: pointer;
  :hover {
    background-color: #141414;
    color: #ed762f;
  }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
`;

export const DialogScroller = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const Title = styled(Dialog.Title)`
  margin: 0 0 10px 0;
  color: #fbf7f0;
  font-weight: bold;
`;
