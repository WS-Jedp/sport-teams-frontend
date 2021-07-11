export const defineIdYoutubeVideo = (url:string) => {
    const id:string = url.split('=')[1]
    return id
}