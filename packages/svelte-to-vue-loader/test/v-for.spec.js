import { mount } from '@vue/test-utils'
import Component  from './v-for.vue'

describe('v-for', () => {
    it('iterate through an array', () => {
        const wrapper = mount(Component, {
            propsData: {
                array: [1, 2, 3],
            },
        })
        expect(wrapper.text()).toBe('123')
    })


    it.skip('reuse element', async () => {
        const wrapper = mount(Component, {
            propsData: {
                array: [1, 2, 3],
            },
        })
        expect(wrapper.text()).toBe('123')
        await wrapper.setProps({ array: [2, 3, 1] })
        expect(wrapper.text()).toBe('231')
    })
})
