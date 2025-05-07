import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface VideoListProps {
  videos: Video[];
  onSelectVideo: (index: number) => void;
  currentVideoIndex: number;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo, currentVideoIndex }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Video Playlist
      </Typography>
      <List>
        {videos.map((video, index) => (
          <ListItem key={video.id} disablePadding>
            <ListItemButton
              selected={index === currentVideoIndex}
              onClick={() => onSelectVideo(index)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemText
                primary={video.title}
                primaryTypographyProps={{
                  color: index === currentVideoIndex ? 'primary' : 'textPrimary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default VideoList; 