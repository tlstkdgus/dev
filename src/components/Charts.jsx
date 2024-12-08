import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Charts = ({ transactions }) => {
  const processData = (type) => {
    const filteredTransactions = transactions.filter(t => t.type === type);
    const categoryMap = new Map();
    
    filteredTransactions.forEach(t => {
      const amount = Math.abs(t.amount);
      categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + amount);
    });

    return Array.from(categoryMap).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  };

  const incomeData = processData('income');
  const expenseData = processData('expense');

  return (
    <ChartContainer>
      <ChartWrapper>
        <h3>수입 분석</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={incomeData}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {incomeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartWrapper>
      <ChartWrapper>
        <h3>지출 분석</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={expenseData}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartWrapper>
    </ChartContainer>
  );
};