import React from 'react';
import { Card } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';


export default function PostFeed({ posts, numPhotosCol, isProfile, addLike, removeLike, user, setPosts, deletePost }) {



    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>

            {posts.reverse().map((post) => {
                return (
                    <PostCard
                        // getDeletePost={getDeletePost}
                        user={user}
                        post={post}
                        posts={posts}
                        key={post._id}
                        isProfile={isProfile}
                        addLike={addLike}
                        removeLike={removeLike}
                        setPosts={setPosts}
                        deletePost={deletePost}

                    />
                )
            })}
        </Card.Group>

    )
}