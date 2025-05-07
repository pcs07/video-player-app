import { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import VideoPlayer from './components/VideoPlayer'
import VideoGallery from './components/VideoGallery'
import './App.css'

// Your curated YouTube Shorts videos
const sampleVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Me at the zoo',
    url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Despacito',
    url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - Gangnam Style',
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg'
  },
  {
    id: 'OPf0YbXqDm0',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
    thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg'
  },
  {
    id: 'hT_nvWreIhg',
    title: 'OneRepublic - Counting Stars',
    url: 'https://www.youtube.com/watch?v=hT_nvWreIhg',
    thumbnail: 'https://img.youtube.com/vi/hT_nvWreIhg/maxresdefault.jpg'
  },
]

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000',
    },
    background: {
      default: '#0f0f0f',
      paper: '#1f1f1f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)

  const handleSelectVideo = (index: number) => {
    setSelectedVideoIndex(index)
  }

  const handleNextVideo = () => {
    setSelectedVideoIndex((prevIndex) => 
      prevIndex === null ? 0 : (prevIndex + 1) % sampleVideos.length
    )
  }

  const handlePreviousVideo = () => {
    setSelectedVideoIndex((prevIndex) => 
      prevIndex === null ? 0 : (prevIndex - 1 + sampleVideos.length) % sampleVideos.length
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {selectedVideoIndex !== null ? (
          <VideoPlayer
            video={sampleVideos[selectedVideoIndex]}
            onNext={handleNextVideo}
            onPrevious={handlePreviousVideo}
          />
        ) : (
          <VideoGallery
            videos={sampleVideos}
            onSelectVideo={handleSelectVideo}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
