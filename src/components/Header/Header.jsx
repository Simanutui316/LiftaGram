import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({ user, handleLogout }) {
    return (
        <Segment clearing>
            <Header as='h2' floated='right'>
                <Link to="/"><Icon name="home"></Icon></Link>
                <Link to='' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h2' floated='left'>
                <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://lh3.googleusercontent.com/wdYQM7xZi04abaCYxIICLSGBF-r5_rtD4BXPQfBteF_nHV_WUcSB6Vz9E3hHyic46Sa2=w300"} avatar></Image></Link>
            </Header>
        </Segment>
    )
}