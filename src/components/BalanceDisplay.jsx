import styled from 'styled-components';

const BalanceContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: white;
`;

const Balance = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

const BalanceInfo = styled.div`
  font-size: 14px;
  margin: 5px 0;
`;

export const BalanceDisplay = ({ balance, income, expense }) => (
  <BalanceContainer>
    <div>내 계산</div>
    <Balance>{balance.toLocaleString()}원</Balance>
    <BalanceInfo>수입: {income.toLocaleString()}원</BalanceInfo>
    <BalanceInfo>지출: {expense.toLocaleString()}원</BalanceInfo>
  </BalanceContainer>
);
