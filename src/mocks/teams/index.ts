import { Team } from '../../dto/team'
import { DirectivesMock, PlayersMock } from '../people'

export const TeamMock:Team[] = [
    {
        id:1,
        name: 'Mambas MDE',
        description: 'Description for the mock team created',
        location: 'Med, Col',
        nextTraining: undefined,
        directives: DirectivesMock,
        players: PlayersMock,
        lastVideos: [],
        videos: [],
    }
]