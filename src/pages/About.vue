<script>
export default {
  async setup() {
    return {
      msg: 'About',
    }
  },
  components: {
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
h1 {
  color: red;
}
</style>