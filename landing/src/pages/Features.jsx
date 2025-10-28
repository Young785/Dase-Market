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
      icon: <Video />,
      title: 'Live Streaming & Content',
      description:
        'Stream live to your audience, upload videos and shorts, create playlists, and build your community with real-time engagement.',
      image: '📺',
    },
    {
      icon: <Users />,
      title: 'DASE Marketplace',
      description:
        'Connect with professional Digital Audio Sound Engineers. Browse portfolios, listen to samples, and hire experts for your audio production needs.',
      image: '🎵',
    },
    {
      icon: <BarChart3 />,
      title: 'Advanced Analytics',
      description:
        'Track stream views, engagement metrics, project progress, earnings, and performance across all your content and collaborations.',
      image: '📊',
    },
    {
      icon: <Shield />,
      title: 'Secure Platform',
      description:
        'Industry-leading security with payment protection, content moderation, and professional billing through our invoice system.',
      image: '🔒',
    },
  ]

  const additionalFeatures = [
    {
      icon: <Zap />,
      title: 'Lightning Fast Streaming',
      description: 'Optimized infrastructure for smooth live streaming and instant content delivery.',
    },
    {
      icon: <Globe />,
      title: 'Global Community',
      description: 'Connect with streamers, creators, and audio engineers from over 50 countries.',
    },
    {
      icon: <Headphones />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for technical and business inquiries.',
    },
    {
      icon: <CreditCard />,
      title: 'Invoice System',
      description: 'Professional invoice creation and management for audio engineers and clients.',
    },
    {
      icon: <Cloud />,
      title: 'Cloud Storage',
      description: 'Secure cloud storage for streams, videos, audio files, and project assets.',
    },
    {
      icon: <Lock />,
      title: 'Privacy & Security',
      description: 'End-to-end encryption for messages, payments, and file transfers.',
    },
    {
      icon: <Bell />,
      title: 'Real-Time Notifications',
      description: 'Get instant alerts for stream comments, new projects, and invoice updates.',
    },
    {
      icon: <FileText />,
      title: 'Project Management',
      description: 'Complete workflow tools for managing audio production projects and collaborations.',
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
            <h1 className="page-title">Powerful Features for Every Creator</h1>
            <p className="page-subtitle">
              Everything you need to stream, create content, collaborate with audio professionals,
              and succeed in the creative industry—all in one comprehensive platform.
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

