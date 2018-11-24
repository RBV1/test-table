import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Table from "@/components/Table.vue";


describe("Table.vue", () => {
  let data, sortedStatus, columns, wrapper;
  beforeEach(() => {
    columns = [
      {
        field: "currency",
        title: "Currency",
        validatorRules: /^.{3,}$/
      }
    ];

    data = [
      {
        currency: 2
      },
      {
        currency: 3
      },
      {
        currency: 1
      }
    ];

    sortedStatus = {
      GROWTH: "GROWTH",
      DECREASE: "DECREASE",
      NOT_SORT: "NOT_SORT"
    };

    wrapper = shallowMount(Table, {
      propsData: {
        columns,
        data
      },
      data: function () {
        return {
          constSortStatus: sortedStatus
        }
      }
    });
  });

  it("should sorting data DECREASE", () => {
    wrapper.vm.changeSortStatus(0)
    expect(data.map(el => el.currency).join('')).to.equal('321')
  })

  it("should sorting data GROWTH", () => {
    wrapper.vm.changeSortStatus(0)
    wrapper.vm.changeSortStatus(0)
    expect(data.map(el => el.currency).join('')).to.equal('123')
  })
});
