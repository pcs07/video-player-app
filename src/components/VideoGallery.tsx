import React from 'react';
import { Box, Typography, Paper, Avatar, useTheme, useMediaQuery } from '@mui/material';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        My YouTube Shorts Collection
      </Typography>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)'
        },
        gap: { xs: 2, sm: 4 },
        justifyContent: 'center',
        alignItems: 'start'
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
                width: { xs: 120, sm: 150 },
                height: { xs: 120, sm: 150 },
                border: '3px solid',
                borderColor: 'primary.main',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                mt: 2,
                textAlign: 'center',
                maxWidth: { xs: 120, sm: 150 },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                display: '-webkit-box',
                WebkitLineClamp: isMobile ? 3 : 1,
                WebkitBoxOrient: 'vertical',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: 1.2,
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