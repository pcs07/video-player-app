import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface VideoGalleryProps {
  videos: Video[];
  onSelectVideo: (index: number) => void;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, onSelectVideo }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        My YouTube Shorts Collection
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 4, 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {videos.map((video, index) => (
          <Box
            key={video.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => onSelectVideo(index)}
          >
            <Avatar
              src={video.thumbnail}
              alt={video.title}
              sx={{
                width: 150,
                height: 150,
                border: '3px solid',
                borderColor: 'primary.main',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                mt: 2,
                textAlign: 'center',
                maxWidth: 150,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {video.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default VideoGallery; 