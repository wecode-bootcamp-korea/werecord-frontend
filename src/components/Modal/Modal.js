import React from 'react';
import { createPortal } from 'react-dom';
import Styled from 'styled-components';

export default function Modal({ setOff, children, height }) {
  return createPortal(
    <OutsideModal onClick={setOff}>
      <InsideModal className="modal" height={height}>
        <CloseBtn onClick={setOff} className="closeBtn">
          <i class="fas fa-times" />
        </CloseBtn>
        {children}
      </InsideModal>
    </OutsideModal>,
    document.getElementById('modal')
  );
}

const OutsideModal = Styled.div`
  ${({ theme }) => theme.flexbox()};
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(33, 33, 33, 0.9);

`;

const InsideModal = Styled.div`
  position: relative;
  width: 550px;
  height: ${props => props.height};
  border-radius: 10px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.fontColor};
  color: white;
`;

const CloseBtn = Styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 10px;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.backgroundColor};
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
