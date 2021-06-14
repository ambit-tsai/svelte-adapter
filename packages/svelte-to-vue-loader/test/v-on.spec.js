import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Component  from './v-on.vue'

describe('v-on', () => {    
    it('method handler', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'method handler',
            },
        })
        wrapper.find('.op1').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(1)
    })


    it.skip('dynamic event', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'dynamic event',
            },
        })
        wrapper.find('.op1').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(1)

        await wrapper.setData({ key: 'event2' })
        wrapper.find('.op2').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(2)
    })


    it('inline statement', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'inline statement',
            },
        })
        wrapper.find('.op1').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(1)
    })


    it('shorthand', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'shorthand',
            },
        })
        wrapper.find('.op1').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(1)
    })


    it.skip('shorthand dynamic event', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'shorthand dynamic event',
            },
        })
        wrapper.find('.op1').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(1)

        await wrapper.setData({ key: 'event2' })
        wrapper.find('.op2').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(2)
    })


    it('object syntax', async () => {
        const wrapper = mount(Component, {
            propsData: {
                example: 'object syntax',
            },
        })
        wrapper.find('.op1').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(1)

        wrapper.find('.op2').trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.value).toBe(2)
    })
})
