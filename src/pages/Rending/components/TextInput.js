import React from 'react';
import styled from 'styled-components';

export default function TextInput({
  hasValue,
  inputName,
  onDisabled,
  getInputValue,
  type,
}) {
  return (
    <StyleInput
      hasValue={hasValue !== ''}
      onChange={getInputValue}
      name={inputName}
      disabled={onDisabled}
      type={type}
    />
  );
}

const StyleInput = styled.input`
  width: 88px;
  height: 40px;
  padding: 4px 16px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorPurple};
  background: white;

  ${({ disabled }) =>
    disabled && `background: #f8f8f8; border-color: #e0e0e0;`};

  ${({ hasValue }) => hasValue && `border: 1px solid #514AB8;`}

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.purple};

    ${({ disabled }) => disabled && `border-color: #e0e0e0;`};
  }

  ${({ theme }) => theme.mobile`
    width: 60px;
    height: 35px;
    padding: 4px 8px;
    text-align: center;
    font-size: ${({ theme }) => theme.pixelToRem(16)};
  `}
`;
