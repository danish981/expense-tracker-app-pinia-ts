<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <!-- a unique key has to be defined when rendering lists or data with v-for -->
    <!-- and instead of v-bind:key we can use :key attribute, its short and cleaner -->
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}
      <span>-$ {{ parseFloat(transaction.amount).toFixed(2) }} </span
      ><button @click="deleteTransaction(transaction.id)" class="delete-btn">
        x
      </button>
    </li>

    <!-- THE HARD CODED ELEMENTS -->
    <!-- class minus gives red border -->
    <!-- <li class="minus">
        Cash <span>-$400</span><button class="delete-btn">x</button>
      </li> -->

    <!-- class plus gives green border -->
    <!-- <li class="plus">
        Paycheck <span>$800</span><button class="delete-btn">x</button>
      </li> -->
  </ul>
</template>
  
  
  <!-- getting the transactions array as props from this App.vue parent component to the TransactionList child component -->
  <script setup>
import { defineProps } from "vue";

const emit = defineEmits(["transactionDeleted"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};
</script>