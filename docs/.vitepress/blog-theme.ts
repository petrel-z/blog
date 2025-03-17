import type { Theme } from '@ort/vitepress-theme'
import { getThemeConfig } from '@ort/vitepress-theme/node'
import { themeEN } from './locales/en'

const baseUrl = 'https://yuanjingteam.github.io'
const RSS: Theme.RSSOptions = {
  title: '源境博客',
  baseUrl,
  copyright: '源境博客',
  description: 'powered by vitepress'
}

export const blogTheme = getThemeConfig({
  locales: {
    en: themeEN
  },
  // formatShowDate: {
  //   justNow: '不久前',
  //   minutesAgo: ' minutes ago',
  // },
  search: {
    pageResultCount: 5,
    btnPlaceholder: '搜索',
    placeholder: '搜索文章',
    emptyText: '没有找到相关文章',
    heading: '结果数: {{searchResult}} 条。',
    toSelect: '选择',
    toClose: '关闭',
    toNavigate: '移动',
    searchBy: 'Powered by',
    locales: {
      en: {
        btnPlaceholder: 'Search',
        placeholder: 'Search Docs',
        emptyText: 'No results found',
        heading: 'Total: {{searchResult}} search results.',
        toSelect: 'to select',
        toClose: 'to close',
        toNavigate: 'to navigate',
        searchBy: 'Search by',
      }
    }
  },
  // 图表支持
  mermaid: true,
  imageStyle: {
    coverPreview: [
      // 七牛云
      {
        rule: '//qiniu.somecore.cn',
        suffix: '~cover.webp'
      },
      // 又拍云CDN
      {
        rule: '//cdn.upyun.somecore.cn',
        suffix: '-cover'
      }
    ]
  },
  RSS,
  authorList: [
    {
      nickname: '源境',
      url: '/aboutme.html',
      des: '源启未来，境无边界'
    }
  ],
  recommend: {
    nextText: '下一页',
    sort(a, b) {
      return +new Date(b.meta.date) - +new Date(a.meta.date)
    },
  },
  friend: [
    {
      nickname: '源境',
      des: '源启未来，境无边界',
      avatar:
        'https://avatars.githubusercontent.com/u/28818575?s=200&v=4',
      url: ''
    },
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.dev/'
    }
  ],
  // 文章默认作者
  author: '源境',
  // 评论
  comment: {
    type: 'giscus',
    options: {
      repo: 'yuanjingteam/blog',
      repoId: 'R_kgDONUfp6g',
      category: 'Announcements',
      categoryId: 'DIC_kwDONUfp6s4CklcG',
      inputPosition: 'top',
      loading: 'lazy',
      mapping: 'title',
      lang: 'zh-CN',
    },
  },
  // buttonAfterArticle: {
  //   openTitle: '投"币"支持',
  //   closeTitle: '下次一定',
  //   content: '<img src="">',
  //   icon: 'wechatPay',
  // },
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇公众号👇' },
  //     {
  //       type: 'image',
  //       src: 'xxxx/qrcode.png'
  //     },
  //     {
  //       type: 'text',
  //       content: '欢迎大家关注公众号'
  //     },
  //     {
  //       type: 'button',
  //       content: '作者博客',
  //       link: ''
  //     }
  //   ],
  //   locales: {
  //     en: {
  //       title: 'Announcement',
  //       body: [
  //         { type: 'text', content: '👇 Wechat 👇' },
  //         {
  //           type: 'image',
  //           src: ''
  //         },
  //         {
  //           type: 'button',
  //           content: 'Author Blog',
  //           link: ''
  //         },
  //       ]
  //     }
  //   }
  // },
  footer: {
    copyright: 'Power by vitepress | 源境',
    icpRecord: {
      name: 'ICP备xxxxx号',
      link: 'https://beian.miit.gov.cn/'
    },
    securityRecord: {
      name: '公网安备xxxxx',
      link: 'https://www.beian.gov.cn/portal/index.do'
    }
  }
})
