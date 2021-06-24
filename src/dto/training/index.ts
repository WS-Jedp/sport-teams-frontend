import { TeamVideo } from '../teamVideo'
import { Exercise } from '../exercise'
import { Player } from '../player'

export type Training = {
    id: number,
    datetime: Date | null,
    state: boolean,
    exercises: Exercise[],
    players: Player[],
    videos?: TeamVideo[]
}
