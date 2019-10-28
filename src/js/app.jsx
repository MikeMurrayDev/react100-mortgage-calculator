import React from 'react';
import ReactDOM from 'react-dom';
import style from '../css/style.less';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: '',
      rate: '',
      term: '',
      output: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  calculate() {
    const principal = this.state.balance;
    const monthlyInterest = ((this.state.rate / 100) / 12);
    const numberOfPayments = (this.state.term * 12);

    const numerator = (monthlyInterest * (1 + monthlyInterest) ** numberOfPayments);
    const denominator = (((1 + monthlyInterest) ** numberOfPayments) - 1);
    const divisionTotal = (numerator / denominator);

    const monthlyPayment = (principal * divisionTotal).toFixed(2);
    
    this.setState({
      output: `Your monthly payment is $${monthlyPayment}`
    });
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <h1 className={style.headerTitle}>Mortgage Calculator</h1>
        </div>
        <div className="row">
          <div className={style.divRow}>
            <span className={style.textMid}>Loan Balance:</span>
            <input className={style.inputRow} name="balance" type="number" placeholder="0" value={this.state.balance} onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$"/>
          </div>
        </div>
         <div className="row">
           <div className={style.divRow}>
            <span className={style.textMid}>Interest Rate (%):</span>
            <input className={style.inputRow} name="rate" type="number" placeholder="0" step="0.01" value={this.state.rate} onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$"/>
           </div>
        </div>
        <div className="row">
          <div className={style.divRow}>
            <span className={style.textMid}>Loan Term (years):</span>
            <select className={style.inputRow} name="term" placeholder="15" value={this.state.term} onChange={this.handleChange}>
              <option value="15">15 year</option>
              <option value="30">30 year</option>
            </select>
          </div>
        </div>
        <div className="row">
          <button name="submit" className={style.buttonMid} onClick={this.calculate}>Submit</button>
        </div>
        <div className="row">
          <div id="output" className={style.textMid} value={this.state.output}>{this.state.output}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);