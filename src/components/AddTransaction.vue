<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text" style="font-weight: bolder">Text</label>
      <input id="text" v-model="text" placeholder="Enter text..." type="text"/>
    </div>
    <div class="form-control">
      <label for="amount"
      ><span style="font-weight: bolder">Amount</span>
        (-ve for expense, +ve for income)</label
      >
      <input
          id="amount"
          v-model="amount"
          placeholder="Write text"
          type="number"
      />
    </div>
    <button class="btn" type="submit">Add transaction</button>
  </form>
</template>

<script setup>
import {ref} from "vue";
import {useToast} from "vue-toastification";

import {transactionsStore} from "@/stores/transaction";

const transactions = transactionsStore();

const text = ref("");
const amount = ref(0);

const toast = useToast();

// todo : we can move this logic into the transactions store
const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error("Both the fields are necessary to be filled");
    return;
  }

  transactions.addTransaction({
    text: text.value,
    amount: amount.value,
  });

  text.value = "";
  amount.value = 0;

};
</script>