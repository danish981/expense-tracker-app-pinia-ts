<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
        v-for="transaction in store.transactions"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}
      <span>-$ {{ transaction.amount }} </span
      >
      <button @click="store.deleteTransaction(transaction.id)" class="delete-btn">
        x
      </button>
    </li>
  </ul>
</template>

<script setup>

import {transactionsStore} from "@/stores/transaction";

const store = transactionsStore();

</script>