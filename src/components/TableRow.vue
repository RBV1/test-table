<template lang="html">
  <div class="table__row">
    <div class="table__cell" v-for="{ field } in columns">
      <input @change="updateData(item['.key'])" :name="field" :value="item[field]" class="input-hidden uk-input">
    </div>
    <div class="table__cell">
      <button @click="$emit('remove', item['.key'])" class="uk-button-small uk-button-danger">Remove</button>
      <button @click="$router.push({ name: 'ElementDetails', params: { id: item['.key'] }})" class="uk-button-small uk-button-default">Details</button>
    </div>
  </div>
</template>

<script>
import { showError } from '@/util/showNotification'

export default {
  props: [
    'columns',
    'item'
  ],
  data() {
    return {
    }
  },
  methods: {
    updateData(id){
      let inputs = this.$el.querySelectorAll('input[name]');
      if (!this.validation(inputs, this.columns)) {
        showError({
          message: 'Please check your input'
        })
        return
      }

      let changeditem = Array.from(inputs).reduce((acc, cur) => {
        let name = cur.getAttribute('name')
        let value = cur.value

        acc[name] = value
        return acc
      }, {})


      this.$emit('updateElement', id, changeditem)
    },
    validation(inputs, columns){
      let result = true
      inputs.forEach(input => {
        let name = input.getAttribute('name')
        let column = columns.find(col => {
          return col.field === name
        })

        let pattern = column.validatorRules;


        if (pattern.test(input.value)) {
          input.classList.remove('uk-form-danger')
        } else {
          input.classList.add('uk-form-danger')
          result = false
        }
      })

      return result
    }
  }
}
</script>

<style lang="less">
.input-hidden:not(:focus):not(.uk-form-danger) {
  border: none;
  background-color: transparent;
}
.table__row {
  display: flex;
  color: #666;
  transition: background-color .3s ease-in;
}

.table__cell {
  flex: 1;
  padding: 16px 12px;
  vertical-align: top;
}
</style>
