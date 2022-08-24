import styled from 'styled-components';

const ChooseBtn = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 3px solid ${({ theme }) => theme.colors.line};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  line-height: 1.2;
  background-color: ${({ theme }) => theme.colors.body};
  transition: 0.3s;

  &.active {
    background-color: ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.focusText};
  }

  &.fail {
    background-color: #d56262;
    color: ${({ theme }) => theme.colors.focusText};
  }
`;

export default ChooseBtn;
