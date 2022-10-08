import { Suspense } from 'react';
import { Link, useLoaderData, useSearchParams, Await, defer } from 'react-router-dom';
import { BlogFilter } from '../components/BlogFilter';

const Blogpage = () => {
    const {posts} = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get('post') || '';
    const latest = searchParams.has('latest');

    const startsFrom = latest ? 80 : 1;

    return (
        <div>
            <h1>Our news</h1>
            
            <BlogFilter postQuery={postQuery} latest={latest} setSearchParams={setSearchParams} />

            <Link to="/posts/new" style={{margin: '1rem 0', display: 'inline-block'}}>Add new post</Link>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={posts}>
                    {
                        (resolvedPosts) => (<>
                            {
                                resolvedPosts.filter(
                                    post => post.title.includes(postQuery) && post.id >= startsFrom
                                ).map(post => (
                                    <Link key={post.id} to={`/posts/${post.id}`}>
                                        <li>{post.title}</li>
                                    </Link>
                                ))
                            }
                        </>)
                    }
                </Await>
            </Suspense>
        </div>
    )
}

async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')

    return res.json()
}

const blogLoader = async () => {
    // console.log({ request, params })

    return defer({
        posts: getPosts()
    })
}

export {Blogpage, blogLoader}
