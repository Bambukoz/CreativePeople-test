'use strict';

(() => {
  const calculatorForm = document.querySelector(`.calculator`);
  const amountInput = calculatorForm.querySelector(`#amount`);
  const amountText = calculatorForm.querySelector(`#amount-text`);
  const termInput = calculatorForm.querySelector(`#term`);
  const termText = calculatorForm.querySelector(`#term-text`);
  const monthlyPayment = calculatorForm.querySelector(`#monthly_payment`);

  const setValueOnChange = (evt) => {
    if (evt.target === amountInput) {
      let textValue = amountInput.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);
      amountText.textContent = `${textValue} ₽`;
    } else {
      termText.textContent = `${termInput.value} мес.`;
    }
  };

  const setMonthlyPayment = () => {
    let monthCount = parseInt(termInput.value, 10);
    let sumCredit = parseInt(amountInput.value, 10);
    const RATE = 10.99;
    let ratePerMonth = (RATE / 12) / 100;
    let result = Math.round((sumCredit * (ratePerMonth + (ratePerMonth / (Math.pow(ratePerMonth + 1, monthCount) - 1)))))
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);
    monthlyPayment.textContent = `${result} ₽`;
  };

  calculatorForm.addEventListener(`input`, setValueOnChange);
  calculatorForm.addEventListener(`change`, setMonthlyPayment);
})();
