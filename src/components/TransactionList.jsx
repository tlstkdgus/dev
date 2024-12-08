import styled from 'styled-components';
import { format } from 'date-fns';

const Amount = styled.span`
  color: ${props => props.type === 'income' ? '#2563eb' : '#dc2626'};
`;

const ListContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: ${({ theme }) => theme.spacing.small};
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const TransactionList = ({ transactions }) => {
  return (
    <ListContainer>
      <ListHeader>
        <div>날짜</div>
        <div>구분</div>
        <div>금액</div>
        <div>잔액</div>
      </ListHeader>
      {transactions
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((transaction, index) => {
          const balance = transactions
            .slice(0, index + 1)
            .reduce((sum, t) => sum + t.amount, 0);
            
          return (
            <ListItem key={index}>
              <div>{format(new Date(transaction.date), 'yyyy-MM-dd')}</div>
              <div>{transaction.type === 'income' ? '수입' : '지출'}</div>
              <Amount type={transaction.type}>
                {Math.abs(transaction.amount).toLocaleString()}원
              </Amount>
              <div>{balance.toLocaleString()}원</div>
            </ListItem>
          );
        })}
    </ListContainer>
  );
};