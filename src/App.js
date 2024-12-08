import { useState } from 'react';
import styled from 'styled-components';
import { Calendar } from './components/Calendar';
import { TransactionList } from './components/TransactionList';
import { BalanceDisplay } from './components/BalanceDisplay';
import { TransactionInput } from '../src/components/TransactionInput';
import { ActionButtons } from '../src/components/ActionBtn';
import { theme } from '../src/Styles/theme';
import { ThemeProvider } from 'styled-components';
import { Charts } from './components/Charts';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

export const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      income,
      expense,
      balance: income - expense
    };
  };

  const handleAddTransaction = (type, category, amount) => {
    const newTransaction = {
      type,
      category,
      amount: type === 'income' ? amount : -amount,
      date: selectedDate  // 선택된 날짜 사용
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDelete = () => {
    if (selectedTransaction !== null) {
      setTransactions(transactions.filter((_, i) => i !== selectedTransaction));
      setSelectedTransaction(null);
    }
  };

  const handleModify = () => {
    if (selectedTransaction !== null) {
      // 수정 로직 구현
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleReset = () => {
    setTransactions([]);
    setSelectedTransaction(null);
  };

  const { income, expense, balance } = calculateTotals();

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <LeftPanel>
          <BalanceDisplay
            balance={balance}
            income={income}
            expense={expense}
          />
          <TransactionInput 
            onAddTransaction={handleAddTransaction}
            selectedDate={selectedDate}  // 선택된 날짜 전달
          />
          <ActionButtons
            onModify={handleModify}
            onDelete={handleDelete}
            onReset={handleReset}
          />
          <Calendar 
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
          />
        </LeftPanel>
        <RightPanel>
          <TransactionList transactions={transactions} />
          <Charts transactions={transactions} />
        </RightPanel>
      </AppContainer>
    </ThemeProvider>
  );
};