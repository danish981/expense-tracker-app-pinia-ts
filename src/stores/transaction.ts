

// https://pinia.vuejs.org/core-concepts/state.html

import { defineStore } from 'pinia'
import { useToast } from "vue-toastification";

const toast = useToast();

interface Transaction {
    id: number;
    text: string;
    amount: number;
}

export const transactionsStore = defineStore('transactions', {
    state: () => {
        return {
            // transactions array or single transactions
            transactions: [] as Transaction[]
        }
    },

    getters: {
        getTransactions: (state) => {
            return state.transactions
        },

        getTotal: (state) => {
            return state.transactions.reduce((acc, transaction) => {
                return acc + transaction.amount
            }, 0)
        },

        getIncome: (state) => {
            return state.transactions
                .filter((transaction) => transaction.amount > 0)
                .reduce((acc, transaction) => {
                    return acc + transaction.amount
                }, 0)
        },

        getExpense: (state) => {
            return state.transactions
                .filter((transaction) => transaction.amount < 0)
                .reduce((acc, transaction) => {
                    return acc + transaction.amount
                }, 0)
        },
    },


    actions: {

        addTransaction(transaction: Transaction) {
            this.transactions.push(transaction)
            toast.success("Transaction added successfully!");
        },


        generateUniqueRandomId() {
            return Math.floor(Math.random() * 1000000000)
        },


        deleteTransaction(id: number) {
            this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
            toast.success("Transaction deleted successfully!");
        },

        saveTransactionToLocalStorage() {
            localStorage.setItem("transactions", JSON.stringify(this.transactions));
        }

    }



})