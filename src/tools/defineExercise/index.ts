import CardioIMG from '../../assets/images/cardio.svg'
import Weight from '../../assets/images/weight.svg'
import Stopwatch from '../../assets/images/stopwatch.svg'
import Basketball from '../../assets/images/basketball.svg'
import Brain from '../../assets/images/brain.svg'

export type EXERCISES_TYPE = 'percentage' | 'time' | 'repetitions' | 'performance'

export const exercisesTypes:EXERCISES_TYPE[] = [
    'percentage',
    'repetitions',
    'time',
    'performance'
]

export type EXERCISE_CATEGORY = 'cardio' | 'velocity' | 'technical' | 'strength' | 'psychological' | 'tactic' | 'physical'

export const exercisesCategories:EXERCISE_CATEGORY[] = [
    'cardio',
    'strength',
    'technical',
    'velocity',
    'psychological',
    'tactic',
    'physical'
]

const EXERCISE_ICON_BY_CATEGORY:{[key:string]: string} = {
    'cardio': CardioIMG,
    'velocity': Stopwatch,
    'technical': Basketball,
    'tactic': Basketball,
    'strength': Weight,
    'physical': Weight,
    'psychological': Brain,
}

const DEFAULT_EXERCISE_ICON = Basketball

export const defineCategoryIcon = ({ category }:{category:EXERCISE_CATEGORY}) => EXERCISE_ICON_BY_CATEGORY[category] || DEFAULT_EXERCISE_ICON
