import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Component  from './v-bind.vue'

describe('v-bind', () => {
    it('bind an attribute', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'bind an attribute',
                value: 0,
            },
        })
        expect(wrapper.find('.value1').text()).toBe('0')
        await wrapper.setProps({ value: 1 })
        expect(wrapper.find('.value1').text()).toBe('1')
    })


    it('dynamic attribute name', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'dynamic attribute name',
                dynamicKey: 'value1',
                value: 0,
            },
        })
        expect(wrapper.find('.value1').text()).toBe('0')
        await wrapper.setProps({
            dynamicKey: 'value2',
            value: 1,
        })
        expect(wrapper.find('.value2').text()).toBe('1')
    })


    it('shorthand', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'shorthand',
                value: 0,
            },
        })
        expect(wrapper.find('.value1').text()).toBe('0')
        await wrapper.setProps({ value: 1 })
        expect(wrapper.find('.value1').text()).toBe('1')
    })


    it('shorthand dynamic attribute name', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'shorthand dynamic attribute name',
                dynamicKey: 'value1',
                value: 0,
            },
        })
        expect(wrapper.find('.value1').text()).toBe('0')
        await wrapper.setProps({
            dynamicKey: 'value2',
            value: 1,
        })
        expect(wrapper.find('.value2').text()).toBe('1')
    })


    it('binding an object of attributes', () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'binding an object of attributes',
            },
        })
        expect(wrapper.find('.value1').text()).toBe('1')
        expect(wrapper.find('.value2').text()).toBe('2')
    })


    it('.camel', () => {
        const wrapper = mount(Component, {
            propsData: {
                example: '.camel',
                value: 0,
            },
        })
        expect(wrapper.find('.kebabCase').text()).toBe('0')
    })


    it('.sync', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: '.sync',
                value: 0,
            },
        })
        expect(wrapper.find('.value1').text()).toBe('0')
        wrapper.find('.sync').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.syncValue).toBe(1)
        expect(wrapper.find('.value1').text()).toBe('1')
    })
})
