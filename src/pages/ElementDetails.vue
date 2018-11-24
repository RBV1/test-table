<template lang="html">
  <div class="uk-container">
    <div class="uk-flex uk-flex-between uk-flex-middle">
      <h1>Details</h1>
      <router-link :to="{ name: 'Home'}" class="uk-button uk-button-primary">Home page</router-link>
    </div>
    <div class="uk-background-default uk-padding">
      <div class="uk-flex uk-flex-middle uk-width-large uk-child-width-1-1">
        <div>Name:</div>
        <div>{{ info.name }}</div>
      </div>
      <hr>
      <div class="uk-flex uk-flex-middle uk-width-large uk-child-width-1-1">
        <div>Currency:</div>
        <div>{{ info.currency }}</div>
      </div>
      <hr>
      <div class="uk-flex uk-flex-middle uk-width-large uk-child-width-1-1">
        <div>Location:</div>
        <div>{{ info.location }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ElementDetails',
  props: [ 'id' ],
  data() {
    return {
      info: {

      }
    }
  },
  async created(){
    let data = await this.getSpecificElement(this.id)
    this.info = Object.assign({}, this.info, data)
  },
  methods: {
    ...mapActions({
      getSpecificElement: 'getSpecificElement'
    })
  }
}
</script>

<style lang="css">
</style>
