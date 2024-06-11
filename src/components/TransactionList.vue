<template>
  <h3 v-show="store.transactions.length > 0">History</h3>
  <ul id="list" class="list">
    <li

      v-for="transaction in store.transactions"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >

      {{ transaction.text }}
      <span class="amount-span">$ {{ transaction.amount }} </span
      >
      <button class="delete-btn" @click="store.deleteTransaction(transaction.id)">
        x
      </button>
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