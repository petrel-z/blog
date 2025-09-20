// .mts 文件扩展名表示 TypeScript 模块文件，专门用于 ECMAScript 模块
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { La51Plugin } from 'vitepress-plugin-51la'
import { blogTheme } from './blog-theme'


const base = process.env.NODE_ENV === 'production' ? '/blog/' : '/blog/'
export default defineConfig({
  base,
  extends: blogTheme,
  metaChunk: true,
  sitemap: {
    hostname: '140.82.112.3 github.com',
  },
  cleanUrls: false,
  lang: 'zh-cn',
  title: '源境博客',
  description: 'A simple Vitepress theme',
  rewrites: {
    'test/abc/hello/test.md': 'abc/test.md'
  },
  vite: {
    resolve: {
      alias: {
        '@ort/vitepress-theme': path.join(__dirname, '../../src/index.ts')
      }
    },
    plugins: [
      La51Plugin({
        id: '3KOb0Sb7XISO8mCa',
        ck: '3KOb0Sb7XISO8mCa'
      })
    ]
  },
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: '关于',
        link: '/about'
      },
      {
        text: '其他',
        items: [
          {
            text: '开发手册',
            link: 'http://book.somecore.cn'
          },
        ]
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/petrel-z'
      },
    ],
    editLink: {
      pattern:
        'https://github.com/petrel-z/blog/tree/main/docs',
      text: '去 GitHub 上编辑内容'
    },
    lastUpdatedText: '上次更新于',
    outline: {
      level: [2, 3],
      label: '目录'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关推荐'
  },
  lastUpdated: true
})
