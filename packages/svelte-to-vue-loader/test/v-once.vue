<template>
    <div>
        <Child v-once :value="value" />
    </div>
</template>


<script>
import Child from './v-once.svelte'

export default {
    components: {
        Child,
    },
    props: ['value'],
}
</script>
