import React = require('react');
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
export default () => {
  return (
    <div>
      <Player
        style={{ margin: 0 }}
        playsInline
        fluid={false}
        width={500}
        height={320}
        poster="https://video-react.js.org/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    </div>
  );
};
