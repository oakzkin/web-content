import React from 'react'


// const react = require('react')

const Toolbar = (props) => {
  return(
    <nav>This is toolbar [page: {props.title || ''}]</nav>
  )
}

export default Toolbar