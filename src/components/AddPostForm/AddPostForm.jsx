import React, { useState } from 'react';

import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

export default function AddLiftForm(props) {
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        caption: ''
    })

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0])
    }


    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log('is handleSubmit being called?')

        // Why do we need to create FormData
        // what type of request are we making?
        const formData = new FormData()
        formData.append('photo', selectedFile)
        formData.append('caption', state.caption)

        // Have to submit the form now! We need a function!
        props.handleAddPost(formData)
    }


    return (

        <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment>

                    <Form autoComplete="off" onSubmit={handleSubmit}>

                        <Form.Input
                            className="form-control"
                            name="caption"
                            value={state.caption}
                            placeholder="How much can you lift?"
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            className="form-control"
                            type="file"
                            name="photo"
                            placeholder="upload image"
                            onChange={handleFileInput}
                        />
                        <Button
                            type="submit"
                            className="btn violet"
                        >
                            Show Off!
              </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>

    );
}