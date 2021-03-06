import React from 'react'
import Helmet from 'react-helmet'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton';

const handleClick = url => {
  window.open(url)
}

const PostBackground = ({ color }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
      backgroundColor: color,
      height: 300,
      width: '100%',
    }}
  />
)

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <div>
      <PostBackground color="#FF822E" />
      <Paper zDepth={1} className="post">
        <h1>{post.frontmatter.title}</h1>
        <div className="chip">
          {post.frontmatter.technologies.split(', ').map((tech, i) => (
            <Chip style={{ margin: 4 }} key={i}>
              {tech}
            </Chip>
          ))}
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="actions">
          {post.frontmatter.source ? (
            <RaisedButton
              label="Github"
              className="btn"
              onClick={() => handleClick(post.frontmatter.source)}
            />
          ) : (
              <span />
            )}
          {post.frontmatter.link ? (
            <RaisedButton
              label="Open"
              className="btn"
              onClick={() => handleClick(post.frontmatter.link)}
            />
          ) : (
              <span />
            )}
        </div>
      </Paper>
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        technologies
        source
        link
      }
    }
  }
`
