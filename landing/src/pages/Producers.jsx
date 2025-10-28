import { useState, useEffect } from 'react'
import {
  Star,
  MapPin,
  Award,
  Music,
  Filter,
  Search,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  TrendingUp,
} from 'lucide-react'
import './Producers.css'

const Producers = () => {
  const [producers, setProducers] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock data - Replace with actual API call
  const mockProducers = [
    {
      id: 1,
      name: 'Mike Beats',
      avatar: '👨‍🎤',
      specialty: 'Hip-Hop Producer',
      location: 'Los Angeles, CA',
      rating: 4.9,
      reviews: 156,
      completedProjects: 320,
      responseTime: '2 hours',
      verified: true,
      topRated: true,
      price: '$150-$500',
      skills: ['Beat Making', 'Mixing', 'Mastering'],
      recentReviews: [
        {
          author: 'Sarah K.',
          rating: 5,
          text: 'Amazing work! Mike delivered beyond expectations.',
          date: '2 days ago',
        },
        {
          author: 'John D.',
          rating: 5,
          text: 'Professional and quick turnaround. Highly recommend!',
          date: '1 week ago',
        },
      ],
    },
    {
      id: 2,
      name: 'Sound Lab Pro',
      avatar: '🎧',
      specialty: 'Mixing Engineer',
      location: 'Nashville, TN',
      rating: 5.0,
      reviews: 203,
      completedProjects: 450,
      responseTime: '1 hour',
      verified: true,
      topRated: true,
      price: '$200-$800',
      skills: ['Mixing', 'Mastering', 'Audio Engineering'],
      recentReviews: [
        {
          author: 'Emily R.',
          rating: 5,
          text: 'Best mixing engineer I\'ve worked with. Crystal clear sound!',
          date: '3 days ago',
        },
      ],
    },
    {
      id: 3,
      name: 'Vocal Masters',
      avatar: '🎤',
      specialty: 'Vocal Producer',
      location: 'New York, NY',
      rating: 4.8,
      reviews: 128,
      completedProjects: 280,
      responseTime: '3 hours',
      verified: true,
      topRated: false,
      price: '$100-$400',
      skills: ['Vocal Production', 'Tuning', 'Recording'],
      recentReviews: [
        {
          author: 'Marcus T.',
          rating: 5,
          text: 'Made my vocals sound incredible. Very patient and skilled.',
          date: '1 week ago',
        },
      ],
    },
    {
      id: 4,
      name: 'Melody Maker',
      avatar: '🎹',
      specialty: 'Composer',
      location: 'London, UK',
      rating: 4.7,
      reviews: 94,
      completedProjects: 185,
      responseTime: '4 hours',
      verified: true,
      topRated: false,
      price: '$120-$350',
      skills: ['Composition', 'Music Theory', 'Arrangement'],
      recentReviews: [
        {
          author: 'Lisa M.',
          rating: 5,
          text: 'Beautiful melodies and great communication throughout.',
          date: '5 days ago',
        },
      ],
    },
    {
      id: 5,
      name: 'Elite Productions',
      avatar: '🎼',
      specialty: 'Full Production',
      location: 'Atlanta, GA',
      rating: 5.0,
      reviews: 187,
      completedProjects: 390,
      responseTime: '2 hours',
      verified: true,
      topRated: true,
      price: '$300-$1000',
      skills: ['Production', 'Mixing', 'Mastering', 'Songwriting'],
      recentReviews: [
        {
          author: 'David W.',
          rating: 5,
          text: 'Absolute professionals. Took my song from demo to radio ready.',
          date: '4 days ago',
        },
      ],
    },
    {
      id: 6,
      name: 'Audio Wizards',
      avatar: '🔊',
      specialty: 'Sound Designer',
      location: 'Toronto, CA',
      rating: 4.6,
      reviews: 76,
      completedProjects: 142,
      responseTime: '5 hours',
      verified: false,
      topRated: false,
      price: '$150-$450',
      skills: ['Sound Design', 'Audio Engineering', 'Effects'],
      recentReviews: [
        {
          author: 'Alex P.',
          rating: 5,
          text: 'Creative and unique sound design. Very satisfied!',
          date: '1 week ago',
        },
      ],
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setProducers(mockProducers)
      setLoading(false)
    }, 500)
  }, [])

  const specialties = ['all', 'Hip-Hop Producer', 'Mixing Engineer', 'Vocal Producer', 'Composer', 'Full Production', 'Sound Designer']

  const filteredProducers = producers.filter((producer) => {
    const matchesFilter = filter === 'all' || producer.specialty === filter
    const matchesSearch =
      producer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producer.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="producers-page">
      {/* Hero Section */}
      <section className="producers-hero">
        <div className="container">
          <div className="producers-hero-content">
            <h1 className="page-title">Find Top Music Producers</h1>
            <p className="page-subtitle">
              Connect with verified, professional music producers trusted by
              thousands of artists worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section producers-main-section">
        <div className="container">
          <div className="producers-controls">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search producers by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <Filter size={18} />
              <span className="filter-label">Specialty:</span>
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  className={`filter-btn ${filter === specialty ? 'active' : ''}`}
                  onClick={() => setFilter(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {/* Top Rated Producers */}
              <div className="top-rated-section">
                <h2 className="section-subtitle-left">
                  <TrendingUp size={28} />
                  Top Rated Producers
                </h2>
                <div className="producers-grid">
                  {filteredProducers
                    .filter((p) => p.topRated)
                    .map((producer) => (
                      <ProducerCard key={producer.id} producer={producer} isTopRated />
                    ))}
                </div>
              </div>

              {/* All Producers */}
              <div className="all-producers-section">
                <h2 className="section-subtitle-left">
                  All Producers ({filteredProducers.length})
                </h2>
                <div className="producers-grid">
                  {filteredProducers.map((producer) => (
                    <ProducerCard key={producer.id} producer={producer} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Are You a Producer?</h2>
            <p className="cta-subtitle">
              Join our platform and start getting clients today
            </p>
            <button className="btn btn-primary btn-large">
              Join as Producer
              <Award size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Producer Card Component
const ProducerCard = ({ producer, isTopRated }) => {
  const [showReviews, setShowReviews] = useState(false)

  return (
    <div className={`producer-card ${isTopRated ? 'top-rated-card' : ''}`}>
      {isTopRated && <div className="top-rated-badge">Top Rated</div>}
      
      <div className="producer-header">
        <div className="producer-avatar">{producer.avatar}</div>
        <div className="producer-basic-info">
          <div className="producer-name-wrapper">
            <h3 className="producer-name">{producer.name}</h3>
            {producer.verified && (
              <span className="verified-badge" title="Verified">
                ✓
              </span>
            )}
          </div>
          <p className="producer-specialty">{producer.specialty}</p>
          <p className="producer-location">
            <MapPin size={14} />
            {producer.location}
          </p>
        </div>
      </div>

      <div className="producer-stats">
        <div className="stat">
          <div className="stat-value">
            <Star size={16} fill="#fbbf24" color="#fbbf24" />
            {producer.rating}
          </div>
          <div className="stat-label">{producer.reviews} reviews</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <Award size={16} />
            {producer.completedProjects}
          </div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <MessageCircle size={16} />
            {producer.responseTime}
          </div>
          <div className="stat-label">Response</div>
        </div>
      </div>

      <div className="producer-skills">
        {producer.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="producer-price">
        <Music size={18} />
        <span>Starting at {producer.price}</span>
      </div>

      <div className="producer-reviews">
        <button
          className="reviews-toggle"
          onClick={() => setShowReviews(!showReviews)}
        >
          <ThumbsUp size={16} />
          {showReviews ? 'Hide' : 'Show'} Recent Reviews ({producer.recentReviews.length})
        </button>

        {showReviews && (
          <div className="reviews-list">
            {producer.recentReviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <span className="review-author">{review.author}</span>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
                <span className="review-date">{review.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="producer-actions">
        <button className="btn btn-primary">
          View Profile
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  )
}

export default Producers

