import React from 'react';
import styled from 'styled-components';

export default function RadioBtn({
  getInputValue,
  id,
  value,
  btnName,
  disabled,
  text,
  userType,
  position,
}) {
  return (
    <>
      <RadioInput
        onChange={getInputValue}
        type="radio"
        id={id}
        name={btnName}
        value={value}
        disabled={disabled}
      />
      <Label
        htmlFor={id}
        changeColor={userType === value || position === value}
      >
        {text}
      </Label>
    </>
  );
}

const RadioInput = styled.input`
  position: relative;
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  outline: none;
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.purple};

    ${({ disabled }) => disabled && `border-color: #e0e0e0`};
  }

  ${({ theme }) => theme.mobile`
    width: 16px;
    height: 16px;
  `}

  &:before {
    content: '';
    display: block;
    width: 55%;
    height: 55%;
    border-radius: 50%;
    ${({ theme }) => theme.posCenter('absolute')};
    transition: all 0.1s ease;
  }

  &:checked:before {
    background: ${({ theme }) => theme.colors.purple};
  }

  ${({ disabled }) =>
    disabled && `background: #f8f8f8; border: 1px solid #e0e0e0;`};
`;

const Label = styled.label`
  margin-left: 10px;
  margin-right: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(22)};
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  transition: all 0.1s ease;

  ${({ changeColor }) => changeColor && `color: #514AB8;`}

  ${({ theme }) => theme.mobile`
    font-size: ${({ theme }) => theme.pixelToRem(15)};
    line-height: 20px;
  `}
`;
