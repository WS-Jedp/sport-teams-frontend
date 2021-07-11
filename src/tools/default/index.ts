export const DEFAULT_PHOTO_URL = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/sleepy.png?alt=media&token=98172e4e-ae3e-48dd-ac3a-1bb9fba03414'

const DEFAULT_PHOTO_PHILOSOFY = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/philosophy.jpg?alt=media&token=b6bf8a92-fa1c-4155-bb90-fed63f5cc87a'
const DEFAULT_PHOTO_SAD = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/sad.jpg?alt=media&token=f10967f0-73eb-4ab0-ab30-7263850cfa19'
const DEFAULT_PHOTO_CAT = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/cat.jpg?alt=media&token=e04463be-88f4-4a7c-a0bc-93b4a8e19989'
const DEFAULT_PHOTO_JHON_JAIRO = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/jhon-jairo.jpg?alt=media&token=4e8f5ebf-9a6e-4355-a3ec-b77c284baaf8'
const DEFAULT_PHOTO_AIR = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/kermit-air.jpg?alt=media&token=864dd4a7-3575-45f0-ac5c-246e4cab4b4a'
const DEFAULT_PHOTO_JOBS = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/kermit-jobs.jpg?alt=media&token=b96fc642-480d-4481-b338-752c3aad191c'
const DEFAULT_PHOTO_DARK = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/kermit-dark.jpg?alt=media&token=9faa5157-3d69-4e2b-bac8-4fbce96810bf'
const DEFAULT_PHOTO_BOSS = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/kermit-jobs.jpg?alt=media&token=b96fc642-480d-4481-b338-752c3aad191c'
const DEFAULT_PHOTO_SAD_BABY = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/kermit-sad-baby.jpg?alt=media&token=bdf85bb8-6c68-4288-96ef-742477891699'


export const getRandomPhotoUrl = () => {
    const photos = [
        DEFAULT_PHOTO_CAT,
        DEFAULT_PHOTO_PHILOSOFY,
        DEFAULT_PHOTO_SAD,
        DEFAULT_PHOTO_URL,
        DEFAULT_PHOTO_JHON_JAIRO,
        DEFAULT_PHOTO_AIR,
        DEFAULT_PHOTO_JOBS,
        DEFAULT_PHOTO_DARK,
        DEFAULT_PHOTO_BOSS,
        DEFAULT_PHOTO_SAD_BABY
    ]

    const randomNumber = Math.floor(Math.random() * photos.length)
    return photos[randomNumber]
}