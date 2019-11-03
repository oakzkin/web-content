import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Toolbar from '../../components/toolbar'


const Article = () => {

  const router = useRouter()
  const { id } = router.query
  return (
    <Fragment>
      <Toolbar title="article page" />
      <div>article page id = {id}</div>
    </Fragment>
  )
}



export default Article