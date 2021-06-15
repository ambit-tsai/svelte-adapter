import {
    insert,
    detach,
} from 'svelte/internal'


const vueComponentMap = new Map()


export default function wrapAsVueComponent(SvelteComponent) {
    let vueComponent = vueComponentMap.get(SvelteComponent)
    if (!vueComponent) {
        vueComponent = createVueComponent(SvelteComponent)
        vueComponentMap.set(SvelteComponent, vueComponent)
    }
    return vueComponent
}


function createVueComponent(SvelteComponent) {
    const { name } = SvelteComponent
    const inst = new SvelteComponent({})
    const props = Object.keys(inst.$$.props)
    return {
        name,
        props,
        render() {
            return this._vnode || this._e(name)     // create a comment VNode 
        },
        mounted() {
            const vm = this
            const props = {
                $$slots: createSvelteSlots(vm),
                $$scope: {},
            }
            const { propsData } = vm.$options
            if (propsData) {
                Object.keys(propsData).forEach(key => props[key] = propsData[key])
            }
            const component = new SvelteComponent({
                target: vm.$el.parentNode,
                anchor: vm.$el,
                props,
            })
            vm.__s = component
            watchProps(vm, component)
            addEventListeners(vm, component)
        },
        updated() {
            this.__s.$set({ $$scope: { dirty: this } })
        },
        beforeDestroy() {
            this.__s.$destroy()
            delete this.__s
        },
    }
}


function createSvelteSlots(vm) {
    const slotFnMap = {}
    for (const key in vm.$slots) {
        slotFnMap[key] = [() => ({
            _root: null,
            c() {},
            /**
             * Mount
             */
            m(target, anchor) {
                const root = vm._e()            // create a VNode as root
                root.elm = target
                root.children = vm.$slots[key]
                this._root = root
                for (const vnode of root.children) {
                    vm.__patch__(null, vnode)   // create element by VNode
                    insert(target, vnode.elm, anchor)
                }
            },
            /**
             * Update
             */
            p(_, dirty) {
                if (dirty === vm) {
                    const newRoot = vm._e()             // create a new root
                    newRoot.children = vm.$slots[key]
                    vm.__patch__(this._root, newRoot)   // diff and update
                    this._root = newRoot
                }
            },
            /**
             * Destroy
             * @param {number} detaching 0|1
             */
            d(detaching) {
                if (detaching) {
                    for (const { elm } of this._root.children) {
                        detach(elm)
                    }
                }
            },
        })]
    }
    return slotFnMap
}


function watchProps(vm, component) {
    for (const key of Object.keys(vm.$props)) {
        vm.$watch(key, val => {
            component.$set({ [key]: val })
        })
    }
}


function addEventListeners(vm, component) {
    for (const key of Object.keys(vm.$listeners)) {
        component.$on(key, ({ detail }) => {
            vm.$emit(key, detail)
        })
    }
}
