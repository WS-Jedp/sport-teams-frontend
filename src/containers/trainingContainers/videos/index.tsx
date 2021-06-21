import React from 'react'
import { TeamVideo as TeamVideoDTO } from '../../../dto/teamVideo'
import { Button } from '../../../components/buttons/simple'
import { TeamVideo } from '../../../components/teams/video'

export const renderVideos = (videos:TeamVideoDTO[]) => {

    if(videos.length === 0) {
        return (
            <>
                <p className="content__paragraph">
                    This training don't have registered videos
                </p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">See the videos registered to this training</p>
            <ul className="flex flex-row align-center justify-start training__videos-list">
                {
                    videos.map(video => (
                        <li key={video.id} className="flex align-center justify-center">
                            <TeamVideo 
                                date={video.date}
                                title={video.title}
                                videoId={video.videoUrl}
                            />
                        </li>
                    ))
                }
            </ul>
            <Button 
                text="Add Video"
                action={() => {}}
            />
        </>
    )

}