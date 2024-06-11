import {defineStore} from 'pinia'

import {useToast} from "vue-toastification";
import type {UnwrapRef} from "vue";

const toast = useToast()

interface Transaction {
    id: number
    text: string
    amount: number,
    datetime: string
}

export const transactionsStore = defineStore('transactions', {

    state: () => {
        return {
            transactions: [] as Transaction[]
        }
    },

    getters: {

        getTransactions: (state) => {
            return state.transactions
        },

        getTransactionsFromLocalStorage: () => {
            return JSON.parse(localStorage.getItem("transactions") || "[]")
        },

        getTotal: (state): number => {
            return Number.parseFloat(state.transactions.reduce((acc, transaction) => {
                return acc + transaction.amount
            }, 0)
                .toFixed(2))
        },

        getIncome: (state): number => {
            return Number.parseFloat(state.transactions
                .filter((transaction) => transaction.amount > 0)
                .reduce((acc, transaction) => {
                    return acc + transaction.amount
                }, 0)
                .toFixed(2))
        },

        getExpense: (state): number => {
            return Number.parseFloat(state.transactions
                .filter((transaction) => transaction.amount < 0)
                .reduce((acc, transaction) => {
                    return acc + transaction.amount
                }, 0)
                .toFixed(2))
        },
    },

    actions: {

        addTransaction(transaction: { amount: UnwrapRef<number>, text: UnwrapRef<string> }): number | void {

            if (this.transactions.some((item) => item.text === transaction.text)) {
                toast.error('Title already exists')
                return -1
            }

            if (transaction.text == '') {
                toast.error('Title cannot be empty')
                return -1;
            }

            // if (!/^[a-zA-Z]+$/.test(transaction.text)) {
            //     toast.error('Title can only contain letters');
            //     return -1;
            // }

            if (transaction.amount == null) {
                toast.error('Amount cannot be empty')
                return -1
            }

            if (Number.isNaN(transaction.amount)) {
                toast.error('Amount must be a number')
                return -1
            }

            if (transaction.text.length > 30) {
                toast.error('Title cannot be more than 30 letters')
                return -1
            }

            if (transaction.amount == 0) {
                toast.error('Amount cannot be zero')
                return -1
            }

            if (transaction.amount >= 100000000000) {
                toast.error('Amount cannot be greater than 100000000000')
                return -1
            }

            if ((transaction.amount < 0) && (Math.abs(transaction.amount) > this.getTotal)) {
                toast.error('Expense cannot be greater than the balance')
                return -1
            }

            this.transactions.push({
                id: this.generateUniqueRandomId(),
                text: transaction.text,
                amount: transaction.amount,
                datetime: this.getFormattedDate(new Date())
            })

            toast.success('New record added')
            this.saveTransactionToLocalStorage()
        },

        generateUniqueRandomId(): number {
            return Math.floor(Math.random() * 1000000000)
        },

        deleteTransaction(id: number): void {
            this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
            toast.success('Record removed')
            this.saveTransactionToLocalStorage()
        },

        saveTransactionToLocalStorage(): void {
            localStorage.setItem("transactions", JSON.stringify(this.transactions));
        },

        deleteTransactionsDataFromCache(): void {
            localStorage.removeItem("transactions");
        },

        resetTransaction(): void {
            this.transactions = []
            this.deleteTransactionsDataFromCache()
            toast.success('All records removed')
        },

        getFormattedDate(date: Date): string {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

    }

})