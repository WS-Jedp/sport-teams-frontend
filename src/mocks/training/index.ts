import { Training } from '../../dto/training'
import { ExercisesMock } from '../exercises'
import { PlayersMock } from '../people'
import { VideosMock } from '../videos'

export const TrainingsMock:Training[] = [
    {
        id: 1,
        datetime: new Date(),
        exercises: ExercisesMock,
        players: PlayersMock,
        state: true,
        videos: VideosMock
    },
    {
        id: 2,
        datetime: new Date(2021, 5, 21),
        exercises: ExercisesMock,
        players: PlayersMock,
        state: false,
        videos: []
    }
]

export const NextTrainingMock:Training = {
    id: 21,
    datetime: new Date(2021, 6, 25),
    exercises: [ExercisesMock[0]],
    players: [PlayersMock[0]],
    state: true,
    videos: []
}