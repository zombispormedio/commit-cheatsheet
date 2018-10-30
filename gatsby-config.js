module.exports = {
  siteMetadata: {
    title: "Commit Cheatsheet",
    author: "Xavier Serrano",
    description: "GitEmoji  + Commit convention",
    keywords: ["commit", "emojiss"]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Commit Cheatsheet",
        short_name: "Commit Cheatsheet",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#20287a",
        display: "standalone",
        icon: "static/original.png"
      },
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
    `gatsby-plugin-offline`,
  ]
};
