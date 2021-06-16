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
            vm.observer = observeDomMutation(vm, component)
        },
        updated() {
            // TODO: fine-grained update
            this.__s.$set({ $$scope: { dirty: this } })
        },
        beforeDestroy() {
            const vm = this
            if (vm.observer) {
                vm.observer.disconnect()
                delete vm.observer
            }
            vm.__s.$destroy()
            delete vm.__s
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
                const fragment = document.createDocumentFragment()
                for (const vnode of root.children) {
                    vm.__patch__(null, vnode)   // create element by VNode
                    fragment.appendChild(vnode.elm)
                }
                insert(target, fragment, anchor)
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


function observeDomMutation({ $el }, { $$ }) {
    if (!window.MutationObserver) {
        console.warn('[svelte-to-vue-loader] you need a MutationObserver polyfill')
        return
    }
    const observer = new MutationObserver(records => {
        const { parentNode } = $el
        if (records.length && records[0].target !== parentNode) {
            observer.disconnect()
            $$.fragment.m(parentNode, $el)
            observer.observe(parentNode, {
                childList: true,
            })
            return
        }
        for (const { addedNodes } of records) {
            for (let i = addedNodes.length - 1; i >= 0; --i) {
                if (addedNodes[i] === $el) {
                    $$.fragment.m(parentNode, $el)
                    return
                }
            }
        }
    })
    observer.observe($el.parentNode, {
        childList: true,
    })
    return observer
}
