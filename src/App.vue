<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <TransactionList />
    <AddTransaction />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

function removeToastCloseButtons() {
  const closeButtons = document.querySelectorAll('.Vue-Toastification__close-button');
  closeButtons.forEach((button) => button.remove());
}

removeToastCloseButtons();


</script>

<style scoped>
.Vue-Toastification__close-button {
  display: none;
}
</style>
