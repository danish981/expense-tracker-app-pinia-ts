<template>
  <Header/>
  <div class="container">
    <Balance/>
    <IncomeExpenses/>
    <!-- passing the transactions array to the component as props from this App.vue parent component to the TransactionList child component -->
    <TransactionList/>
    <AddTransaction/>
  </div>
</template>

<script setup>

import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";

import {onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
import {transactionsStore} from "./stores/transaction";

const store = transactionsStore()

const toast = useToast();
const transactions = ref([]);

onMounted(() => {
  transactions.value = store.getTransactionsFromLocalStorage;
});

</script>