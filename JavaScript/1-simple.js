'use strict';

class AccountCommand {
  constructor(account, operation, amount) {
    this.operation = operation;
    this.account = account;
    this.amount = amount;
  }
}

class AccountQuery {
  constructor(account, operation) {
    this.account = account;
    this.operation = operation;
    this.rows = 0;
  }
}

class BankAccount {
  static collection = new Map();

  constructor(name) {
    this.name = name;
    this.balance = 0;
    BankAccount.collection.set(name, this);
  }

  static find(name) {
    return BankAccount.collection.get(name);
  }
}

const OPERATIONS = {
  withdraw: (command) => {
    const account = BankAccount.find(command.account);
    account.balance -= command.amount;
  },
  income: (command) => {
    const account = BankAccount.find(command.account);
    account.balance += command.amount;
  },
};

class Bank {
  constructor() {
    this.commands = [];
    this.queries = [];
  }

  operation(account, value) {
    const operation = value < 0 ? 'withdraw' : 'income';
    const execute = OPERATIONS[operation];
    const amount = Math.abs(value);
    const command = new AccountCommand(account.name, operation, amount);
    this.commands.push(command);
    console.dir(command);
    execute(command);
  }

  select({ account, operation }) {
    const query = new AccountQuery(account, operation);
    this.queries.push(query);
    const result = [];
    for (const command of this.commands) {
      let condition = true;
      if (account) condition = command.account === account;
      if (operation) condition = condition && command.operation === operation;
      if (condition) result.push(command);
    }
    query.rows = result.length;
    console.dir(query);
    return result;
  }
}

// Usage

const bank = new Bank();
const account1 = new BankAccount('Marcus Aurelius');
bank.operation(account1, 1000);
bank.operation(account1, -50);
const account2 = new BankAccount('Antoninus Pius');
bank.operation(account2, 500);
bank.operation(account2, -100);
bank.operation(account2, 150);
console.table([account1, account2]);

const res1 = bank.select({ account: 'Marcus Aurelius' });
console.table(res1);

const res2 = bank.select({ account: 'Antoninus Pius', operation: 'income' });
console.table(res2);

const res3 = bank.select({ operation: 'withdraw' });
console.table(res3);

console.log('Query logs:');
console.table(bank.queries);
