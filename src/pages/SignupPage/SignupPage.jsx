import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';


export default function SignUpPage(props) {
    const [invalidForm, setValidForm] = useState(false)
    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        username: '',
        email: '',
        total: '',
        password: '',
        passwordConf: '',
        bio: ''
    });

    const history = useHistory()

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        // add this later
        e.preventDefault();

        // Photos have to be sent over as FormData
        // They send over the form in multiparts (multipe requests to the server)

        const formData = new FormData();
        formData.append('photo', selectedFile);


        // generating rest of form data by looping over the state object!
        for (let key in state) {
            formData.append(key, state[key])
        }
        //fyi if you log out formData you won't see anything you have to use the folllowing

        // Display the key/value pairs
        // for (var pair of formData.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]); 
        // }

        // SO now we have are data prepared to send over in our formData object
        try {
            // refere to the utils/userService, to look at the signup fetch function
            await userService.signup(formData);
            // setTheUser in our app
            props.handleSignUpOrLogin() // gets the token from localstorage and updates the user state in our app.js
            // with the correct user object from the current token
            // then route to the homepage
            history.push('/') // defined above from react-router-dom
            // after this we can go whereever

        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }

    }

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0])
    }


    return (
        <>
            <Grid className='container-login' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='violet' textAlign='center'>
                        <Image src='https://i.imgur.com/Bo1xQk7.png' /> Sign Up
              </Header>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                name="username"
                                placeholder="username"
                                value={state.username}
                                onChange={handleChange}
                                required
                            />
                            <Form.Input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Input
                                name="password"
                                type="password"
                                placeholder="password"
                                value={state.password}
                                onChange={handleChange}
                                required
                            />
                            <Form.Input
                                name="passwordConf"
                                type="password"
                                placeholder="Confirm Password"
                                value={state.passwordConf}
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
                                className="btn violet"
                                disabled={invalidForm}
                            >
                                Signup
                  </Button>
                        </Segment>
                        {error ? <ErrorMessage error={error} /> : null}
                    </Form>

                </Grid.Column>
            </Grid>
        </>
    );

}
