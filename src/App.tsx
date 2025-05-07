import { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import VideoPlayer from './components/VideoPlayer'
import VideoGallery from './components/VideoGallery'
import './App.css'

// Your curated YouTube Shorts videos
const sampleVideos = [
  {
    id: 'W2b9L8EfSws',
    title: 'Introduction to YT Shorts',
    url: 'https://youtube.com/shorts/W2b9L8EfSws',
    thumbnail: 'https://img.youtube.com/vi/W2b9L8EfSws/maxresdefault.jpg'
  },
  {
    id: 'f4JBa07OoRg',
    title: 'Intro in Hindi',
    url: 'https://youtube.com/shorts/f4JBa07OoRg',
    thumbnail: 'https://img.youtube.com/vi/f4JBa07OoRg/maxresdefault.jpg'
  },
  {
    id: 'g4NNzON_1m4',
    title: 'Asking Puja for evening walk',
    url: 'https://youtube.com/shorts/g4NNzON_1m4',
    thumbnail: 'https://img.youtube.com/vi/g4NNzON_1m4/maxresdefault.jpg'
  },
  {
    id: '0KiedK3NtFM',
    title: "Puja's response",
    url: 'https://youtube.com/shorts/0KiedK3NtFM',
    thumbnail: 'https://img.youtube.com/vi/0KiedK3NtFM/maxresdefault.jpg'
  }
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
