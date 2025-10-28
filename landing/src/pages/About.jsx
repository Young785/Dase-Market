import { Target, Eye, Heart, Users, TrendingUp, Award } from 'lucide-react'
import './About.css'

const About = () => {
  const values = [
    {
      icon: <Target />,
      title: 'Mission Driven',
      description: 'Empowering creators, streamers, and audio professionals to thrive in the digital age.',
    },
    {
      icon: <Eye />,
      title: 'Visionary',
      description: 'Building the future of content creation, streaming, and audio production collaboration.',
    },
    {
      icon: <Heart />,
      title: 'Passionate',
      description: 'Deeply committed to the success of every creator, streamer, and audio engineer.',
    },
    {
      icon: <Users />,
      title: 'Community First',
      description: 'Fostering a supportive and inclusive community for all types of creators.',
    },
  ]

  // Static team data - Update with your actual team members
  const team = [
    {
      name: 'David Martinez',
      role: 'Founder & CEO',
      image: '👨‍💼',
      bio: '15 years in music production',
    },
    {
      name: 'Sarah Lee',
      role: 'Head of Product',
      image: '👩‍💻',
      bio: 'Tech innovator & music lover',
    },
    {
      name: 'James Wilson',
      role: 'Community Manager',
      image: '👨‍🎤',
      bio: 'Connecting creators worldwide',
    },
    {
      name: 'Lisa Chen',
      role: 'Marketing Director',
      image: '👩‍🎨',
      bio: 'Brand strategist & artist',
    },
  ]

  const milestones = [
    { year: '2020', event: 'Platform Launched with DASE Marketplace', icon: <Award /> },
    { year: '2021', event: 'Live Streaming Feature Introduced', icon: <Users /> },
    { year: '2022', event: '10,000+ Creators & 50,000+ Projects', icon: <TrendingUp /> },
    { year: '2024', event: 'Expanded to 50+ Countries Worldwide', icon: <Target /> },
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="page-title">About Dase Market</h1>
            <p className="page-subtitle">
              A comprehensive creative platform revolutionizing how content creators, streamers,
              and audio professionals connect, collaborate, and bring their visions to life.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <div className="image-placeholder">
                <Music size={80} />
              </div>
            </div>
            <div className="story-content">
              <h2 className="section-title-left">Our Story</h2>
              <p>
                Dase Market was born from a vision to create a unified platform where content
                creators, streamers, and audio professionals could thrive together. We recognized
                the need for a space that combines live streaming, content sharing, and professional
                audio engineering services.
              </p>
              <p>
                Founded in 2020, we built two powerful ecosystems: a Live Streaming Platform for
                content creators to broadcast, upload videos and shorts, and build communities; and
                the DASE Marketplace (Digital Audio Sound Engineers) connecting audio professionals
                with clients needing high-quality production services.
              </p>
              <p>
                Today, we're proud to serve a vibrant community of over 15,000 creators including
                streamers, artists, and audio engineers across 50+ countries, facilitating thousands
                of streams, uploads, and professional collaborations every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-4">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="section milestones-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Key milestones in our growth
            </p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-icon">{milestone.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <div className="timeline-event">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind Dase Market
            </p>
          </div>
          <div className="grid grid-4">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">{member.image}</div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Community</h2>
            <p className="cta-subtitle">
              Be part of a growing network of creative professionals
            </p>
            <button className="btn btn-primary btn-large">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Import at the top with other imports
import { Music } from 'lucide-react'

export default About

