import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Component  from './v-slot.vue'

describe('v-slot', () => {
    it('default slot', () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'default slot',
            },
        })
        expect(wrapper.find('.default').text()).toBe('1')
    })


    it('named slots', () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'named slots',
            },
        })
        expect(wrapper.find('.slot1').text()).toBe('1')
    })


    it.skip('default slot that receive props', () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'default slot that receive props',
                value: 1,
            },
        })
        expect(wrapper.find('.default').text()).toBe('1')
    })
})
