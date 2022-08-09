import rss from '@astrojs/rss'

export const get = () => rss({

    title: 'Tiny Rocket',
    description: 'Tiny Rocket’s ExampleBlog',
    
    site: import.meta.env.SITE,
    items: import.meta.glob('./blog/**/*.mdx'),
  })
