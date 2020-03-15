import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import { connect } from 'react-redux'
import Router from 'next/router'
import Toolbar from '../../../components/toolbar'
import Layout from '../../../components/layout'

const CreateArticle = props => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [tags, setTags] = React.useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/admin/article/create', {
      
      
        title,
        content,
        tags : tags.split(',').map(x=>x.trim())
    },{
      headers: {
        Authorization: `bearer ${props.jwt}`
      },
    }).then(response => {
      if(response.data.status) Router.push('/admin')
    })
    return false
  }

  return (
    <>
      <Head>
        <title>Web Content Title</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
      </Head>
      <Toolbar />
      <Layout className="container">
        <h1>Create Article</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2">Title</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                onChange={e => setTitle(e.target.value)}
                value={title}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">Tags</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                onChange={e => setTags(e.target.value)}
                value={tags}
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">Content</label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                rows="12"
                onChange={e => setContent(e.target.value)}
                value={content}
              >
              </textarea>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  )
}

const mapStateToProps = state => ({
  jwt : state.jwt
})

export default connect(mapStateToProps)(CreateArticle)
