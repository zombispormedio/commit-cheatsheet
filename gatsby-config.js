module.exports = {
  siteMetadata: {
    title: "Commit Cheatsheet",
    author: "Xavier Serrano",
    description: "GitEmoji  + Commit convention",
    keywords: ["commit", "emojiss"],
    siteUrl: `https://commit-cheatsheet.surge.sh`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Commit Cheatsheet",
        short_name: "Commits",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#20287a",
        display: "standalone",
        icon: "static/original.png"
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/theme/typography.js`
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_ID
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => ({
            url: site.siteMetadata.siteUrl + edge.node.path,
            changefreq: `weekly`,
            priority: 0.7
          }))
      }
    },
    `gatsby-plugin-offline`
  ]
};
