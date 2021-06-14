<template>
    <div v-if="example === 'default slot'">
        <Child>1</Child>
    </div>

    <div v-else-if="example === 'named slots'">
        <Child>
            <template v-slot:slot1>1</template>
        </Child>
    </div>

    <div v-else-if="example === 'default slot that receive props'">
        <Child v-slot="value">{{ value }}</Child>
    </div>
</template>


<script>
import Child from './v-slot.svelte'

export default {
    components: {
        Child,
    },
    props: [
        'example',
        'value',
    ],
}
</script>
