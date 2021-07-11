export const DEFAULT_PHOTO_URL = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/sleepy.png?alt=media&token=98172e4e-ae3e-48dd-ac3a-1bb9fba03414'

const DEFAULT_PHOTO_PHILOSOFY = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/philosophy.jpg?alt=media&token=b6bf8a92-fa1c-4155-bb90-fed63f5cc87a'
const DEFAULT_PHOTO_SAD = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/sad.jpg?alt=media&token=f10967f0-73eb-4ab0-ab30-7263850cfa19'
const DEFAULT_PHOTO_CAT = 'https://firebasestorage.googleapis.com/v0/b/sports-team-765d4.appspot.com/o/cat.jpg?alt=media&token=e04463be-88f4-4a7c-a0bc-93b4a8e19989'

export const getRandomPhotoUrl = () => {
    const photos = [
        DEFAULT_PHOTO_CAT,
        DEFAULT_PHOTO_PHILOSOFY,
        DEFAULT_PHOTO_SAD,
        DEFAULT_PHOTO_URL
    ]

    const randomNumber = Math.floor(Math.random() * photos.length)
    return photos[randomNumber]
}