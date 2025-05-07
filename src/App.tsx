import { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import VideoPlayer from './components/VideoPlayer'
import VideoGallery from './components/VideoGallery'
import './App.css'

// Your curated YouTube Shorts videos
const sampleVideos = [
  {
    id: '1',
    title: 'Introduction to YT Shorts',
    url: 'https://youtube.com/shorts/W2b9L8EfSws',
    thumbnail: 'https://img.youtube.com/vi/W2b9L8EfSws/maxresdefault.jpg'
  },
  {
    id: '2',
    title: 'Intro in Hindi',
    url: 'https://youtube.com/shorts/f4JBa07OoRg',
    thumbnail: 'https://img.youtube.com/vi/f4JBa07OoRg/maxresdefault.jpg'
  },
  {
    id: '3',
    title: 'Asking Puja for evening walk',
    url: 'https://youtube.com/shorts/g4NNzON_1m4',
    thumbnail: 'https://img.youtube.com/vi/g4NNzON_1m4/maxresdefault.jpg'
  },
  {
    id: '4',
    title: "Puja's response",
    url: 'https://youtube.com/shorts/0KiedK3NtFM',
    thumbnail: 'https://img.youtube.com/vi/0KiedK3NtFM/maxresdefault.jpg'
  },
]

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)

  const handleSelectVideo = (index: number) => {
    setCurrentVideoIndex(index)
    setShowPlayer(true)
  }

  const handleClosePlayer = () => {
    setShowPlayer(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {showPlayer ? (
          <VideoPlayer 
            videos={sampleVideos} 
            currentVideoIndex={currentVideoIndex}
            onClose={handleClosePlayer}
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
