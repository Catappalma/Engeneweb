import React from 'react';
import ReprYouTube from './reprYouTube';

const videoIds = [
  'FPDYeRk2PO8',
  'iwBfCHvFzPU',
  'wXFLzODIdUI',
  'HOciAVeq_HU',
  'osmHArcf_aE'
];

const ListaVideos = () => {
  return (
    <div>
      <h1 style={{ color: 'rgb(201, 0, 0)' }}>MVs de Enhypen</h1>
      {videoIds.map((videoId, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <ReprYouTube videoId={videoId} />
        </div>
      ))}
    </div>
  );
};

export default ListaVideos;
