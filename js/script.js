'use strict';
(() => {
  const calculator = document.querySelector(`.calculator`);
  const amountInput = calculator.querySelector(`#amount`);
  const progressAmount = calculator.querySelector(`#progress-amount`);
  const amountText = calculator.querySelector(`#amount-text`);
  const termInput = calculator.querySelector(`#term`);
  const progressTerm = calculator.querySelector(`#progress-term`);
  const termText = calculator.querySelector(`#term-text`);
  const creditResult = document.querySelector(`.credit__result`);
  const loanRate = creditResult.querySelector(`#loan_rate`);
  const monthlyPayment = creditResult.querySelector(`#monthly_payment`);

  const setProgressValue = (target) => {
    let b = (target.value / target.max);
    if (target === amountInput) {
      progressAmount.style.transform = `scale(${b}, 1)`;
    } else {
      if (b <= 0.5) {
        progressTerm.style.transform = `scale(${b - 0.16}, 1)`;
      } else if (b <= 0.7) {
        progressTerm.style.transform = `scale(${b - 0.08}, 1)`;
      } else {
        progressTerm.style.transform = `scale(${b - 0.05}, 1)`;
      }
    }
  };

  const setValueOnChange = (evt) => {
    const target = evt.target;
    if (evt.target === amountInput) {
      const textValue = amountInput.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);
      amountText.textContent = `${textValue} ₽`;
      setProgressValue(target);
    } else {
      termText.textContent = `${termInput.value} мес.`;
      setProgressValue(target);
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
  setProgressValue(amountInput);
  setProgressValue(termInput);

  calculator.addEventListener(`input`, setValueOnChange);
  calculator.addEventListener(`change`, setMonthlyPayment);
})();
