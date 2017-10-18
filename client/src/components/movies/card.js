import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const MovieCard = ({ image, title, release, votes }) => (
    <Card>
        <Image src={image} />
        <Card.Content>
            <Card.Header>
                {title}
            </Card.Header>
            <Card.Meta>
                <span className='date'>
                  Released on {release}
                </span>
            </Card.Meta>
            <Card.Description>
                Has been voted {votes}
            </Card.Description>
        </Card.Content>
    </Card>
)

export default MovieCard