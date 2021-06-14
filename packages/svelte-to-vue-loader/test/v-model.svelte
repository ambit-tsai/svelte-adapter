<b class="value">{value}</b>

<button class="op" on:click={() => dispatch('input', 2)} />


<script>
    import { createEventDispatcher } from 'svelte'
    export let value

    const dispatch = createEventDispatcher()
</script>
