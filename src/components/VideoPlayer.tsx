import React, { useState, useRef } from 'react';
import type { TouchEvent } from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, Close } from '@mui/icons-material';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  videos: Video[];
  currentVideoIndex: number;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos, currentVideoIndex: initialIndex, onClose }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left - next video
        handleNext();
      } else {
        // Swipe right - previous video
        handlePrevious();
      }
    }

    touchStartX.current = null;
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          {videos[currentVideoIndex]?.title}
        </Typography>
        <Box 
          sx={{ position: 'relative', paddingTop: '56.25%' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ReactPlayer
            url={videos[currentVideoIndex]?.url}
            playing={playing}
            controls={false}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          <IconButton onClick={handlePrevious} size="large">
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={handlePlayPause} size="large">
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton onClick={handleNext} size="large">
            <SkipNext />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default VideoPlayer; 