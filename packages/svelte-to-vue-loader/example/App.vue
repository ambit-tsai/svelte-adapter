<template>
    <div>
        <Child v-model="value" />
    </div>
</template>


<script>
import Child from './Child.svelte'

export default {
    components: {
        Child,
    },
    data() {
        return {
            value: 1,
        }
    },
}
</script>
