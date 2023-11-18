import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import './styles.sass'
import VanillaTilt from 'vanilla-tilt';

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
    // Filtrar los posts para incluir solo los que tienen featuredpost como true
    const featuredPosts = data.allMarkdownRemark.edges.filter(({ node: post }) => post.frontmatter.featuredpost === true);
    const options = {
      speed: 1000,
      max: 5
    };
    return (
      <div className="columns is-multiline">
        {featuredPosts.map(({ node: post }) => (
          <Tilt options={options} className="blog-post is-parent column is-6" key={post.id}>
            <article className={`blog-list-item tile is-child box notification is-featured`}>
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <br />
                  <span className="subtitle is-size-5 is-block">
                    {post.frontmatter.subtitle}
                  </span>
                </p>
              </header>
            </article>
          </Tilt>
        ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
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
            filter: { frontmatter: { templateKey: { eq: "blog-post" }, featuredpost: { eq: true } } }
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
