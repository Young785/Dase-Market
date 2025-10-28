import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Eye,
  Clock,
  DollarSign,
  Filter,
  Search,
  Star,
  Play,
  ExternalLink,
} from 'lucide-react'
import { landingAPI } from '../config/api'
import './Adverts.css'

const Adverts = () => {
  const [adverts, setAdverts] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  // Mock data - Replace with actual API call
  const mockAdverts = [
    {
      id: 1,
      title: 'Professional Beat Production',
      description: 'High-quality beats for hip-hop, trap, and R&B artists. Custom tailored to your style.',
      category: 'Beats',
      price: 199,
      views: 1245,
      rating: 4.8,
      image: '🎵',
      producer: 'Mike Beats',
      featured: true,
      duration: '2-3 days',
    },
    {
      id: 2,
      title: 'Mixing & Mastering Service',
      description: 'Professional mixing and mastering for your tracks. Industry-standard quality guaranteed.',
      category: 'Mixing',
      price: 299,
      views: 987,
      rating: 4.9,
      image: '🎚️',
      producer: 'Sound Lab Pro',
      featured: true,
      duration: '3-5 days',
    },
    {
      id: 3,
      title: 'Vocal Recording Package',
      description: 'Complete vocal recording, tuning, and editing. Studio-quality results from home.',
      category: 'Recording',
      price: 149,
      views: 756,
      rating: 4.7,
      image: '🎤',
      producer: 'Vocal Masters',
      featured: false,
      duration: '1-2 days',
    },
    {
      id: 4,
      title: 'Custom Melody Creation',
      description: 'Original melodies for your songs. Multiple revisions included until perfection.',
      category: 'Melody',
      price: 179,
      views: 892,
      rating: 4.8,
      image: '🎹',
      producer: 'Melody Maker',
      featured: false,
      duration: '2-4 days',
    },
    {
      id: 5,
      title: 'Full Song Production',
      description: 'From concept to final master. Complete song production with unlimited revisions.',
      category: 'Production',
      price: 499,
      views: 1523,
      rating: 5.0,
      image: '🎼',
      producer: 'Elite Productions',
      featured: true,
      duration: '1-2 weeks',
    },
    {
      id: 6,
      title: 'Sound Design & Effects',
      description: 'Custom sound effects and audio design for films, games, and music.',
      category: 'Sound Design',
      price: 249,
      views: 634,
      rating: 4.6,
      image: '🔊',
      producer: 'Audio Wizards',
      featured: false,
      duration: '3-7 days',
    },
  ]

  useEffect(() => {
    fetchAdverts()
  }, [filter, searchTerm])

  const fetchAdverts = async (page = 1) => {
    setLoading(true)
    setError('')
    
    try {
      const params = {
        page,
        per_page: 12,
      }
      
      if (filter !== 'all') {
        params.category = filter
      }
      
      if (searchTerm) {
        params.search = searchTerm
      }
      
      const response = await landingAPI.getAdverts(params)
      
      if (response.data.success) {
        setAdverts(response.data.data.data || [])
        setPagination({
          currentPage: response.data.data.current_page,
          totalPages: response.data.data.last_page || 1,
          total: response.data.data.total,
        })
      }
    } catch (err) {
      console.error('Error fetching adverts:', err)
      setError('Failed to load services. Please try again.')
      // Fallback to mock data if API fails
      setAdverts(mockAdverts)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'Beats', 'Mixing', 'Recording', 'Melody', 'Production', 'Sound Design']

  const filteredAdverts = adverts.filter((ad) => {
    const matchesFilter = filter === 'all' || ad.category === filter
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = [
    { icon: <TrendingUp />, value: '2,500+', label: 'Active Services' },
    { icon: <Eye />, value: '100K+', label: 'Monthly Views' },
    { icon: <DollarSign />, value: '$500K+', label: 'Earned by Creators' },
    { icon: <Star />, value: '4.8', label: 'Average Rating' },
  ]

  return (
    <div className="adverts-page">
      {/* Hero Section */}
      <section className="adverts-hero">
        <div className="container">
          <div className="adverts-hero-content">
            <h1 className="page-title">Discover Creative Services & Opportunities</h1>
            <p className="page-subtitle">
              Browse through thousands of services from streamers, content creators, and audio professionals.
              Find the perfect collaboration or service for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="adverts-stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section adverts-main-section">
        <div className="container">
          <div className="adverts-controls">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <Filter size={18} />
              <span className="filter-label">Filter:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
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
              {/* Featured Adverts */}
              <div className="featured-section">
                <h2 className="section-subtitle-left">Featured Services</h2>
                <div className="grid grid-3">
                  {filteredAdverts
                    .filter((ad) => ad.featured)
                    .map((advert) => (
                      <div key={advert.id} className="advert-card featured-card">
                        <div className="featured-badge">Featured</div>
                        <div className="advert-image">{advert.image}</div>
                        <div className="advert-content">
                          <div className="advert-header">
                            <span className="advert-category">{advert.category}</span>
                            <span className="advert-price">${advert.price}</span>
                          </div>
                          <h3 className="advert-title">{advert.title}</h3>
                          <p className="advert-description">{advert.description}</p>
                          <div className="advert-meta">
                            <span className="meta-item">
                              <Eye size={16} />
                              {advert.views}
                            </span>
                            <span className="meta-item">
                              <Clock size={16} />
                              {advert.duration}
                            </span>
                            <span className="meta-item rating">
                              <Star size={16} fill="#fbbf24" color="#fbbf24" />
                              {advert.rating}
                            </span>
                          </div>
                          <div className="advert-footer">
                            <span className="producer-name">{advert.producer}</span>
                            <button className="btn-view">
                              View Details
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* All Adverts */}
              <div className="all-adverts-section">
                <h2 className="section-subtitle-left">
                  All Services ({filteredAdverts.length})
                </h2>
                <div className="grid grid-3">
                  {filteredAdverts.map((advert) => (
                    <div key={advert.id} className="advert-card">
                      {advert.featured && (
                        <div className="featured-badge">Featured</div>
                      )}
                      <div className="advert-image">{advert.image}</div>
                      <div className="advert-content">
                        <div className="advert-header">
                          <span className="advert-category">{advert.category}</span>
                          <span className="advert-price">${advert.price}</span>
                        </div>
                        <h3 className="advert-title">{advert.title}</h3>
                        <p className="advert-description">{advert.description}</p>
                        <div className="advert-meta">
                          <span className="meta-item">
                            <Eye size={16} />
                            {advert.views}
                          </span>
                          <span className="meta-item">
                            <Clock size={16} />
                            {advert.duration}
                          </span>
                          <span className="meta-item rating">
                            <Star size={16} fill="#fbbf24" color="#fbbf24" />
                            {advert.rating}
                          </span>
                        </div>
                        <div className="advert-footer">
                          <span className="producer-name">{advert.producer}</span>
                          <button className="btn-view">
                            View Details
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
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
            <h2 className="cta-title">Ready to Offer Your Services?</h2>
            <p className="cta-subtitle">
              Join thousands of creators and professionals earning through our platform
            </p>
            <button className="btn btn-primary btn-large">
              List Your Service
              <Play size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Adverts

