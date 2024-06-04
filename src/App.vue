<template>
    <Header/>
    <div class="container">
      <Balance :total="total"/>
      <IncomeExpenses :income="income" :expense="expense"/>
      <!-- passing the transactions array to the component as props from this App.vue parent component to the TransactionList child component -->
      <TransactionList
        :transactions="transactions"
        @transactionDeleted="deleteTransaction"
      />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
    </div>
  </template>
  
  
  <!-- we dont have to export the components when we are using setup script, just import and use them in the template -->
  <script setup>
  import Header from "./components/Header.vue";
  import Balance from "./components/Balance.vue";
  import IncomeExpenses from "./components/IncomeExpenses.vue";
  import TransactionList from "./components/TransactionList.vue";
  import AddTransaction from "./components/AddTransaction.vue";
  
  import {computed, onMounted, ref} from "vue";
  import {useToast} from "vue-toastification";
  
  const toast = useToast();
  
  const transactions = ref([]);
  
  onMounted(() => {
    transactions.value = JSON.parse(localStorage.getItem("transactions")) || [];
  });
  
  // total
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  });
  
  // income
  const income = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
  });
  
  // expenses
  const expense = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
  });
  
  // add transaction
  const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
      id: generateUniqueRandomId(),
      text: transactionData.text,
      // amount: parseFloat(transactionData.amount).toFixed(2),
      amount: transactionData.amount,
    });
  
    toast.success("Transaction added successfully!");
    saveTransactionToLocalStorage();
  };
  
  // generate unique random id
  const generateUniqueRandomId = () => {
    return Math.floor(Math.random() * 1000000000);
  };
  
  // delete transaction
  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== id
    );
  
    toast.success("Transaction deleted successfully!");
    saveTransactionToLocalStorage();
  };
  
  const saveTransactionToLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions.value));
  };
  
  
  
  </script>