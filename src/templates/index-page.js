import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
// import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll/BlogRoll";
import MainCarrousel from "../components/MainCarrousel/MainCarrousel";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  slider,
}) => {

  return (
    <div data-aos="fade-up" className="index">
      <MainCarrousel slider={slider}/>
      <section className="mid-section section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="content">
                    <div 
                    data-aos="fade-up" 
                    className="tile is-justify-content-center">
                      <h1 className="title has-text-centered">{mainpitch.title}</h1>
                    </div>
                    <div
                    data-aos="fade-up" 
                    className="tile is-flex-direction-column is-justify-content-center is-align-items-center">
                      <h3 className="subtitle has-text-centered">{mainpitch.description}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                  {/* <Features gridItems={intro.blurbs} />
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/products">
                        See all products
                      </Link>
                    </div>
                  </div> */}
                  <div 
                  data-aos="fade-up" 
                  className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2 has-text-centered">
                      {heading}
                    </h3>
                    <BlogRoll />
                    <div className="index-more">
                      <button className="btn" to="/blog">
                        Descubre más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  slider: PropTypes.array
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        slider={frontmatter.slider}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        slider {
          title
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          video {
            publicURL
          }
          subheading
          youtube
        }
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
