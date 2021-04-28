import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/Header/Header';
import AddPostForm from '../../components/AddPostForm/AddPostForm'
import PostFeed from '../../components/PostFeed/PostFeed'
import * as postsApi from '../../utils/post-api.js'
import * as likesApi from '../../utils/likesServices';

import { Grid } from 'semantic-ui-react'

export default function Feed({ user, handleLogout }) {

    const [posts, setPosts] = useState([]);

    // Whereever your state is you'll probably 
    // have an api function defined in the same component that will end updating the state

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId)
            console.log(data, ' response from addLike')
            getPosts() // get the updated posts
        } catch (err) {
            console.log(err)
        }
    }

    async function removeLike(likeId) {
        try {
            const data = await likesApi.removeLike(likeId);
            console.log(data, ' response from removeLike')
            getPosts()
        } catch (err) {
            console.log(err)
        }
    }


    async function handleAddPost(post) {
        console.log('handle add Post')
        try {

            const data = await postsApi.create(post)
            console.log(data, ' the response from the create route')

            setPosts(posts => [data.post, ...posts])

        } catch (err) {
            console.log(err)
        }
    }

    // async function removeThePost(post) {
    //     try {
    //         await postsApi.removePost(post)
    //         getPosts()
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const getDeletePost = (post) => {

    //     removeThePost(post)
    // }

    async function getPosts() {

        try {
            const data = await postsApi.getAll();
            setPosts([...data.posts])
        } catch (err) {
            console.log(err, ' this is the error')
        }
    }

    useEffect(() => {
        getPosts()
    }, [])



    return (
        <Grid centered >
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddPostForm handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PostFeed
                        // getDeletePost={getDeletePost}
                        user={user}
                        posts={posts}
                        numPhotosCol={1}
                        isProfile={false}
                        addLike={addLike}
                        removeLike={removeLike}
                        setPosts={setPosts}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}