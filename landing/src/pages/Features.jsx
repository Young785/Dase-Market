import {
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  Headphones,
  CreditCard,
  Cloud,
  Lock,
  Bell,
  FileText,
  Video,
} from 'lucide-react'
import './Features.css'

const Features = () => {
  const mainFeatures = [
    {
      icon: <Users />,
      title: 'Producer Matching',
      description:
        'Advanced AI-powered matching algorithm to find the perfect producer for your unique style and needs.',
      image: '🤝',
    },
    {
      icon: <BarChart3 />,
      title: 'Advanced Analytics',
      description:
        'Comprehensive analytics dashboard to track your projects, earnings, and performance metrics in real-time.',
      image: '📊',
    },
    {
      icon: <Shield />,
      title: 'Secure Payments',
      description:
        'Industry-leading payment security with escrow protection. Your money is safe until you\'re satisfied.',
      image: '🔒',
    },
    {
      icon: <Video />,
      title: 'Live Collaboration',
      description:
        'Real-time collaboration tools including video chat, file sharing, and version control for seamless workflow.',
      image: '🎥',
    },
  ]

  const additionalFeatures = [
    {
      icon: <Zap />,
      title: 'Lightning Fast',
      description: 'Optimized performance for quick loading and smooth experience.',
    },
    {
      icon: <Globe />,
      title: 'Global Network',
      description: 'Connect with producers and artists from over 50 countries.',
    },
    {
      icon: <Headphones />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you succeed.',
    },
    {
      icon: <CreditCard />,
      title: 'Flexible Payments',
      description: 'Multiple payment options including subscriptions and pay-as-you-go.',
    },
    {
      icon: <Cloud />,
      title: 'Cloud Storage',
      description: 'Unlimited cloud storage for all your project files and assets.',
    },
    {
      icon: <Lock />,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared without permission.',
    },
    {
      icon: <Bell />,
      title: 'Smart Notifications',
      description: 'Stay updated with intelligent notifications about your projects.',
    },
    {
      icon: <FileText />,
      title: 'Contract Templates',
      description: 'Pre-made legal templates to protect your work and rights.',
    },
  ]

  const integrations = [
    { name: 'Spotify', icon: '🎵' },
    { name: 'Apple Music', icon: '🍎' },
    { name: 'SoundCloud', icon: '☁️' },
    { name: 'YouTube', icon: '📺' },
    { name: 'Dropbox', icon: '📦' },
    { name: 'Google Drive', icon: '📁' },
  ]

  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="container">
          <div className="features-hero-content">
            <h1 className="page-title">Powerful Features for Creators</h1>
            <p className="page-subtitle">
              Everything you need to create, collaborate, and succeed in the music
              industry—all in one platform.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="section main-features-section">
        <div className="container">
          <div className="main-features-grid">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="main-feature-card">
                <div className="main-feature-image">{feature.image}</div>
                <div className="main-feature-content">
                  <div className="main-feature-icon">{feature.icon}</div>
                  <h3 className="main-feature-title">{feature.title}</h3>
                  <p className="main-feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="section additional-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">More Features to Love</h2>
            <p className="section-subtitle">
              Packed with tools and features to make your workflow effortless
            </p>
          </div>
          <div className="grid grid-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-item-icon">{feature.icon}</div>
                <h3 className="feature-item-title">{feature.title}</h3>
                <p className="feature-item-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="section integrations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Seamless Integrations</h2>
            <p className="section-subtitle">
              Connect with your favorite platforms and tools
            </p>
          </div>
          <div className="integrations-grid">
            {integrations.map((integration, index) => (
              <div key={index} className="integration-card">
                <div className="integration-icon">{integration.icon}</div>
                <div className="integration-name">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience All Features?</h2>
            <p className="cta-subtitle">
              Start your free trial today and unlock the full potential
            </p>
            <button className="btn btn-primary btn-large">
              Start Free Trial
              <Zap size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features

