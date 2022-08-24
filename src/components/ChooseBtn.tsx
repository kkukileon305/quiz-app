import styled from 'styled-components';

const ChooseBtn = styled.button<{ width?: string }>`
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  margin-bottom: 20px;
  border: 3px solid ${({ theme }) => theme.colors.line};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  line-height: 1.2;
  background-color: ${({ theme }) => theme.colors.body};
  transition: 0.3s;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &.active {
    background-color: ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.focusText};
  }

  &.fail {
    background-color: #d56262;
    color: ${({ theme }) => theme.colors.focusText};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.body};
    border: 3px solid ${({ theme }) => theme.colors.disabled};
  }
`;

export default ChooseBtn;
