// tsup配置文件。tsup是TypeScript打包工具，类似于 webpack 或 rollup，但更专注于 TypeScript 项目。
import path from 'path'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/node.ts'],
  format: ['cjs', 'esm'],
  outDir: path.resolve(__dirname, './'),
  dts: true, // 是否生成类型声明文件
  external: ['vitepress'], // 指定不打包的外部依赖。
  noExternal: ['vitepress-plugin-tabs'], // 指定不打包的内部依赖。
  silent: true // 是否在打包过程中不输出任何信息。
})
