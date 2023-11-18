import React from 'react'

const Posts = (props) => {
  const {posts, Tilt, options, PreviewCompatibleImage, Link } = props;

  
  return (
    <>
      {posts.map(({ node: post }) => (
        <Tilt options={options} className="blog-post is-parent column is-6" key={post.id}>
          <article
            className={`blog-list-item tile is-child box notification ${
              post.frontmatter.featuredpost ? 'is-featured' : ''
            }`}
          >
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
                  className="title has-text-primary is-size-4 is-uppercase"
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
    </>
  )
}

export default Posts