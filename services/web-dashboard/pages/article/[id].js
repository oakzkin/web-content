import { useRouter } from 'next/router'


const Article = () => {

  const router = useRouter()
  const { id } = router.query
  return (
    <div>article page id = {id}</div>
  )
}



export default Article