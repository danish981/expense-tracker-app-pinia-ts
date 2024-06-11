<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text" style="font-weight: bolder">Text</label>
      <input id="text" v-model="text" autocomplete="off" placeholder="Enter income/expense text... e.g (payroll cheque)" type="text" />
    </div>
    <div class="form-control">
      <label for="amount"
      ><span style="font-weight: bolder">Amount</span>
        (-ve for expense, +ve for income)</label
      >
      <input
        id="amount"
        v-model="amount"
        autocomplete="off"
        placeholder="Enter the amount... e.g (200)"
        type="number"
      />
    </div>
    <button class="btn" type="submit">Add transaction</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import { transactionsStore } from '@/stores/transaction';

const transactions = transactionsStore();

const text = ref('');
const amount = ref();

const toast = useToast();

// we can move this logic to transactionsStore too to make the code cleaner
const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error('Both the fields are necessary to be filled');
    return;
  }

  const isTransactionAdded = transactions.addTransaction({
    text: text.value,
    amount: amount.value,
  });

  if (isTransactionAdded !== -1) {
    text.value = '';
    amount.value = '';
  }

};
</script>