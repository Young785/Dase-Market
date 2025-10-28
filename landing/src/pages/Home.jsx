import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Music,
  Users,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Star,
  Play,
  ArrowRight,
} from 'lucide-react'
import { landingAPI } from '../config/api'
import './Home.css'

const Home = () => {
  const [statistics, setStatistics] = useState(null)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await landingAPI.getStatistics()
      if (response.data.success) {
        setStatistics(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching statistics:', err)
    }
  }
  const features = [
    {
      icon: <Play />,
      title: 'Live Streaming',
      description: 'Stream live to your audience, upload videos, shorts, and build your community with playlists.',
    },
    {
      icon: <Music />,
      title: 'DASE Marketplace',
      description: 'Connect with professional Digital Audio Sound Engineers for your production needs.',
    },
    {
      icon: <TrendingUp />,
      title: 'Smart Analytics',
      description: 'Track your performance with real-time analytics and insights for streams and projects.',
    },
    {
      icon: <Shield />,
      title: 'Secure Platform',
      description: 'Safe and secure platform with payment protection and content moderation.',
    },
  ]

  const getStats = () => {
    if (statistics) {
      return [
        { number: `${Math.floor(statistics.total_producers / 1000)}K+`, label: 'Active Creators' },
        { number: `${Math.floor(statistics.total_projects / 1000)}K+`, label: 'Projects Completed' },
        { number: `${Math.round(statistics.average_rating * 20)}%`, label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Live Streaming' },
      ]
    }
    return [
      { number: '15K+', label: 'Active Creators' },
      { number: '50K+', label: 'Projects Completed' },
      { number: '98%', label: 'Satisfaction Rate' },
      { number: '24/7', label: 'Live Streaming' },
    ]
  }

  const stats = getStats()

  // Static testimonials - Update these as needed
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator & Streamer',
      image: '👩‍🎤',
      rating: 5,
      text: 'This platform is incredible! I can stream, upload content, and even find audio engineers for my productions. Everything in one place!',
    },
    {
      name: 'Marcus Chen',
      role: 'Digital Audio Sound Engineer',
      image: '👨‍💼',
      rating: 5,
      text: 'The DASE Marketplace has transformed my business. I get consistent clients and the platform makes project management so easy.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Independent Artist',
      image: '👩‍🎨',
      rating: 5,
      text: 'I love how I can showcase my music, stream live performances, and connect with professional engineers all on one platform.',
    },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Award size={16} />
              <span>Trusted by 10,000+ Creatives</span>
            </div>
            <h1 className="hero-title">
              The Ultimate Platform for
              <span className="gradient-text"> Creators & Streamers</span>
              <br />
              Audio Engineers & Artists
            </h1>
            <p className="hero-subtitle">
              A complete creative ecosystem connecting streamers, digital audio sound engineers,
              artists, and content creators. Stream live, showcase your work, find professional
              audio engineers, and grow your creative career—all in one place.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <button className="btn btn-secondary btn-large">
                <Play size={20} />
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Dase Market?</h2>
            <p className="section-subtitle">
              Everything you need to succeed in the music industry, all in one place.
            </p>
          </div>
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started in three simple steps
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Account</h3>
                <p>
                  Sign up as a Streamer, Audio Engineer, or Client. Set up your
                  profile and tell us about your creative goals and expertise.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Explore & Connect</h3>
                <p>
                  Stream content, browse the DASE Marketplace, upload your work,
                  and connect with other creatives in the community.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Grow Your Career</h3>
                <p>
                  Build your audience, collaborate on projects, monetize your skills,
                  and take your creative career to new heights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Join thousands of satisfied artists and producers
            </p>
          </div>
          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-image">{testimonial.image}</div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Join Our Creative Community?</h2>
            <p className="cta-subtitle">
              Join thousands of streamers, artists, and audio engineers already creating amazing content.
            </p>
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Your Free Trial
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

