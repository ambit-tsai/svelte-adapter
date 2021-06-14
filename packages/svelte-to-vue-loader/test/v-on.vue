<template>
    <div v-if="example === 'method handler'">
        <Child v-on:event1="updateValue" />
    </div>

    <div v-else-if="example === 'dynamic event'">
        <Child v-on:[key]="updateValue" />
    </div>

    <div v-else-if="example === 'inline statement'">
        <Child v-on:event1="val => value = val" />
    </div>

    <div v-else-if="example === 'shorthand'">
        <Child @event1="updateValue" />
    </div>

    <div v-else-if="example === 'shorthand dynamic event'">
        <Child @[key]="updateValue" />
    </div>

    <div v-else-if="example === 'object syntax'">
        <Child v-on="{
            event1: updateValue,
            event2: updateValue,
        }" />
    </div>
</template>


<script>
import Child from './v-on.svelte'

export default {
    components: {
        Child,
    },
    props: {
        example: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            value: null,
            key: 'event1',
        }
    },
    methods: {
        updateValue(val) {
            this.value = val
        },
    },
}
</script>
