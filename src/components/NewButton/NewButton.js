import React from 'react';
import styled from 'styled-components';

export default function NewButton({ children, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return <Button onClick={handleClick}>{children}</Button>;
}

const Button = styled.button`
  color: ${({ theme }) => theme.colors.buttonAndLogo};
  font-size: ${({ theme }) => theme.pixelToRem(13)};
  font-weight: 700;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }

  &:active {
    opacity: 0.5;
  }
`;
