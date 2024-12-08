import { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const InputContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.large} 0;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  color: white;
  background: ${({ variant, theme }) =>
    variant === 'income' ? theme.colors.primary : theme.colors.secondary};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const DateDisplay = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TransactionInput = ({ onAddTransaction, selectedDate }) => {
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('월급');
  const [expenseCategory, setExpenseCategory] = useState('식비');

  const handleIncome = () => {
    if (incomeAmount) {
      onAddTransaction('income', incomeCategory, Number(incomeAmount));
      setIncomeAmount('');
    }
  };

  const handleExpense = () => {
    if (expenseAmount) {
      onAddTransaction('expense', expenseCategory, Number(expenseAmount));
      setExpenseAmount('');
    }
  };

  return (
    <InputContainer>
      <DateDisplay>
        선택된 날짜: {format(selectedDate, 'yyyy년 MM월 dd일')}
      </DateDisplay>
      <InputGroup>
        <Input
          type="number"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
          placeholder="수입 금액"
        />
        <Input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <Select 
          value={incomeCategory} 
          onChange={(e) => setIncomeCategory(e.target.value)}
        >
          <option value="월급">월급</option>
          <option value="용돈">용돈</option>
          <option value="기타">기타</option>
        </Select>
        <Select 
          value={expenseCategory} 
          onChange={(e) => setExpenseCategory(e.target.value)}
        >
          <option value="식비">식비</option>
          <option value="교통비">교통비</option>
          <option value="월세">월세</option>
          <option value="기타">기타</option>
        </Select>
      </InputGroup>
      <InputGroup>
        <Button variant="income" onClick={handleIncome}>+</Button>
        <Button variant="expense" onClick={handleExpense}>-</Button>
      </InputGroup>
    </InputContainer>
  );
};