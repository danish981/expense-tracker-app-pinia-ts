// https://pinia.vuejs.org/core-concepts/state.html

import {defineStore} from 'pinia'

import {useToast} from "vue-toastification";

const toast = useToast()

interface Transaction {
    id: number;
    text: string;
    amount: number;
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

        getTotal: (state) => {  // actually it is the balance
            return state.transactions.reduce((acc, transaction) => {
                return acc + transaction.amount
            }, 0)
                .toFixed(2)
        },

        getIncome: (state) => {
            return state.transactions
                .filter((transaction) => transaction.amount > 0)
                .reduce((acc, transaction) => {
                    return acc + transaction.amount
                }, 0)
                .toFixed(2)
        },

        getExpense: (state) => {
            return state.transactions
                .filter((transaction) => transaction.amount < 0)
                .reduce((acc, transaction) => {
                    return acc + transaction.amount
                }, 0)
                .toFixed(2)
        },
    },


    actions: {

        addTransaction(transaction: Transaction): void {


            this.transactions.push({
                id: this.generateUniqueRandomId(),
                text: transaction.text,
                amount: transaction.amount
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
        }


    }

})