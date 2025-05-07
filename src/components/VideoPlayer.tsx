import React, { useRef, useEffect, useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import YouTube from 'react-youtube';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  video: Video;
  onNext: () => void;
  onPrevious: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onNext, onPrevious }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
          onPrevious();
        } else if (deltaX < -50) {
          onNext();
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 1,
      playsinline: 1,
    },
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '100vh' : '80vh',
        maxHeight: isMobile ? '100vh' : '80vh',
        backgroundColor: 'black',
        overflow: 'hidden',
        touchAction: 'none',
      }}
      onTouchStart={handleTouchStart}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <YouTube
          videoId={video.id}
          opts={opts}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <IconButton
        onClick={handleFullscreen}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          zIndex: 2,
        }}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Box>
  );
};

export default VideoPlayer; 