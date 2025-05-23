import React, { useRef, useEffect, useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import YouTube from 'react-youtube';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';

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
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onNext, onPrevious, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Enter fullscreen mode when component mounts
  useEffect(() => {
    const enterFullscreen = async () => {
      if (containerRef.current && !document.fullscreenElement) {
        try {
          if (isMobile) {
            const videoElement = containerRef.current.querySelector('iframe');
            if (videoElement) {
              if (videoElement.requestFullscreen) {
                await videoElement.requestFullscreen();
              } else if ((videoElement as any).webkitRequestFullscreen) {
                await (videoElement as any).webkitRequestFullscreen();
              } else if ((videoElement as any).mozRequestFullScreen) {
                await (videoElement as any).mozRequestFullScreen();
              } else if ((videoElement as any).webkitEnterFullscreen) {
                await (videoElement as any).webkitEnterFullscreen();
              }
            }
          } else {
            await containerRef.current.requestFullscreen();
          }
          setIsFullscreen(true);
        } catch (error) {
          console.error('Error entering fullscreen:', error);
        }
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isMobile]);

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        if (isMobile) {
          const videoElement = containerRef.current.querySelector('iframe');
          if (videoElement) {
            if (videoElement.requestFullscreen) {
              await videoElement.requestFullscreen();
            } else if ((videoElement as any).webkitRequestFullscreen) {
              await (videoElement as any).webkitRequestFullscreen();
            } else if ((videoElement as any).mozRequestFullScreen) {
              await (videoElement as any).mozRequestFullScreen();
            } else if ((videoElement as any).webkitEnterFullscreen) {
              await (videoElement as any).webkitEnterFullscreen();
            }
          }
        } else {
          await containerRef.current.requestFullscreen();
        }
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
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        onPrevious();
        touchStartX.current = null;
        touchStartY.current = null;
      } else if (deltaX < -50) {
        onNext();
        touchStartX.current = null;
        touchStartY.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    // Force play the video
    event.target.playVideo();
    // Set volume to maximum
    event.target.setVolume(100);
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
      fs: 1,
      mute: 0,
      enablejsapi: 1,
      origin: window.location.origin,
    },
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        overflow: 'hidden',
        touchAction: 'none',
        zIndex: 9999,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          onReady={onReady}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={handleFullscreen}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton
          onClick={onClose}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoPlayer; 