import { Component, createRef, createElement } from 'react'
import ReactDOM from 'react-dom'
import { insert, detach } from 'svelte/internal'


const reactComponentMap = new Map()


export default function wrapAsReactComponent(SvelteComponent) {
    let ReactComponent = reactComponentMap.get(SvelteComponent)
    if (!ReactComponent) {
        ReactComponent = createReactComponent(SvelteComponent)
        reactComponentMap.set(SvelteComponent, ReactComponent)
    }
    return ReactComponent
}


function createReactComponent(SvelteComponent) {
    const { name } = SvelteComponent
    return class extends Component {
        ref = createRef()

        render() {
            return createElement('meta', {
                svelte: name,
                ref: this.ref,
            })
        }

        componentDidMount() {
            const ctx = this
            const props = {
                $$slots: createSvelteSlots(ctx),
                $$scope: {},
            }
            Object.keys(ctx.props).forEach(key => props[key] = ctx.props[key])
            const el = ctx.ref.current
            ctx.__s = new SvelteComponent({
                target: el.parentNode,
                anchor: el,
                props,
            })
        }

        shouldComponentUpdate(nextProps) {
            // TODO: fine-grained update
            const dirtySlots = []
            const dirtyProps = {}
            Object.keys(nextProps).forEach(key => {
                if (key[0] === '$') {
                    dirtySlots.push(key)
                } else if (nextProps[key] !== this.props[key]) {
                    dirtyProps[key] = nextProps[key]
                }
            })
            if (nextProps.children) {
                dirtySlots.push('children')
            }
            this.__s.$set({
                ...dirtyProps,
                $$scope: { dirty: dirtySlots },
            })
            return false
        }

        componentWillUnmount() {
            this.__s.$destroy()
            delete this.__s
        }
    }
}


function createSvelteSlots(inst) {
    const keys = Object.keys(inst.props).filter(key => key[0] === '$')
    if (inst.props.children) {
        keys.push('children')
    }
    const slotFnMap = {}
    for (const key of keys) {
        let slotName = key[0] === '$' ? key.substring(1) : key
        slotFnMap[slotName] = [() => ({
            placeholder: document.createComment(''),
            nodeList: null,
            c() {},
            /**
             * Mount
             */
            m(target, anchor) {
                let slotEls = inst.props[key]
                if (typeof slotEls === 'function') {
                    slotEls = slotEls()
                }
                insert(target, this.placeholder, anchor)
                const fragment = document.createDocumentFragment()
                ReactDOM.render(slotEls, fragment, () => {
                    this.nodeList = [...fragment.childNodes]
                    insert(target, fragment, this.placeholder)
                    detach(this.placeholder)
                })
            },
            /**
             * Update
             */
            p(_, dirty) {
                if (Array.isArray(dirty) && dirty.includes(key) && this.nodeList.length) {
                    const lastNode = this.nodeList[this.nodeList.length - 1]
                    const target = lastNode.parentNode
                    const anchor = lastNode.nextSibling
                    this.d(1)
                    this.m(target, anchor)
                }
            },
            /**
             * Destroy
             * @param {number} detaching 0|1
             */
            d(detaching) {
                if (detaching) {
                    for (const node of this.nodeList) {
                        detach(node)
                    }
                }
            },
        })]
    }
    if (slotFnMap.children && !slotFnMap.$default) {
        // Treat "children" as the default slot
        slotFnMap.default = slotFnMap.children
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
    // for (const key of Object.keys(vm.$listeners)) {
    //     component.$on(key, ({ detail }) => {
    //         vm.$emit(key, detail)
    //     })
    // }
}
