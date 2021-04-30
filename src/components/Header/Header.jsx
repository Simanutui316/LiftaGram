import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';
import { FaDumbbell } from 'react-icons/fa';
// import { BiLogOut } from 'react-icons/bi';


export default function PageHeader({ user, handleLogout }) {
    return (
        // <div color={'black'}>
        <Segment id="header-fixed" inverted>
            <Segment inverted>
                <Header className='logout-icon' as='h2' floated='right'>
                    <Link to="/"><FaDumbbell color='white' size='5vh' /></Link>

                    <Link style={{ color: 'red' }} to='' onClick={handleLogout} className='logout' >Logout</Link>
                </Header>
                <Header as='h2' floated='left'>
                    <Link style={{ color: 'red' }} size='large' to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image>{user.username.toUpperCase()}</Link>
                </Header>
                <Header as='h1' textAlign='center' color='white' dividing>

                    <Link className='liftagram' to="/">Lifta<span className='gram'>Gram</span></Link>


                </Header>
            </Segment>
        </Segment>
        // </div>

    )
}