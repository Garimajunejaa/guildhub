import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import backgroundImage from "../assets/image.jpg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function LocalEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Categories for filtering
  const categories = [
    "all",
    "esports",
    "casual",
    "professional",
    "family",
    "tournament",
    "expo",
    "meetup"
  ];

  // Sample events data
  const events = [
    {
      id: 1,
      title: "World Gaming Day!",
      image: backgroundImage,
      date: "2024-04-15",
      description: "Join us for the biggest gaming event of the year. Featuring tournaments, cosplay contests, and gaming celebrities.",
      location: "Gaming Arena, Downtown",
      category: "expo",
      price: 50,
      capacity: 1000,
      registrationLink: "https://example.com/register",
      ageRestriction: "All ages",
      organizer: "Gaming Events Co.",
      sponsors: ["TechCorp", "GameStudios"],
    },
    {
      id: 2,
      title: "ESports Championship",
      image: backgroundImage,
      date: "2024-05-01",
      description: "Professional gaming tournament featuring League of Legends, DOTA 2, and CS:GO competitions.",
      location: "ESports Stadium, West End",
      category: "esports",
      price: 75,
      capacity: 500,
      registrationLink: "https://example.com/esports",
      ageRestriction: "16+",
      organizer: "Pro Gaming League",
      sponsors: ["ESports Pro", "Gaming Gear"],
    },
    {
      id: 3,
      title: "Retro Gaming Night",
      image: backgroundImage,
      date: "2024-04-20",
      description: "Experience nostalgia with classic arcade games, vintage consoles, and tournaments featuring games from the 80s and 90s.",
      location: "Vintage Arcade, North Square",
      category: "casual",
      price: 25,
      capacity: 200,
      registrationLink: "https://example.com/retro",
      ageRestriction: "All ages",
      organizer: "Retro Gaming Club",
      sponsors: ["RetroTech", "Classic Games"],
      featured: false
    },
    {
      id: 4,
      title: "Game Development Workshop",
      image: backgroundImage,
      date: "2024-04-25",
      description: "Learn game development basics using Unity. Perfect for beginners interested in creating their first game.",
      location: "Tech Hub, Innovation Center",
      category: "workshop",
      price: 100,
      capacity: 50,
      registrationLink: "https://example.com/workshop",
      ageRestriction: "14+",
      organizer: "Game Dev Academy",
      sponsors: ["Unity", "Tech Education"],
      featured: false
    },{
      id: 5,
      title: "VR Gaming Expo 2024",
      image: backgroundImage,
      date: "2024-05-10",
      description: "Experience the latest in virtual reality gaming. Try new VR headsets and upcoming VR game releases.",
      location: "Digital Center, East Mall",
      category: "expo",
      price: 40,
      capacity: 300,
      registrationLink: "https://example.com/vr-expo",
      ageRestriction: "12+",
      organizer: "VR Gaming Association",
      sponsors: ["VR Tech", "Digital Dreams"],
      featured: true
    },
    {
      id: 6,
      title: "Family Game Day",
      image: backgroundImage,
      date: "2024-05-15",
      description: "A day of family-friendly gaming activities, Nintendo Switch tournaments, and board games.",
      location: "Community Center, Family Park",
      category: "family",
      price: 30,
      capacity: 150,
      registrationLink: "https://example.com/family-day",
      ageRestriction: "All ages",
      organizer: "Family Gaming Network",
      sponsors: ["Nintendo", "Family Fun Co"],
      featured: false
    }, {
      id: 7,
      title: "Mobile Gaming Championship",
      image: backgroundImage,
      date: "2024-05-20",
      description: "Compete in popular mobile games including PUBG Mobile, COD Mobile, and Clash Royale.",
      location: "Mobile Arena, South Park",
      category: "tournament",
      price: 25,
      capacity: 400,
      registrationLink: "https://example.com/mobile-gaming",
      ageRestriction: "13+",
      organizer: "Mobile Esports League",
      sponsors: ["Mobile Gaming Pro", "Phone Tech"],
      featured: true
    },
    {
      id: 8,
      title: "Indie Game Showcase",
      image: backgroundImage,
      date: "2024-06-01",
      description: "Discover and play innovative indie games. Meet independent developers and test upcoming releases.",
      location: "Creative Space, Downtown",
      category: "expo",
      price: 20,
      capacity: 250,
      registrationLink: "https://example.com/indie-showcase",
      ageRestriction: "All ages",
      organizer: "Indie Game Collective",
      sponsors: ["Indie Publisher", "Game Dev Tools"],
      featured: false
    }, {
      id: 9,
      title: "Gaming Industry Networking",
      image: backgroundImage,
      date: "2024-06-10",
      description: "Network with gaming industry professionals, attend panels, and explore career opportunities.",
      location: "Business Center, West Square",
      category: "meetup",
      price: 50,
      capacity: 200,
      registrationLink: "https://example.com/networking",
      ageRestriction: "18+",
      organizer: "Gaming Industry Network",
      sponsors: ["Game Studios", "Tech Recruiters"],
      featured: false
    },
    {
      id: 10,
      title: "Minecraft Building Competition",
      image: backgroundImage,
      date: "2024-06-15",
      description: "Show off your creativity in themed building challenges. Prizes for best builds in multiple categories.",
      location: "Creative Center, Youth Park",
      category: "tournament",
      price: 15,
      capacity: 100,
      registrationLink: "https://example.com/minecraft",
      ageRestriction: "8+",
      organizer: "Minecraft Community",
      sponsors: ["Microsoft", "Building Games"],
      featured: false
    }
    // Add more events as needed...
  ];

  // Filter and sort events
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    
    const matchesDate = !selectedDate || 
      dayjs(event.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD');

    return matchesSearch && matchesCategory && matchesDate;
  }).sort((a, b) => {
    if (sortBy === "date") {
      return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleFavorite = (eventId) => {
    if (favorites.includes(eventId)) {
      setFavorites(favorites.filter(id => id !== eventId));
      showSnackbar('Removed from favorites', 'info');
    } else {
      setFavorites([...favorites, eventId]);
      showSnackbar('Added to favorites', 'success');
    }
  };

  const handleShare = (event) => {
    navigator.clipboard.writeText(`Check out ${event.title} at ${event.location} on ${event.date}!`);
    showSnackbar('Event link copied to clipboard!', 'success');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: "center" }}>
        Local Events
      </Typography>

      {/* Filters and Search Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Filter by date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card
              sx={{
                height: 300,
                backgroundImage: `url(${event.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardContent 
                sx={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  flexGrow: 1,
                  padding: 3
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ color: "#e4f647" }}
                  >
                    {event.title}
                  </Typography>
                  <Chip 
                    label={event.category}
                    size="small"
                    sx={{ backgroundColor: "#e4f647" }}
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {dayjs(event.date).format('MMMM D, YYYY')}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: "white", 
                    mt: 1,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                >
                  {event.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
                  📍 {event.location}
                </Typography>
              </CardContent>
              <CardActions sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", p: 2, justifyContent: "space-between" }}>
                <Button 
                  variant="contained" 
                  onClick={() => handleEventClick(event)}
                  sx={{ 
                    borderRadius: "5px",
                    backgroundColor: "#e4f647",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#c5d63c"
                    }
                  }}
                >
                  Learn More
                </Button>
                <div>
                  <IconButton 
                    onClick={() => handleFavorite(event.id)}
                    sx={{ color: favorites.includes(event.id) ? 'red' : 'white' }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleShare(event)}
                    sx={{ color: 'white' }}
                  >
                    <ShareIcon />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Event Details Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="event-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {selectedEvent && (
            <>
              <Typography id="event-modal-title" variant="h4" component="h2" gutterBottom>
                {selectedEvent.title}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Event Details</Typography>
                  <Typography paragraph>{selectedEvent.description}</Typography>
                  <Typography variant="body1" gutterBottom>
                    📅 Date: {dayjs(selectedEvent.date).format('MMMM D, YYYY')}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    📍 Location: {selectedEvent.location}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    💰 Price: ${selectedEvent.price}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    👥 Capacity: {selectedEvent.capacity} people
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    🔞 Age Restriction: {selectedEvent.ageRestriction}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    🏢 Organizer: {selectedEvent.organizer}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    💎 Sponsors: {selectedEvent.sponsors.join(', ')}
                  </Typography>
                  <Button 
                    variant="contained"
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    sx={{ 
                      mt: 2,
                      backgroundColor: "#e4f647",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#c5d63c"
                      }
                    }}
                  >
                    Register Now
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}