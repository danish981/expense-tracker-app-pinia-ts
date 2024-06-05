<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}
      <span>-$ {{ parseFloat(transaction.amount).toFixed(2) }} </span
      >
      <button @click="deleteTransaction(transaction.id)" class="delete-btn">
        x
      </button>
    </li>
  </ul>
</template>

<script setup>

import {transactionsStore} from "@/stores/transaction";
import {onMounted} from "vue";

const store = transactionsStore();

const transactions = store.transactions;

const deleteTransaction = (id) => {
  store.deleteTransaction(id);
};


</script>