import { mount } from '@vue/test-utils'
import Component  from './v-if.vue'

describe('v-if', () => {
    it('if true', () => {
        const wrapper = mount(Component, {
            propsData: {
                condition: true,
            },
        })
        expect(wrapper.find('.child').exists()).toBe(true)
    })


    it('if false', () => {
        const wrapper = mount(Component, {
            propsData: {
                condition: false,
            },
        })
        expect(wrapper.find('.child').exists()).toBe(false)
    })


    it('from true to false', async () => {
        const wrapper = mount(Component, {
            propsData: {
                condition: true,
            },
        })
        expect(wrapper.find('.child').exists()).toBe(true)
        await wrapper.setProps({ condition: false })
        expect(wrapper.find('.child').exists()).toBe(false)
    })


    it('from false to true', async () => {
        const wrapper = mount(Component, {
            propsData: {
                condition: false,
            },
        })
        expect(wrapper.find('.child').exists()).toBe(false)
        await wrapper.setProps({ condition: true })
        expect(wrapper.find('.child').exists()).toBe(true)
    })
})
