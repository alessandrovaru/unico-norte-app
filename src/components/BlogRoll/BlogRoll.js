import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import './styles.sass'
import VanillaTilt from 'vanilla-tilt';
import Posts from './Posts'

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    if (!navigator.userAgent.match(/iPhone/i)) {
      VanillaTilt.init(tilt.current, options);
    }
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

class BlogRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    // Filtrar solo los posts con featuredpost igual a true
    const featuredPosts = data.allMarkdownRemark.edges.filter(
      ({ node: post }) => post.frontmatter.featuredpost === true
    );
    const allPosts = data.allMarkdownRemark.edges;

    const options = {
      speed: 1000,
      max: 5
    };

    return (
      <div className="columns is-multiline">
        {window.location.pathname === '/portfolio' ? (
          <Posts 
            posts={allPosts} 
            Tilt={Tilt} 
            options={options} 
            PreviewCompatibleImage={PreviewCompatibleImage} 
            Link={Link} 
          />  
        ) : (
          <Posts 
            posts={featuredPosts} 
            Tilt={Tilt} 
            options={options} 
            PreviewCompatibleImage={PreviewCompatibleImage} 
            Link={Link} 
          />  
        )
        }
      </div>
    )
  }
}

BlogRollTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
              frontmatter: { templateKey: { eq: "blog-post" }}
            }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  subtitle
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} />}
    />
  );
}