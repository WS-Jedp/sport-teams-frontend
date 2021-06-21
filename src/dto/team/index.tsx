import { Player } from '../player'
import { Directive } from '../directive'
import { TeamVideo } from '../teamVideo'

export type Team = {
    id: number,
    name: string,
    location: string,
    photoUrl?: string,
    description: string,
    nextTraining?: Date,
    players: Player[],
    directives: Directive[],
    videos: TeamVideo[]
    lastVideos: TeamVideo[]
}

export type CardTeam = {
    id: number,
    name: string,
    photoUrl?: string,
    location: string,
    description: string
}