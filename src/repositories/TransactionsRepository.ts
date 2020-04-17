import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.map(transaction => {
      balance.income += transaction.type === 'income' ? transaction.value : 0;
      balance.outcome += transaction.type === 'outcome' ? transaction.value : 0;
      balance.total = balance.income - balance.outcome;

      return 0;
    });

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
