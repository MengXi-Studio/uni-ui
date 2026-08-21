import type { RollupOptions } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { terser } from 'terser'

const config: RollupOptions = {
  input: 'src/components/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
      exports: 'named',
      globals: { vue: 'Vue' },
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'MengXiUniUI',
      sourcemap: true,
      exports: 'named',
      globals: { vue: 'Vue' },
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      globals: { vue: 'Vue' },
    },
  ],
  external: ['vue', 'uni-app'],
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true,
      use: ['sass'],
    }),
    copy({
      targets: [
        { src: 'src/components/**/README.md', dest: 'dist/docs/components' },
        { src: '../../README.md', dest: 'dist/' },
      ],
    }),
    process.env.NODE_ENV === 'production' &&
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
  ],
}

export default config