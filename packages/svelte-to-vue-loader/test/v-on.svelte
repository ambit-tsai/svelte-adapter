<button class="op1" on:click={() => dispatch('event1', 1)} />
<button class="op2" on:click={() => dispatch('event2', 2)} />


<script>
    import { createEventDispatcher } from 'svelte'
    
    const dispatch = createEventDispatcher()
</script>
