import React, { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css'; // Import CSS for styling

const MusicPlayer = ({ track, isPlaying, onPlayPause, onNext, onPrevious }) => {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (track) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, track]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    return (
        <footer className="footer music-player">
            <div className="container-fluid">
                <div className="row">
                    <div className="mu">
                        <audio 
                            ref={audioRef} 
                            src={track?.url} 
                            onTimeUpdate={handleTimeUpdate} 
                            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                        />
                        <div className="player-controls">
                            <button onClick={onPrevious} className="control-btn">⏮️</button>
                            <button onClick={onPlayPause} className="control-btn">
                                {isPlaying ? '⏸️' : '▶️'}
                            </button>
                            <button onClick={onNext} className="control-btn">⏭️</button>
                            <div className="progress-container">
                                <input 
                                    type="range" 
                                    value={(currentTime / duration) * 100 || 0} 
                                    onChange={(e) => {
                                        const newTime = (e.target.value / 100) * duration;
                                        audioRef.current.currentTime = newTime;
                                        setCurrentTime(newTime);
                                    }} 
                                />
                                <div className="time-display">
                                    {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} / 
                                    {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
                                </div>
                            </div>
                        {/* Current Track Info */}
                        <div className="current-track-info">
                            <div className="track-title">{track?.title}</div>
                            <div className="track-artist">{track?.artist}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default MusicPlayer;
