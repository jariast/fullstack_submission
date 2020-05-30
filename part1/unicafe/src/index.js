import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.header}</h1>;

const Button = ({ clickHandler, buttonLabel }) => (
  <button onClick={clickHandler}>{buttonLabel}</button>
);

const SingleStat = ({ label, statValueLabel }) => (
  <tr>
    <td>{label}</td>
    <td>{statValueLabel}</td>
  </tr>
);

const Stats = ({ good, neutral, bad, statsHeader, ratingsLabels }) => {
  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const positiveRatio = (good / total) * 100;

  if (total > 0) {
    return (
      <>
        <h2>{statsHeader}</h2>
        <table>
          <tbody>
            <SingleStat label={ratingsLabels.good} statValueLabel={good} />
            <SingleStat
              label={ratingsLabels.neutral}
              statValueLabel={neutral}
            />
            <SingleStat label={ratingsLabels.bad} statValueLabel={bad} />
            <SingleStat label={ratingsLabels.total} statValueLabel={total} />
            <SingleStat label={ratingsLabels.avg} statValueLabel={avg} />
            <SingleStat
              label={ratingsLabels.positive}
              statValueLabel={positiveRatio + '%'}
            />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h2>{statsHeader}</h2>

        <p>No feedback given</p>
      </>
    );
  }
};

const App = () => {
  const header = 'Give feeback please!';
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const statsHeader = 'Statistics';
  const ratingsLabels = {
    good: 'Good',
    neutral: 'Neutral',
    bad: 'Bad',
    total: 'Total',
    avg: 'Average',
    positive: 'Positive',
  };

  return (
    <>
      <Header header={header} />
      <Button
        clickHandler={() => setGood(good + 1)}
        buttonLabel={ratingsLabels.good}
      />
      <Button
        clickHandler={() => setNeutral(neutral + 1)}
        buttonLabel={ratingsLabels.neutral}
      />
      <Button
        clickHandler={() => setBad(bad + 1)}
        buttonLabel={ratingsLabels.bad}
      />
      <Stats
        good={good}
        neutral={neutral}
        bad={bad}
        statsHeader={statsHeader}
        ratingsLabels={ratingsLabels}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
