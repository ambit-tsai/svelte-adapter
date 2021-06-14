<template>
    <div>
        <Child v-for="item in array" :key="item" :value="item" />
    </div>
</template>


<script>
import Child from './v-for.svelte'

export default {
    components: {
        Child,
    },
    props: {
        array: {
            type: Array,
            required: true,
        },
    },
}
</script>
