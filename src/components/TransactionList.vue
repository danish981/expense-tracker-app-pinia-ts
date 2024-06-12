<template>
  <div v-show="store.transactions.length > 0" class="history-heading">
    <h3>History ({{ store.transactions.length }})</h3>
    <button class="btn-danger" @click="store.removeAllTransactions">Delete All</button>
  </div>
  <ul id="list" class="list">
    <li
      v-for="transaction in store.transactions"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}
      <span class="amount-span">$ {{ transaction.amount }} </span>
      <button class="delete-btn" @click="store.deleteTransaction(transaction.id)">x</button>
    </li>
  </ul>
</template>

<script setup>
import { transactionsStore } from '@/stores/transaction';
import { onMounted } from 'vue';

const store = transactionsStore();

onMounted(() => {
  store.transactions = store.getTransactionsFromLocalStorage;
});
</script>

<style scoped>

.history-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

</style>
