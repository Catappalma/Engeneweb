import React, { useEffect } from 'react';

const ReprYouTube = ({ videoId }) => {
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        loadPlayer(videoId);
      };
    } else {
      loadPlayer(videoId);
    }
  }, [videoId]);

  const loadPlayer = (videoId) => {
    new window.YT.Player(`player-${videoId}`, {
      height: '200',
      width: '100%',
      videoId: videoId,
      playerVars: {
        playsinline: 1,
      },
    });
  };

  return <div className="video-container" id={`player-${videoId}`}></div>;
};
export default ReprYouTube;
