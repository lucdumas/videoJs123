import React, { useState, useRef } from 'react'
import VideoJS from './components/VideoJS'

function App() {
  const playerRef = useRef(null)

  const sources = [
    {
      sources: [
        {
          src: 'https://www.youtube.com/watch?v=7CVtTOpgSyY',
          type: 'video/youtube',
        },
      ],
      poster: 'https://www.youtube.com/watch?v=7CVtTOpgSyY',
    },
    {
      sources: [
        {
          src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
          type: 'application/x-mpegURL',
        },
      ],
      poster: 'http://media.w3.org/2010/05/bunny/poster.png',
    },
  ]

  const videoJsOptions = {
    preload: 'auto',

    fluid: true,
    responsive: true,
    controls: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    forward: 5,
    back: 5,

    width: '640',
    height: '264',
  }

  return (
    <>
      <VideoJS options={videoJsOptions} sources={sources} />
    </>
  )
}

export default App
