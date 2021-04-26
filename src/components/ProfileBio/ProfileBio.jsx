import React from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';


function ProfileBio({ user }) {
    return (
        <Grid textAlign='center' columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Image src={`${user.photoUrl ? user.photoUrl : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.explicit.bing.net%2Fth%3Fid%3DOIP.iTyJMo0iAF-MVGrBadIlLgHaO1%26pid%3DApi&f=1"} `} avatar size='small' />
                </Grid.Column>
                <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                    <Segment vertical>
                        <h3>{user.username}</h3>
                    </Segment>
                    <Segment>
                        <span> Bio: {user.bio}</span>
                    </Segment>

                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}



export default ProfileBio;