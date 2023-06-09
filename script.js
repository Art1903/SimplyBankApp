const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2023-06-07T07:43:59.331Z",
    "2023-06-08T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "EUR",
  locale: "de-DE",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "JPY",
  locale: "ja-JP",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "CNY",
  locale: "zh-Hans-CN",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseNickname = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatTransactionDate = function (date, locale) {
  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return "Сьогодні";
  if (daysPassed === 1) return "Вчора";
  if (daysPassed <= 7) return `${daysPassed} дні тому`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayTransactions = (account, sort = false) => {
  containerTransactions.innerHTML = "";

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach((trans, index) => {
    const transType = trans > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.transactionsDates[index]);

    const transDate = formatTransactionDate(date, account.locale);

    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionsRow = `
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${formattedTrans}</div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionsRow);
  });
};

// Create nicknames accouts
const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createNicknames(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

// Display Total deposits, withdrawals, interests
const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

const updateUi = function (account) {
  // Display transactions
  displayTransactions(account);

  // Display balance
  displayBalance(account);

  // Display tolal
  displayTotal(account);
};

let currentAccount;

// Always logged in
currentAccount = account1;
updateUi(currentAccount);
containerApp.style.opacity = 100;

// Login in account and display informations

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and welcome message
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Раді що Ви знову з нами, ${
      currentAccount.userName.split(" ")[0]
    }!`;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, "0");
    // const month = `${now.getMonth() + 1}`.padStart(2, "0");
    // const year = now.getFullYear();

    // labelDate.textContent = `${day}/${month}/${year}`;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear inputs
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

// Event hendlers

// Create buttom transfer to another account
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) => account.nickname === recipientNickname
  );

  inputTransferTo.value = "";
  inputTransferAmount.value = "";

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    // Add transactions
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    // Add transactions date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseNickname.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      (account) => account.nickname === currentAccount.nickname
    );

    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Увійдіть в свій акаунт!";
  }

  inputCloseNickname.value = "";
  inputClosePin.value = "";
});

// Запросити Займ
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (trans) => trans >= (loanAmount * 10) / 100
    )
  ) {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);
  }
  inputLoanAmount.value = "";
});

let transactionsSorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

// Array.from() example

// const logoImage = document.querySelector(".logo");
// logoImage.addEventListener("click", function () {
const transactionsUi = document.querySelectorAll(".transactions__value");
const transactionsUiArray = Array.from(transactionsUi);
console.log(transactionsUiArray.map((elem) => +elem.textContent));

// const transactionsUiArray = Array.from(transactionsUi, elem => Number(elem.textContent));
// console.log(transactionsUiArray);
//});

const logoImage = document.querySelector(".logo");
logoImage.addEventListener("click", function () {
  [...document.querySelectorAll(".transactions__row")].forEach(function (
    row,
    index
  ) {
    if (index % 2 === 0) {
      row.style.backgroundColor = "grey";
    }
  });
});
