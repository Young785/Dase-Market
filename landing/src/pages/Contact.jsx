import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // TODO: Replace with actual API endpoint
    // await axios.post('/api/landing/contact', formData)
    
    // Simulating API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: <Mail />,
      title: 'Email Us',
      info: 'info@dasemarket.com',
      subInfo: 'support@dasemarket.com',
    },
    {
      icon: <Phone />,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      subInfo: 'Mon-Fri 9am-6pm EST',
    },
    {
      icon: <MapPin />,
      title: 'Visit Us',
      info: '123 Market Street',
      subInfo: 'San Francisco, CA 94103',
    },
  ]

  const faqs = [
    {
      question: 'How quickly do you respond?',
      answer: 'We typically respond within 24 hours during business days.',
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes, phone support is available for premium plan members.',
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Absolutely! Contact us to schedule a personalized demo.',
    },
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="page-title">Get in Touch</h1>
            <p className="page-subtitle">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section contact-info-section">
        <div className="container">
          <div className="grid grid-3">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">{item.icon}</div>
                <h3 className="contact-info-title">{item.title}</h3>
                <p className="contact-info-text">{item.info}</p>
                <p className="contact-info-subtext">{item.subInfo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section contact-form-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-wrapper">
              <h2 className="form-title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="success-message">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* FAQ Sidebar */}
            <div className="contact-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-icon">
                  <MessageCircle size={32} />
                </div>
                <h3 className="sidebar-title">Quick Answers</h3>
                <p className="sidebar-description">
                  Find answers to commonly asked questions
                </p>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h4 className="faq-question">{faq.question}</h4>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="sidebar-card availability-card">
                <div className="sidebar-icon">
                  <Clock size={32} />
                </div>
                <h3 className="sidebar-title">Support Hours</h3>
                <div className="support-hours">
                  <div className="hour-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="hour-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="hour-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="map-section">
        <div className="map-placeholder">
          <MapPin size={48} />
          <p>123 Market Street, San Francisco, CA 94103</p>
        </div>
      </section>
    </div>
  )
}

export default Contact

