const path = require('path')
const {
    parser: { parse },
    traverse: { default: traverse },
    generator: { default: generate },
} = require('./babel-libs')


const SVELTE_RE = /[\.\?&]svelte/
const HELPERS_PATH = path.resolve(__dirname, 'helpers.js').replace(/\\/g, '\\\\')


module.exports = function (content, rawSourceMap) {
    let isModified = false
    const ast = parse(content, {
        sourceType: 'module',
    })
    traverse(ast, {
        ImportDeclaration(path) {
            const { node } = path
            if (!SVELTE_RE.test(node.source?.value)) {
                return
            }
            const { specifiers } = node
            for (let i = specifiers.length - 1; i >= 0; --i) {
                const specifierNode = specifiers[i]
                if (specifierNode.type !== 'ImportDefaultSpecifier') {
                    continue
                }
                const { name } = specifierNode.local
                const { name: Component } = path.scope.generateUidIdentifier()
                specifierNode.local.name = Component
                
                const { name: wrapFn } = path.scope.generateUidIdentifier()
                const tempAst = parse(
                    `import ${wrapFn} from '${HELPERS_PATH}';`+
                    `const ${name} = ${wrapFn}(${Component});`,
                    { sourceType: 'module' }
                )
                path.insertAfter(tempAst.program.body)
                isModified = true
                break
            }
        },
        // NOTE: Is it necessary to handle "require('xxx')" ?
        // CallExpression() {},
    })
    // TODO: adjust source map
    return isModified ? generate(ast).code : content
}
