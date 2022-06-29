module.exports = {
  title: 'r2coding',
  description: 'build your dream',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  plugins: ['@vuepress/back-to-top'],
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    nav: [
      { text: 'Home', link: '/' },
      //   { text: 'Guide', link: '/guide/' },
      { text: 'Vue', link: '/blog/vue/vue3-setup.md' },
      { text: 'Js', link: '/blog/js/js常见数组方法.md' },
      { text: 'Node', link: '/blog/node/node.md' },
      {
        text: '学习网站',
        items: [
          { text: 'Vue.js中文文档', link: 'https://cn.vuejs.org/v2/guide/', target: '_blank' },
          { text: 'React.js官方文档', link: 'https://reactjs.org/docs/getting-started.html', target: '_blank' },
          { text: 'TypeScript中文网', link: 'https://www.tslang.cn/index.html', target: '_blank' },
          { text: 'Nodejs中文教程文档', link: 'http://nodejs.cn/learn', target: '_blank' },
          {
            text: '微信小程序官方文档',
            link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
            target: '_blank',
          },
        ],
      },
    ],
    sidebar: {
      '/blog/vue/': ['vue3-setup'],
      '/blog/js/': ['js常见数组方法', 'js常见循环遍历方法', 'js浅拷贝和深拷贝'],
    },
  },
}
