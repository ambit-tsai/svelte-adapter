let traverse, parser, generator
try {
    traverse = require('@babel/traverse')
    parser = require('@babel/parser')
    generator = require('@babel/generator')
} catch (error) {
    try {
        traverse = require('babel-traverse')
        parser = require('babylon')
        generator = require('babel-generator')
    } catch (e) {
        throw error
    }
}
exports.traverse = traverse
exports.parser = parser
exports.generator = generator
