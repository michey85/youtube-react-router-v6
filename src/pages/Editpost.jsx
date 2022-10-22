import { useActionData, useLoaderData, useNavigation, /*useParams*/ } from 'react-router-dom'
import UpdatePost from '../components/UpdatePost';

const Editpost = () => {
    // const {id} = useParams();
    const data = useActionData()
    const { post, id } = useLoaderData()
    const navigation = useNavigation()

    return (
        <div>
            {data?.message && <div style={{color: 'blue'}}>{data.message}</div>}
            <h1>Edit post {id}</h1>
            <UpdatePost {...post} submitting={navigation.state === 'submitting'} />
        </div>
    )
}

const updatePost = async (post) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.get('id')}`, {
        method: 'PUT',
        body: post
    })
    return res.json()
}

const updatePostAction = async ({request}) => {
    const formData = await request.formData();

    if (!formData.get('title') || !formData.get('body')) {
        return {message: 'All field are required!!!'}
    }

    const updatedPost = await updatePost(formData)

    return { message: `Post ${updatedPost.id} was successfully updated` }
}

export { Editpost, updatePostAction }
