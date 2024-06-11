<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+$ {{ store.getIncome }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">-$ {{ store.getExpense }}</p>
    </div>
  </div>
</template>

<script setup>

import { transactionsStore } from '@/stores/transaction.ts';

let store = transactionsStore();

</script>