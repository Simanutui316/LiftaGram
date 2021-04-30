import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader, Button, Transition, Form } from 'semantic-ui-react'
import userService from '../../utils/userService';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from '../../components/PostFeed/PostFeed';
import PageHeader from '../../components/Header/Header';
import SignUpPage from '../SignupPage/SignupPage';
import UpdateProfilePhotoForm from '../../components/UpdateProfilePhoto/UpdateProfilePhoto';
import * as likesApi from '../../utils/likesServices';
import * as postApi from '../../utils/post-api';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


export default function ProfilePage({ user, handleLogout, handleSubmit, isProfile, ErrorMessage, handleChange, handleSignUpOrLogin, handleUpdateProfilePhoto }) {

    const [visible, setVisible] = useState(false)
    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        username: user.username,
        bio: user.bio
        // photoUrl: user.photoUrl
    });

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const history = useHistory()
    const location = useLocation()
    // const i
    console.log(location)

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId)
            console.log(data, ' response from addLike')
            getProfile()
        } catch (err) {
            console.log(err)
        }
    }

    async function removeLike(likeId) {
        try {
            const data = await likesApi.removeLike(likeId);
            console.log(data, ' response from removeLike')
            getProfile()
        } catch (err) {
            console.log(err)
        }
    }

    async function handleUpdateProfilePhoto(photo) {
        const updatedUser = await userService.updateProfilePhoto(photo);
        handleSignUpOrLogin()
        console.log(updatedUser)
    }


    async function getProfile() {

        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data)
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }



    function handleEditClick() {

        setVisible(true)
    }



    // function handleFileInput(e) {
    //     setSelectedFile(e.target.files[0])

    // }

    async function deletePost(postID) {
        try {
            await postApi.deletePost(postID)
            const newPosts = posts.filter(post => post._id !== postID)
            setPosts(newPosts)
        } catch (err) {
            console.log(err)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await userService.update(state);
            handleSignUpOrLogin()
            setVisible(false)
            // history.push('/')
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    useEffect(() => {
        getProfile()

    }, [location.pathname.substring(1), user])



    return (

        <>
            { loading ?
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >

                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Loader size='large' active>Loading</Loader>

                    </Grid.Column>

                </Grid>
                :
                <Grid className='profile-feed'>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader user={user} handleLogout={handleLogout} />

                            <Grid.Row>
                                {/* : '' */}
                                {/* {isID = { true} ? */}
                                <Grid.Column>
                                    <UpdateProfilePhotoForm
                                        handleUpdateProfilePhoto={handleUpdateProfilePhoto}
                                    />
                                </Grid.Column>
                                    : ''
                                }
                            </Grid.Row>
                            <Button onClick={handleEditClick}>Edit Profile</Button>

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ProfileBio user={profileUser} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Transition visible={visible} animation='fly up' duration={500}>
                            <Segment>
                                <Form autoComplete="off" onSubmit={handleSubmit}>
                                    <Segment className="profile-edit" stacked>
                                        <Form.Input
                                            name="username"
                                            placeholder="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            required
                                        />


                                        <Form.Input
                                            className="total"
                                            name="total"
                                            value={user.total}
                                            placeholder="Gym Total?"
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.TextArea label='bio' placeholder='Do you even lift bro...' name="bio" onChange={handleChange} />
                                        {/* <Form.Field>
                                            <Form.Input
                                                type="file"
                                                name="photo"
                                                placeholder="upload image"
                                                onChange={handleFileInput}
                                            />
                                        </Form.Field> */}
                                        <Button
                                            type="submit"
                                            className="btn"
                                        >
                                            Update Profile
                                </Button>
                                    </Segment>
                                    {error ? <ErrorMessage error={error} /> : null}
                                </Form>
                            </Segment>
                        </Transition>
                        <Grid.Column style={{ maxWidth: 750 }}>
                            <PostFeed
                                isProfile={true}
                                posts={posts}
                                bio={user.bio}
                                numPhotosCol={3}
                                user={user}
                                addLike={addLike}
                                removeLike={removeLike}
                                deletePost={deletePost}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            }
        </>

    )
}
