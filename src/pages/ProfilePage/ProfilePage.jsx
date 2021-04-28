import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader, Button, Transition, Form } from 'semantic-ui-react'
import userService from '../../utils/userService';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from '../../components/PostFeed/PostFeed';
import PageHeader from '../../components/Header/Header';
import SignupPage from '../SignupPage/SignupPage'
import * as likesApi from '../../utils/likesServices';
import { useLocation } from 'react-router-dom';

export default function ProfilePage({ user, handleLogout, handleSubmit, ErrorMessage }) {

    const [visible, setVisible] = useState(false)
    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        username: user.username,
        bio: user.bio,
        photoUrl: user.photoUrl
    });

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const location = useLocation()
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

        setState()

    }
    function handleFileInput(e) {
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        getProfile()

    }, [location.pathname.substring(1)])



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
                            <Button onClick={handleEditClick}>Edit Profile</Button>

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ProfileBio user={profileUser} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Transition visible={visible} animation='fly left' duration={500}>
                            <Segment>
                                <Form autoComplete="off" onSubmit={handleSubmit}>
                                    <Segment className="profile-edit" stacked>
                                        <Form.Input
                                            name="username"
                                            placeholder="username"
                                            value={state.username}
                                            onChange={handleChange}
                                            required
                                        />


                                        <Form.Input
                                            className="total"
                                            name="total"
                                            value={state.total}
                                            placeholder="Gym Total?"
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.TextArea label='bio' placeholder='Do you even lift bro...' name="bio" onChange={handleChange} />
                                        <Form.Field>
                                            <Form.Input
                                                type="file"
                                                name="photo"
                                                placeholder="upload image"
                                                onChange={handleFileInput}
                                            />
                                        </Form.Field>
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
                            <PostFeed isProfile={true} posts={posts} bio={user.bio} numPhotosCol={3} user={user} addLike={addLike} removeLike={removeLike} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            }
        </>

    )
}
