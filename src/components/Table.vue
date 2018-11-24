<template lang="html">
  <div>
    <div class="table table--striped">
      <div class="table__head">
        <div class='table__row'>
          <div class="table__cell" v-for="(col, index) in columns">
            {{ col.title }}
            <div class="table__actions" @click='changeSortStatus(index)'>
              <span v-if="isSortStatus(constSortStatus.DECREASE, index)" uk-icon="arrow-down"></span>
              <span v-if="isSortStatus(constSortStatus.GROWTH, index)" uk-icon="arrow-up"></span>
              <span v-if="isSortStatus(constSortStatus.NOT_SORT, index)" >
                <span class="uk-icon uk-icon-image"></span>
              </span>
            </div>
          </div>
          <div class="table__cell">
            Actions
          </div>
        </div>
      </div>
      <div class="table__body">
        <TableRow
          v-for="item in sortedData"
          :item="item"
          :key="item.id"
          @updateElement="updateData"
          @remove="id => $emit('remove', id)"
          :columns="columns">
          </TableRow>
      </div>
      <div v-if="!data.length" class="uk-text-muted uk-text-center uk-padding-small">
        No content
      </div>
    </div>
  </div>
</template>

<script>
import TableRow from '@/components/TableRow'


const SORT_STATES = {
  GROWTH: 'GROWTH',
  DECREASE: 'DECREASE',
  NOT_SORT: 'NOT_SORT'
}

export default {
  name: 'Table',
  props: {
    data: Array,
    columns: Array,
  },
  data() {
    return {
      sortStates: [],
      constSortStatus: SORT_STATES
    }
  },

  computed: {
    sortedData() {
      const { data, sortStates } = this;
      let sortedData = data

      sortStates.forEach((el, index) => {
        let flag = false

        if (el.status === SORT_STATES['GROWTH']) {
          flag = true
        }

        if (el.status === SORT_STATES['DECREASE']) {
          flag = false
        }

        if (el.status !== SORT_STATES['NOT_SORT']) {
          sortedColumn(sortedData, el.field, flag)
        }
      })

      return sortedData
    }
  },

  methods: {
    isSortStatus(status, index) {
      return this.sortStates[index]
        ? this.sortStates[index].status === SORT_STATES[status]
        : false
    },
    changeSortStatus(index) {
      let currentStatus = this.sortStates[index].status;
      this.sortStates.forEach(el => el.status = SORT_STATES['NOT_SORT'])

      this.sortStates[index].status = currentStatus === SORT_STATES['GROWTH']
        ? currentStatus = SORT_STATES['DECREASE']
        : currentStatus = SORT_STATES['GROWTH']
    },
    updateData(id, element){
      this.$emit('updateElement', {
        id,
        element
      })
    }
  },

  created() {
    this.sortStates = this.columns.map(el => {
      return {
        field: el.field,
        status: SORT_STATES['NOT_SORT']
      }
    })
  },
  components: {
    TableRow
  }
}

function sortedColumn(array, column, flag) { // true - GROWTH, false - DECREASE
  return array.sort((el1, el2) => {

    return flag ? compare(el1[column], el2[column]) : compare(el2[column], el1[column])
  })
}

function compare(el1, el2) {
  if (!isNaN(el1) && !isNaN(el1)) {
    return el2 - el1
  } else {
    return el1.localeCompare(el2)
  }
}

</script>

<style lang="less" scoped>

.table__cell {
  flex: 1;
  padding: 16px 12px;
  vertical-align: top;
}


.table--striped {
  .table__row:nth-child(even) {
    background: #f8f8f8;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
}



.table__body {
  max-height: 600px;
  overflow: auto;
}

.table__head {
  border-bottom: 1px solid #e5e5e5;

  .table__cell {
    padding: 16px 12px;
    text-align: left;
    vertical-align: bottom;
    font-size: 12px;
    font-weight: normal;
    color: #999;
    text-transform: uppercase;
    display: flex;
  }
}




.table__actions {
  display: flex;

  span {
    cursor: pointer;
  }

  .uk-icon-image{
    background-size: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 489.4 489.4' style='enable-background:new 0 0 489.4 489.4;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M370.2,468.9c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3V50.1l73.6,73.6c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6 c4.8-4.8,4.8-12.5,0-17.3l-94.5-94.5c-4.6-4.6-12.7-4.6-17.3,0l-94.5,94.5c-4.8,4.8-4.8,12.5,0,17.3c4.8,4.8,12.5,4.8,17.3,0 l73.6-73.6v418.8H370.2z'/%3E%3Cpath d='M209.9,365.7c-4.8-4.8-12.5-4.8-17.3,0L119,439.3V20.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v418.8l-73.5-73.6 c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l94.5,94.5c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6L210,383 C214.6,378.3,214.6,370.5,209.9,365.7z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
  }
}
</style>
