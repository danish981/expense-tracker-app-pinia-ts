<template>
  <h4>Your Balance</h4>
  <h1 id="balance">$ {{ store.getTotal }}</h1>
</template>

<script setup>
import { transactionsStore } from '@/stores/transaction';

const store = transactionsStore();

</script>