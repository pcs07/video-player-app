import React from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr 1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr',
        },
        gap: { xs: 2, sm: 3 },
        justifyContent: 'center',
        alignItems: 'start',
      }}
    >
      {videos.map((video, index) => (
        <Card
          key={video.id}
          elevation={0}
          sx={{
            borderRadius: 4,
            boxShadow: '0 2px 12px #e0e0e0',
            overflow: 'hidden',
            background: '#fff',
            mb: 1,
          }}
        >
          <CardActionArea onClick={() => onSelectVideo(index)} sx={{ p: 0 }}>
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
              <CardMedia
                component="img"
                image={video.thumbnail}
                alt={video.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <PlayCircleFilledWhiteIcon sx={{ fontSize: 56, color: 'white', opacity: 0.85, filter: 'drop-shadow(0 2px 8px #222)' }} />
              </Box>
            </Box>
            <CardContent sx={{ p: 2, pb: 2 }}>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: '#222',
                  mt: 1,
                  mb: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {video.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default VideoGallery; 