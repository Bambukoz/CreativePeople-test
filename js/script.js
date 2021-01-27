'use strict';
(() => {
  const calculator = document.querySelector(`.calculator`);
  const amountInput = calculator.querySelector(`#amount`);
  const amountText = calculator.querySelector(`#amount-text`);
  const termInput = calculator.querySelector(`#term`);
  const termText = calculator.querySelector(`#term-text`);
  const creditResult = document.querySelector(`.credit__result`);
  const loanRate = creditResult.querySelector(`#loan_rate`);
  const monthlyPayment = creditResult.querySelector(`#monthly_payment`);


  const setValueOnChange = (evt) => {
    if (evt.target === amountInput) {
      const textValue = amountInput.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);
      amountText.textContent = `${textValue} ₽`;
    } else {
      termText.textContent = `${termInput.value} мес.`;
    }
  };

  const setSumCredit = () => {
    return parseInt(amountInput.value, 10);
  };

  const setMonthCount = () => {
    return parseInt(termInput.value, 10);
  };

  const setRate = () => {
    return (loanRate.dataset.value) / 12 / 100;
  };

  const calculatePayment = () => {
    const sumCredit = setSumCredit();
    const monthCount = setMonthCount();
    const rate = setRate();
    return Math.round((sumCredit * (rate + (rate / (Math.pow(rate + 1, monthCount) - 1)))))
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);
  };

  const setMonthlyPayment = () => {
    monthlyPayment.textContent = `${calculatePayment()} ₽`;
  };

  setMonthlyPayment();

  calculator.addEventListener(`input`, setValueOnChange);
  calculator.addEventListener(`change`, setMonthlyPayment);
})();
