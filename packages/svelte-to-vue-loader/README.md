# Svelte To Vue Loader

|Feature|Support|Note|
|-|:-:|:-:|
|v-bind|✔️||
|v-bind:attr.camel|✔️||
|v-bind:attr.sync|✔️||
|v-on|✔️||
|v-model|✔️||
|v-if|✔️||
|v-else|✔️||
|v-else-if|✔️||
|v-slot|✔️||
|v-once|✔️||
|v-for|➖|Wrap component in `<div>`|
|v-show|➖|Wrap component in `<div>`|
|v-cloak|➖|Wrap component in `<div>`|
|v-pre|❌||


## Usage
```html
<!-- "Parent.vue" -->
<template>
    <div><Child /></div>
</template>

<script>
import Child from './Child.svelte'
export default {
    components: {
        Child,
    },
}
</script>
```
```javascript
// "webpack.config.js"
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader',
                'svelte-to-vue-loader',
            ],
        }],
    },
}
```