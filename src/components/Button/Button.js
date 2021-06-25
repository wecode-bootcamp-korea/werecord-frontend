import React from 'react';
import styled from 'styled-components';

export default function Button({
  children,
  fontSize,
  type,
  disabled,
  clickEvent,
}) {
  return (
    <Container
      fontSize={fontSize}
      type={type}
      disabled={disabled}
      onClick={clickEvent}
    >
      {children}
    </Container>
  );
}

const Container = styled.button`
  padding: 10px 20px;
  color: ${({ theme, type, disabled }) => {
    if (type === 'white') {
      if (disabled) {
        return 'gray';
      } else {
        return theme.colors.black;
      }
    } else if (type === 'black') {
      if (disabled) {
        return 'gray';
      } else {
        return theme.colors.white;
      }
    }
  }};
  background-color: ${({ theme, type, disabled }) => {
    if (type === 'white') {
      return theme.colors.white;
    } else if (type === 'black') {
      return theme.colors.black;
    }
  }};

  font-size: ${({ theme, fontSize }) => theme.pixelToRem(fontSize)};
  font-weight: bold;
  border: 1px solid
    ${({ theme, type, disabled }) => {
      if (type === 'white') {
        if (disabled) {
          return 'gray';
        } else {
          return theme.colors.black;
        }
      } else if (type === 'black') {
        if (disabled) {
          return 'gray';
        } else {
          return theme.colors.white;
        }
      }
    }};
  border-radius: 3px;
  cursor: ${({ disabled }) => disabled || 'pointer'};
  opacity: ${({ theme, type, disabled }) => {
    if (type === 'white') {
      if (disabled) {
        return '0.5';
      } else {
        return '1';
      }
    } else if (type === 'black') {
      return theme.colors.black;
    }
  }};

  &:hover {
    color: ${({ theme, type, disabled }) => {
      if (type === 'white') {
        if (disabled) {
          return;
        }
        return theme.colors.white;
      } else if (type === 'black') {
        if (disabled) {
          return;
        } else {
          return theme.colors.black;
        }
      }
    }};
    background-color: ${({ theme, type, disabled }) => {
      if (type === 'white') {
        if (disabled) {
          return;
        } else {
          return theme.colors.blue;
        }
      } else if (type === 'black') {
        if (disabled) {
          return;
        } else {
          return theme.colors.white;
        }
      }
    }};
    border: 1px solid
      ${({ theme, type, disabled }) => {
        if (type === 'white') {
          if (disabled) {
            return 'gray';
          } else {
            return theme.colors.blue;
          }
        }
      }};

  &:active {
    opacity: 0.5;
  }

  transition: background-color 0.3s, opacity 0.1s;
`;
