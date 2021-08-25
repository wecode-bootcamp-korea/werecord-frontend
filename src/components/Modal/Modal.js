import React from 'react';
import { createPortal } from 'react-dom';
import Styled from 'styled-components';

export default function Modal({
  setOff,
  isOnCommentModal,
  children,
  width,
  height,
}) {
  const handleModal = e => {
    const isclickedInside = e.target.closest('.modal');
    const isclickedBtn = e.target.closest('.closeBtn');

    if (isOnCommentModal) {
      window.location.replace('/main');
    }

    if (setOff) {
      if (!isclickedInside) return setOff(false);
      if (isclickedBtn) return setOff(false);
    }
  };

  return createPortal(
    <OutsideModal onClick={handleModal}>
      <InsideModal className="modal" width={width} height={height}>
        <CloseBtn onClick={handleModal} className="closeBtn">
          <img alt="closeBtn" src="/images/modal/closeBtn.png" />
        </CloseBtn>
        {children}
      </InsideModal>
    </OutsideModal>,
    document.getElementById('modal')
  );
}

const OutsideModal = Styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const InsideModal = Styled.div`
  ${({ theme }) => theme.posCenter('absolute')};
  ${({ theme }) => theme.flexbox('column')};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
`;

const CloseBtn = Styled.div`
  position: absolute;
  top: 21px;
  right: 21px;
  cursor: pointer;
  z-index: 1;

  img {
    width: 14px;
    height: 14px;
  }

  &:hover {
    opacity: 0.6;
  }
`;
