# Svelte To React Loader

|Feature|Support|Note|
|-|:-:|:-:|
|Props|✔️||
|Events|✔️||
|Refs|✔️||
|Render Props|✔️|Render props match Svelte's slots|


## Relation between Render Props and Slots
|Render Props|Slots|Note|
|:-:|:-:|:-:|
|children|children||
|children|default|When `$default` does not exist|
|$children|children||
|$default|default||
|$slotName|slotName||


## Usage
```javascript
import Child from './Child.svelte'

export default class Parent extends React.Component {
    render() {
        return <div>
            <Child
                value={1}
                onClick={() => {}}
                $slot01={() => <i>Hello</i>}
            >
                <b>Default Slot</b>
            </Child>
        </div>
    }
}
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