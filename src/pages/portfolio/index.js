import * as React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/308672193_175537458340137_291755176686371964_n-2-.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              backgroundColor: "#080808",
              color: "white",
              padding: "1rem",
            }}
          >
            Porfolio
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
