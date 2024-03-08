import Styles from './Posts.module.css'

//hooks
import {useParams} from "react-router-dom"
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Posts = () => {
    const {id} = useParams()
    const {document: post, loading} = useFetchDocument("posts", id)

  return (
    <div className={Styles.post_container}>
        {loading && <p>Carregando post...</p>}
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <p>{post.body}</p>
                <h3>Este post trata sobre:</h3>
                <div className={Styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Posts