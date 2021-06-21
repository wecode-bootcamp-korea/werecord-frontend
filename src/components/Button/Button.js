import React from 'react';
import styled from 'styled-components';

export default function Button({
  children,
  fontSize,
  version,
  disabled,
  clickEvent,
}) {
  return (
    <Container
      fontSize={fontSize}
      version={version}
      disabled={disabled}
      onClick={clickEvent}
    >
      {children}
    </Container>
  );
}

const Container = styled.button`
  padding: 10px 20px;
  color: ${({ theme, version, disabled }) => {
    if (version === 'white') {
      if (disabled) {
        return 'gray';
      } else {
        return theme.colors.black;
      }
    } else if (version === 'black') {
      if (disabled) {
        return 'gray';
      } else {
        return theme.colors.white;
      }
    }
  }};
  background-color: ${({ theme, version, disabled }) => {
    if (version === 'white') {
      return theme.colors.white;
    } else if (version === 'black') {
      return 'transparent';
    }
  }};

  font-size: ${({ theme, fontSize }) => theme.pixelToRem(fontSize)};
  font-weight: bold;
  border: 1px solid
    ${({ theme, version, disabled }) => {
      if (version === 'white') {
        return theme.colors.black;
      } else if (version === 'black') {
        if (disabled) {
          return 'gray';
        } else {
          return theme.colors.white;
        }
      }
    }};
  border-radius: 3px;
  cursor: ${({ disabled }) => disabled || 'pointer'};
  opacity: ${({ theme, version, disabled }) => {
    if (version === 'white') {
      if (disabled) {
        return '0.5';
      } else {
        return '1';
      }
    } else if (version === 'black') {
      return 'transparent';
    }
  }};

  &:hover {
    color: ${({ theme, version, disabled }) => {
      if (version === 'white') {
        if (disabled) {
          return;
        }
        return theme.colors.white;
      } else if (version === 'black') {
        if (disabled) {
          return;
        } else {
          return theme.colors.black;
        }
      }
    }};
    background-color: ${({ theme, version, disabled }) => {
      if (version === 'white') {
        if (disabled) {
          return;
        } else {
          return 'transparent';
        }
      } else if (version === 'black') {
        if (disabled) {
          return;
        } else {
          return theme.colors.white;
        }
      }
    }};
    border: 1px solid
      ${({ theme, version, disabled }) => {
        if (version === 'black') {
          if (disabled) {
            return;
          } else {
            return theme.colors.white;
          }
        }
      }};
  }

  &:active {
    opacity: 0.5;
  }

  transition: background-color 0.3s, opacity 0.1s;
`;
