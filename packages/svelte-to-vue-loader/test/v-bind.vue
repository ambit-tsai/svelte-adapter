<template>
    <div v-if="example === 'bind an attribute'">
        <Child v-bind:value1="value" />
    </div>

    <div v-else-if="example === 'dynamic attribute name'">
        <Child v-bind:[dynamicKey]="value" />
    </div>

    <div v-else-if="example === 'shorthand'">
        <Child :value1="value" />
    </div>

    <div v-else-if="example === 'shorthand dynamic attribute name'">
        <Child :[dynamicKey]="value" />
    </div>

    <div v-else-if="example === 'binding an object of attributes'">
        <Child v-bind="{
            value1: 1,
            value2: 2,
        }" />
    </div>

    <div v-else-if="example === '.camel'">
        <Child :kebab-case.camel="value" />
    </div>

    <div v-else-if="example === '.sync'">
        <Child :value1.sync="syncValue" />
    </div>
</template>


<script>
import Child from './v-bind.svelte'

export default {
    components: {
        Child,
    },
    props: [
        'example',
        'value',
        'dynamicKey',
    ],
    data() {
        return {
            syncValue: this.value,
        }
    }
}
</script>
