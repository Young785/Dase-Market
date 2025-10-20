import React from 'react';
import Waveform from './Waveform.jsx';
// import {AudioFile} from '../../../assets/images'

const App = () => {
  return (
    <div>
      <h1>WaveSurfer in React</h1>
      <Waveform audioUrl='https://naijaloaded.store/assets/uploads/Asake---Fuji-Vibe.mp3' />
    </div>
  );
};

export default App;
