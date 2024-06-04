<template>
  <h4>Your Balance</h4>
  <h1 id="balance">$ {{ parseFloat(total).toFixed(2) }}</h1>
</template>
  
  
  <!-- used the defineProps macro to get the "total" prop passed to this component -->
  <!-- see : https://vuejs.org/guide/essentials/component-basics.html#passing-props -->
  <script setup>
defineProps(["total"]);
</script>