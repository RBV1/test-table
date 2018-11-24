import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import sinon from 'sinon'
// import * as showNotification from '@/util/showNotification'
import TableRow from "@/components/TableRow.vue";

describe("TableRow.vue", () => {
  describe('Validation', () => {
    let columns, item, wrapper, inputs;
    beforeEach(() => {
      columns = [
        {
          field: "name",
          title: "Name",
          validatorRules: /^.{3,}$/
        }
      ]

      item = {
        currency: 49489,
        id: "bb205027-6333-45b0-a830-921af731f6dc",
        location: "Baguio",
        name: "Twinder",
        ".key": "9"
      }

      wrapper = shallowMount(TableRow, {
        propsData: {
          columns,
          item
        }
      })

      inputs = wrapper.findAll('input[name]')
    })

    it("should add class to input when invalid", () => {
      inputs.setValue('')
      inputs.trigger('change')

      for (var i = 0; i < inputs.length; i++) {
        expect(inputs.at(i).classes()).to.contain('uk-form-danger')
      }
    })

    // it("should show error message", () => {
    //   let showError = sinon.stub(showNotification, 'showError')
    //   inputs.setValue('')
    //   inputs.trigger('change')
    //   expect(showError.called).to.equal(true)
    // })

    it("should add class to input when valid", () => {
      inputs.setValue('asdad')
      inputs.trigger('change')
      expect(wrapper.emitted('updateElement')).to.have.lengthOf(inputs.length)
    })
  })
});
