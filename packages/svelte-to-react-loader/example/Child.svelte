<b class="value">{ value }</b>
<slot/>
<b>===</b>
<slot name="slot01" />
~~~


<script>
    import { createEventDispatcher } from 'svelte'
    export let value

    const dispatch = createEventDispatcher()
</script>
