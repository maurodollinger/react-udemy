import classes from './TableResults.module.css';

const TableResults = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <table className={classes.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((val,key) => (
          <tr key={key}>
            <td>{val.year}</td>
            <td>{formatter.format(val.savingsEndOfYear)}</td>
            <td>{formatter.format(val.yearlyInterest)}</td>
            <td>{formatter.format(val.savingsEndOfYear - props.initialInvestment - val.yearlyContribution * val.year)}</td>
            <tr>{formatter.format(props.initialInvestment + val.yearlyContribution * val.year)}</tr>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableResults;
