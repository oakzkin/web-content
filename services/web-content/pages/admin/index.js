import React from 'react'
import { connect } from 'react-redux'
import Toolbar from '../../components/toolbar'
import cookie  from 'cookie'
import axios from 'axios'

import Layout from '../../components/layout'
import styled from 'styled-components'
import ArticleCard from '../../components/article-card'


const Heading = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "prompt", "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`



const AdminIndex = (props) => {
  
  const articles = props.articles || []
  console.log("articles", articles)
  return (
    <>
    <Toolbar />
    <Layout>
      <Heading>Articles</Heading>
      {articles.map(article => <ArticleCard key={article.slug} data={article} />)}
    </Layout>
    </>
  )
}

AdminIndex.getInitialProps = ({ req }) => {
  let jwt = ''
  if (req && req.headers) {
    const cookies = cookie.parse(req.headers.cookie)
    jwt = JSON.parse(cookies.jwt).jwt
  }
  

  return axios.get('http://localhost:3000/api/admin/article', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }).then(res => {
    return {
      articles: res.data.data
    }
  })
}

const mapStateToProps = (state) => ({
  jwt: state.jwt
})

const mapActionToProps = {

}

export default connect(mapStateToProps, mapActionToProps)(AdminIndex)