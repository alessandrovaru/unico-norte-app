import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            subtitle
            description
            image
            siteUrl
            developerName
          }
        } 
      }
    `
  )
  return site.siteMetadata
}

export default useSiteMetadata
