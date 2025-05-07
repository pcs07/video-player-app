import { useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Button, ButtonGroup } from '@mui/material'
import VideoPlayer from './components/VideoPlayer'
import VideoGallery from './components/VideoGallery'
import './App.css'

const homeVideos = [
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

const officeVideos = [
  {
    id: '3tmd-ClpJxA',
    title: 'Office Prank Compilation',
    url: 'https://youtube.com/shorts/3tmd-ClpJxA',
    thumbnail: 'https://img.youtube.com/vi/3tmd-ClpJxA/maxresdefault.jpg'
  },
  {
    id: 'lXMskKTw3Bc',
    title: 'Funny Coworker Moments',
    url: 'https://youtube.com/shorts/lXMskKTw3Bc',
    thumbnail: 'https://img.youtube.com/vi/lXMskKTw3Bc/maxresdefault.jpg'
  },
  {
    id: 'hY7m5jjJ9mM',
    title: 'Cat in the Office',
    url: 'https://youtube.com/shorts/hY7m5jjJ9mM',
    thumbnail: 'https://img.youtube.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
  },
  {
    id: 'tVj0ZTS4WF4',
    title: 'Office Dance Challenge',
    url: 'https://youtube.com/shorts/tVj0ZTS4WF4',
    thumbnail: 'https://img.youtube.com/vi/tVj0ZTS4WF4/maxresdefault.jpg'
  }
]

const parkVideos = [
  {
    id: 'J---aiyznGQ',
    title: 'Dog Playing in Park',
    url: 'https://youtube.com/shorts/J---aiyznGQ',
    thumbnail: 'https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg'
  },
  {
    id: 'e-ORhEE9VVg',
    title: 'Kids Having Fun',
    url: 'https://youtube.com/shorts/e-ORhEE9VVg',
    thumbnail: 'https://img.youtube.com/vi/e-ORhEE9VVg/maxresdefault.jpg'
  },
  {
    id: 'kffacxfA7G4',
    title: 'Parkour Tricks',
    url: 'https://youtube.com/shorts/kffacxfA7G4',
    thumbnail: 'https://img.youtube.com/vi/kffacxfA7G4/maxresdefault.jpg'
  },
  {
    id: 'RgKAFK5djSk',
    title: 'Nature Walk',
    url: 'https://youtube.com/shorts/RgKAFK5djSk',
    thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg'
  }
]

const restaurantVideos = [
  {
    id: '60ItHLz5WEA',
    title: 'Amazing Food Plating',
    url: 'https://youtube.com/shorts/60ItHLz5WEA',
    thumbnail: 'https://img.youtube.com/vi/60ItHLz5WEA/maxresdefault.jpg',
  },
  {
    id: 'CevxZvSJLk8',
    title: 'Restaurant Surprise',
    url: 'https://youtube.com/shorts/CevxZvSJLk8',
    thumbnail: 'https://img.youtube.com/vi/CevxZvSJLk8/maxresdefault.jpg',
  },
  {
    id: 'OPf0YbXqDm0',
    title: "Chef's Special",
    url: 'https://youtube.com/shorts/OPf0YbXqDm0',
    thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg',
  },
  {
    id: 'uelHwf8o7_U',
    title: 'Dessert Art',
    url: 'https://youtube.com/shorts/uelHwf8o7_U',
    thumbnail: 'https://img.youtube.com/vi/uelHwf8o7_U/maxresdefault.jpg',
  },
];

const busStationVideos = [
  {
    id: '9bZkp7q19f0',
    title: 'Funny Bus Moments',
    url: 'https://youtube.com/shorts/9bZkp7q19f0',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Busker Performance',
    url: 'https://youtube.com/shorts/kJQP7kiw5Fk',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
  },
  {
    id: 'fRh_vgS2dFE',
    title: 'Travel Vlog',
    url: 'https://youtube.com/shorts/fRh_vgS2dFE',
    thumbnail: 'https://img.youtube.com/vi/fRh_vgS2dFE/maxresdefault.jpg'
  },
  {
    id: 'pRpeEdMmmQ0',
    title: 'Bus Station Life',
    url: 'https://youtube.com/shorts/pRpeEdMmmQ0',
    thumbnail: 'https://img.youtube.com/vi/pRpeEdMmmQ0/maxresdefault.jpg'
  }
]

const kitchenVideos = [
  {
    id: 'hT_nvWreIhg',
    title: 'Quick Kitchen Hacks',
    url: 'https://youtube.com/shorts/hT_nvWreIhg',
    thumbnail: 'https://img.youtube.com/vi/hT_nvWreIhg/maxresdefault.jpg'
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Cooking with Kids',
    url: 'https://youtube.com/shorts/JGwWNGJdvx8',
    thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg'
  },
  {
    id: '2Vv-BfVoq4g',
    title: 'Easy Recipes',
    url: 'https://youtube.com/shorts/2Vv-BfVoq4g',
    thumbnail: 'https://img.youtube.com/vi/2Vv-BfVoq4g/maxresdefault.jpg'
  },
  {
    id: '09R8_2nJtjg',
    title: 'Kitchen Fails',
    url: 'https://youtube.com/shorts/09R8_2nJtjg',
    thumbnail: 'https://img.youtube.com/vi/09R8_2nJtjg/maxresdefault.jpg'
  }
]

const sections = [
  { name: 'Home', videos: homeVideos },
  { name: 'Office', videos: officeVideos },
  { name: 'Park', videos: parkVideos },
  { name: 'Restaurant', videos: restaurantVideos },
  { name: 'Bus Station', videos: busStationVideos },
  { name: 'Kitchen', videos: kitchenVideos },
]

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#222',
    },
    background: {
      default: '#f7f7f7',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  const [selectedSection, setSelectedSection] = useState(sections[0].name)
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)

  const currentSection = sections.find((s) => s.name === selectedSection)!
  const videos = currentSection.videos

  const handleSelectVideo = (index: number) => {
    setSelectedVideoIndex(index)
  }

  const handleNextVideo = () => {
    setSelectedVideoIndex((prevIndex) => 
      prevIndex === null ? 0 : (prevIndex + 1) % videos.length
    )
  }

  const handlePreviousVideo = () => {
    setSelectedVideoIndex((prevIndex) => 
      prevIndex === null ? 0 : (prevIndex - 1 + videos.length) % videos.length
    )
  }

  const handleCloseVideo = () => {
    setSelectedVideoIndex(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Filter Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ButtonGroup variant="text" sx={{ gap: 2, background: 'transparent' }}>
            {sections.map((section) => (
              <Button
                key={section.name}
                onClick={() => {
                  setSelectedSection(section.name)
                  setSelectedVideoIndex(null)
                }}
                sx={{
                  borderRadius: 4,
                  px: 3,
                  py: 1,
                  fontWeight: selectedSection === section.name ? 700 : 400,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  background: selectedSection === section.name ? '#fff' : 'transparent',
                  color: selectedSection === section.name ? '#222' : '#888',
                  boxShadow: selectedSection === section.name ? '0 2px 8px #eee' : 'none',
                  textTransform: 'none',
                }}
              >
                {section.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        {/* Section Title */}
        <Typography variant="h5" align="left" sx={{ mb: 3, fontWeight: 700, color: '#222' }}>
          {selectedSection}
        </Typography>
        {/* Video Gallery or Player */}
        {selectedVideoIndex !== null ? (
          <VideoPlayer
            video={videos[selectedVideoIndex]}
            onNext={handleNextVideo}
            onPrevious={handlePreviousVideo}
            onClose={handleCloseVideo}
          />
        ) : (
          <VideoGallery
            videos={videos}
            onSelectVideo={handleSelectVideo}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
