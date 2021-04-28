import React from 'react';
import { Card } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';


export default function PostFeed({ posts, numPhotosCol, isProfile, addLike, removeLike, user, getDeletePost }) {



    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>

            {posts.map((post) => {
                return (
                    <PostCard
                        getDeletePost={getDeletePost}
                        user={user}
                        post={post}
                        key={post._id}
                        isProfile={isProfile}
                        addLike={addLike}
                        removeLike={removeLike}
                    />
                )
            })}
        </Card.Group>

    )
}