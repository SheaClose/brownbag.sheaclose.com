import React from "react";
import CSVReader from "react-csv-reader";
import "./App.css";
export default class App extends React.Component {
  state = {
    csv: null,
    answers: []
  };
  handleForce = csv => {
    csv.forEach(c => {
      c.shift();
      c.pop();
    });
    let opts = csv.shift();
    let answers = csv.slice();
    let answerSums = answers[0]
      .map(function(c, ind) {
        let sum = 0;
        for (let i = 0; i < answers.length; i++) {
          sum += +answers[i][ind];
        }
        return sum;
      })
      // sync sums with options
      .map((c, i) => ({ sum: c, bb: opts[i] }))
      // sort by totals
      .sort((a, b) => (a.sum > b.sum ? -1 : 1));
    // trim to seven for each day on cs weeks
    // .slice(0, 8);
    this.setState({ answers: answerSums });
  };
  render() {
    let answers = this.state.answers.map((answer, index) => (
      <span className="answer" key={index}>
        {answer.sum} - {answer.bb} <br />
      </span>
    ));
    return (
      <div className="">
        <CSVReader
          cssClass="CSV"
          value={this.state.csv}
          label="Import Google Form CSV   "
          onFileLoaded={this.handleForce}
          onError={this.handleDarkSideForce}
        />
        <hr />
        {answers}
      </div>
    );
  }
}
