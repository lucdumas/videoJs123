import React, { useState, useEffect, useRef } from 'react'
import videojs from 'video.js'

import '../../node_modules/videojs-seek-buttons/dist/videojs-seek-buttons.css'
import '../../node_modules/videojs-seek-buttons/dist/videojs-seek-buttons.min.js'

import '../../node_modules/videojs-playlist/dist/videojs-playlist'
import '../../node_modules/videojs-youtube/dist/Youtube.min.js'

import '../../node_modules/video.js/dist/video-js.min.css'
import '../customTheme.css'

const VideoJs = ({ options, sources }) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [currentTime, setCurrentTime] = useState()
  const [duration, setDuration] = useState()
  const [src, setSrc] = useState()

  useEffect(() => {
    const player = playerRef.current

    if (!player) {
      const videoElement = videoRef.current

      if (!videoElement) return

      playerRef.current = videojs(videoElement, options)
    } else {
      player.playlist(sources)
      player.playlist.autoadvance(1.5)
      player.seekButtons({
        forward: 5,
        back: 5,
      })

      player.on('timeupdate', function () {
        setCurrentTime(this.currentTime())
        setDuration(this.duration())
        setSrc(this.src())
      })
    }

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [options, videoRef, playerRef])

  function secondsToTime(e) {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, '0'),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, '0'),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, '0')

    return h + ':' + m + ':' + s
  }

  return (
    <>
      <div className={'wrapper'}>
        <video ref={videoRef} className={`video-js`} />
        <table className={'table1'}>
          <tbody>
            <tr>
              <td>
                <em>Source:</em>
              </td>
              <td className={'loginfo srclog'}>{src}</td>
            </tr>
            <tr>
              <td>
                <em>Current Time:</em>
              </td>
              <td className={'loginfo'}>
                {secondsToTime(currentTime) === 'NaN:NaN:NaN'
                  ? ''
                  : secondsToTime(currentTime)}
              </td>
            </tr>
            <tr>
              <td>
                <em>Total Time:</em>
              </td>
              <td className={'loginfo'}>
                {' '}
                {secondsToTime(duration) === 'NaN:NaN:NaN'
                  ? ''
                  : secondsToTime(duration)}{' '}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default VideoJs
