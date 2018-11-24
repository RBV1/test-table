<template lang="html">
  <div class="uk-container uk-padding">
    <div class="uk-flex uk-flex-between uk-flex-middle">
      <h1>Home page</h1>
      <button @click='addMode = true' class="uk-button uk-button-primary">Add row</button>
      <div class="uk-search uk-search-default uk-background-default">
        <span uk-search-icon></span>
        <input class="uk-search-input" type="search" v-model="searchQuery">
      </div>
    </div>
    <div class="table-wrapper">
      <Spinner :flag="dataIsLoaded" class="uk-padding-small">
        <div class="currency uk-padding">
            Totat currency: {{ totalCurrency }}
        </div>
        <Table
          :data="searchData"
          :columns="columnNames"
          @remove="removeData"
          @updateElement='updateData'/>
      </Spinner>
    </div>
    <AddDataRow :show="addMode" @close="addMode = false" @create="createData"/>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Spinner from '@/components/Spinner'
import AddDataRow from '@/components/AddDataRow'

import { showSuccess } from '@/util/showNotification'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      addMode: false,
      columnNames: [
        { field: 'name', title: 'Name', validatorRules: /^.{3,}$/ },
        { field: 'currency', title: 'Currency', validatorRules: /^\d+$/  },
        { field: 'location', title: 'Location', validatorRules: /^.{3,}$/ }
      ]
    }
  },
  created() {
    this.setDataRef()
  },
  beforeDestroy(){
    this.unsetDataRef()
  },
  computed: {
    ...mapGetters({
      listData: 'getListData',
      dataIsLoaded: 'getStatusLoad'
    }),
    totalCurrency() {
      return this.searchData.reduce((acc, current) => acc + parseInt(current.currency) || 0, 0)
    },
    searchData(){
      const { searchQuery, listData } = this;
      return listData.filter(el => {
        return Object.keys(el).some(field => {
          let lowerQuery = searchQuery.toLowerCase()
          let currentValue = el[field].toString().toLowerCase()

          return currentValue.includes(lowerQuery)
        })
      })
    }
  },
  methods: {
    ...mapActions({
      setDataRef: 'setDataRef',
      removeElement: 'removeElement',
      updateElement: 'updateElement',
      unsetDataRef: 'unsetDataRef',
      createElement: 'createElement'
    }),
    async updateData(...args) {
      await this.updateElement(...args)
      showSuccess({
        message: 'Updated !'
      })
    },
    async removeData(...args){
      await this.removeElement(...args)
      showSuccess({
        message: 'Removed !'
      })
    },
    async createData(...args){
      await this.createElement(...args)
      showSuccess({
        message: 'Created !'
      })
    }
  },
  components: {
    Table,
    Spinner,
    AddDataRow
  }
}
</script>

<style lang="less">
.table-wrapper {
  box-shadow:  0 5px 15px rgba(0,0,0,0.08);
  background-color: #fff;
}
</style>
