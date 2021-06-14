<b class="value1">{value1}</b>
<b class="value2">{value2}</b>
<b class="kebabCase">{kebabCase}</b>

<button class="sync" on:click={() => dispatch('update:value1', 1)} />


<script>
    export let value1, value2, kebabCase
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>
