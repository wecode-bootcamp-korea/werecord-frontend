import React from 'react';
import { createPortal } from 'react-dom';
import Styled from 'styled-components';

export default function Modal({ setOff, children }) {
  const handleModal = e => {
    const isclickedInside = e.target.closest('.modal');
    const isclickedBtn = e.target.closest('.closeBtn');

    if (setOff) {
      if (!isclickedInside) return setOff(false);
      if (isclickedBtn) return setOff(false);
    }
  };

  return createPortal(
    <OutsideModal onClick={handleModal}>
      <InsideModal className="modal">
        <CloseBtn onClick={handleModal} className="closeBtn">
          <i className="fas fa-times" />
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
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: white;
`;

const CloseBtn = Styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 10px;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.backgroundColor};
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
