import { mount } from '@vue/test-utils'
import Component  from './v-once.vue'

describe('v-once', () => {
    it('v-once', async () => {
        const wrapper = mount(Component, {
            propsData: {
                value: 1,
            },
        })
        expect(wrapper.find('.value').text()).toBe('1')
        await wrapper.setProps({ value: 2 })
        expect(wrapper.props().value).toBe(2)
        expect(wrapper.find('.value').text()).toBe('1')
    })
})
