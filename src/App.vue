<template>
  <div id="app">
      <p>{{ response }}</p>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            socket : require('socket.io-client')('http://localhost:8080'),
            response : '',
        }
    },
    created() {
        this.socket.on('message', data => {
            this.response = data;
        } )
    }
}
</script>

<style>
</style>
