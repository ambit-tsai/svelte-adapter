import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Component  from './v-model.vue'

describe('v-model', () => {
    it('v-model', async () => {
        const wrapper = mount(Component)
        expect(wrapper.find('.value').text()).toBe('1')
        wrapper.find('.op').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(2)
        expect(wrapper.find('.value').text()).toBe('2')
    })
})
