import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.medium} 0;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const ActionButtons = ({ onModify, onDelete, onReset }) => (
  <ButtonGroup>
    <Button onClick={onModify}>수정</Button>
    <Button onClick={onDelete}>삭제</Button>
    <Button onClick={onReset}>초기화</Button>
  </ButtonGroup>
);
