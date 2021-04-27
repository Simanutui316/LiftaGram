import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { GiWeightLiftingUp } from 'react-icons/gi';


function PostCard({ post, isProfile, addLike, removeLike, user }) {

    // as the logged in the user when I add a like I want the heart to turn red
    // find out if the logged in user has liked the card

    const likedIndexNumber = post.likes.findIndex(like => like.username === user.username);
    // if one of the likes in post.likes is has the same username as are logged in user
    // it will return the index of that particular object in the post.likes array
    // if not it will return -1

    const clickHandler = likedIndexNumber > - 1 ? () => removeLike(post.likes[likedIndexNumber]._id) : () => addLike(post._id);
    const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
    // as the logged in the user when I click on the heart and it is red I want 
    // to remove the like and turn heart grey


    return (
        <Card key={post._id}>
            {isProfile ? ''
                :
                <Card.Content textAlign='left'>
                    <Link style={{ color: 'white', }} to={`/${post.user}`}><Image
                        floated='left'
                        size='large'
                        avatar
                        src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                    /></Link>
                    <Card.Header floated="right">{post.user.username.toUpperCase()}</Card.Header>
                </Card.Content>

            }
            <Image src={`${post.photoUrl}`} wrapped ui={false} />
            <Card.Content>
                <Card.Description>
                    {post.caption}
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign={'right'}>
                {/* <Icon name={'GiWeightLiftingUp'} size='large' onClick={clickHandler} color={likeColor} /> */}
                <GiWeightLiftingUp color={likeColor} onClick={clickHandler} size='2vh' />
                {post.likes.length} Likes
            </Card.Content>
        </Card>
    );
}

export default PostCard;