/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "../components/header"
import { LayoutContextProvider, withLayoutContext } from "./layout-context"

import "./layout.css"

const LayoutView = withLayoutContext(({ siteTitle, layoutState, children }) => (
  <>
    {!layoutState.shouldHideHeader && <Header siteTitle={siteTitle} />}
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0px 1.0875rem 1.45rem`,
        paddingTop: 0,
      }}
    >
      <main>{children}</main>
      {!layoutState.shouldHideFooter && (
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      )}
    </div>
  </>
))

const Layout = props => (
  <LayoutContextProvider>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <LayoutView siteTitle={data.site.siteMetadata.title} {...props} />
      )}
    />
  </LayoutContextProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
