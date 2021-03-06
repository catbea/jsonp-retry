import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import fs from 'fs'

const babelConfig = JSON.parse(String(fs.readFileSync('.babelrc')))

const baseConfig = {
  name: 'jsonp',
  input: 'index.js',
  output: {
    file: 'dist/jsonp.dev.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    resolve({
      main: true,
      jsnext: true
    }),
    commonjs(),
    babel({
      sourceMap: true,
      babelrc: false,
      presets: [
        ['es2015', {
          modules: false,
          loose: true
        }],
        'stage-0'
      ],
      plugins: babelConfig.plugins,
      exclude: 'node_modules/**'
    })
  ]
}

const esConfig = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    sourcemap: true,
    format: 'es',
    file: 'dist/jsonp.esm.js'
  })
})

export default [baseConfig, esConfig]
