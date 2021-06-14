<template>
    <div>
        <Child v-model="value" />
    </div>
</template>


<script>
import Child from './v-model.svelte'

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
