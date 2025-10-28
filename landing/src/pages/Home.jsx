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
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: <Music />,
      title: 'Top Producers',
      description: 'Connect with award-winning music producers and sound engineers.',
    },
    {
      icon: <TrendingUp />,
      title: 'Smart Analytics',
      description: 'Track your performance with real-time analytics and insights.',
    },
    {
      icon: <Shield />,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing for all transactions.',
    },
    {
      icon: <Zap />,
      title: 'Fast Delivery',
      description: 'Quick turnaround times for all your production needs.',
    },
  ]

  const stats = [
    { number: '10K+', label: 'Active Producers' },
    { number: '50K+', label: 'Projects Completed' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Independent Artist',
      image: '👩‍🎤',
      rating: 5,
      text: 'Dase Market connected me with an amazing producer who understood my vision perfectly. The entire process was seamless!',
    },
    {
      name: 'Marcus Chen',
      role: 'Record Label Owner',
      image: '👨‍💼',
      rating: 5,
      text: 'The quality of producers on this platform is outstanding. We\'ve found our go-to team for all our projects.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Music Producer',
      image: '👩‍🎨',
      rating: 5,
      text: 'As a producer, this platform has helped me reach more clients and grow my business significantly.',
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
              Connect with Top
              <span className="gradient-text"> Music Producers</span>
              <br />
              and Grow Your Sound
            </h1>
            <p className="hero-subtitle">
              The premier marketplace for music producers, artists, and labels.
              Find the perfect collaborator, manage your projects, and take your
              music to the next level.
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
                <h3>Create Your Profile</h3>
                <p>
                  Sign up and set up your profile in minutes. Tell us about your
                  music style and what you're looking for.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Browse Producers</h3>
                <p>
                  Explore our curated list of talented producers. Check reviews,
                  listen to samples, and find your perfect match.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Start Creating</h3>
                <p>
                  Connect with producers, manage your projects, and create
                  amazing music together.
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
            <h2 className="cta-title">Ready to Elevate Your Music?</h2>
            <p className="cta-subtitle">
              Join thousands of artists and producers already creating amazing music.
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

