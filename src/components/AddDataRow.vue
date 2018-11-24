<template lang="html">
  <div ref="add-table-row" uk-offcanvas>
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <form @submit.prevent="submitForm">
        <div class="uk-margin">
          <label class="uk-form-label">Name</label>
           <input :class="{'uk-form-danger': $v.newData.name.$error }"  v-model="newData.name" class="uk-input" type="text" placeholder="Name">
           <span v-if='$v.newData.name.$error' class="error-text">
             This field is required and must have minimul 3 letters
           </span>
         </div>
         <div class="uk-margin">
         <label class="uk-form-label">Currency</label>
          <input :class="{'uk-form-danger': $v.newData.currency.$error }" v-model="newData.currency" class="uk-input" type="text" placeholder="Currency">
          <span v-if='$v.newData.currency.$error' class="error-text">
            This field is required and must be numeric
          </span>
        </div>
        <div class="uk-margin">
           <label class="uk-form-label">Location</label>
           <input :class="{'uk-form-danger': $v.newData.location.$error }"  v-model="newData.location" class="uk-input" type="text" placeholder="Location">
           <span v-if='$v.newData.location.$error' class="error-text">
             This field is required and must have minimul 3 letters
           </span>
         </div>
         <div class="uk-flex uk-flex-center">
           <button class="uk-button uk-button-primary">Create</button>
         </div>
      </form>
    </div>
  </div>
</template>

<script>
import UIkit from 'uikit'
import { validationMixin } from 'vuelidate'
import { required, minLength, between, numeric, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'AddDataRow',
  mixins: [validationMixin],
  props: ['show'],
  mounted(){
    UIkit.util.on(this.$refs['add-table-row'], 'beforehide', () => this.$emit('close'))
  },
  watch: {
    show(){
      let offcanvas = this.$refs['add-table-row']
      if (this.show) {
        UIkit.offcanvas(offcanvas).show();
      } else {
        UIkit.offcanvas(offcanvas).hide();
      }
    }
  },
  data() {
    return {
      newData: {
        name: '',
        currency: '',
        location: ''
      }
    }
  },
  methods:{
    closeOffCanvas(){
      let offcanvas = this.$refs['add-table-row']
      UIkit.offcanvas(offcanvas).hide();
    },
    submitForm() {
      this.$v.newData.$touch()
      if (this.$v.newData.$error) {
        return
      }
      this.closeOffCanvas()
      this.$emit('create', this.newData)
    }
  },
  validations: {
    newData: {
      name: {
        required,
        minLength: minLength(3)
      },
      currency: {
        required,
        numeric,
        minValue: minValue(0)
      },
      location: {
        required,
        minLength: minLength(3)
      }
    }
  }
}
</script>

<style lang="less">
.uk-offcanvas {
  transition: background-color .3s ease;
  background-color: rgba(0, 0, 0, 0);

  &.uk-open {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
  }
}

.uk-offcanvas-bar {
  background-color: #fff;
  box-shadow: 0 0 5px #e7e7e7;
  color: #666;


  .uk-input {
      border: 1px solid #e5e5e5;

      &:focus {
        border-color: #1e87f0;
      }

      &.uk-form-danger,
      &.uk-form-danger:focus {
        color: #f0506e;
        border-color: #f0506e;
      }
  }

  .uk-button {
    background-color: #1e87f0;
    color: #fff;
    border: 1px solid transparent;
    min-width: 140px;

    &:hover,
    &:focus {
      background-color: #0f7ae5;
      color: #fff;
    }
  }

  .error-text {
    font-size: 12px;
    color: #f0506e;
    line-height: 1.2;
    display: inline-block;
    margin-top: 5px;
  }


  .uk-close:hover,
  .uk-close,
  .uk-input,
  .uk-input:focus,
  ::placeholder,
  .uk-form-label {
    color: #666;
  }
}
</style>
