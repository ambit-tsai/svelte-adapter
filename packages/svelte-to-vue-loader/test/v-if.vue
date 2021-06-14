<template>
    <div>
        <Child v-if="condition" />
    </div>
</template>


<script>
import Child from './v-if.svelte'

export default {
    components: {
        Child,
    },
    props: {
        condition: {
            type: Boolean,
            required: true,
        },
    },
}
</script>
