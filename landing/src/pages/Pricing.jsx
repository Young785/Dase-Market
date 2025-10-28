import { useState } from 'react'
import { Check, X, Zap, Star, Award } from 'lucide-react'
import './Pricing.css'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual artists getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: <Zap />,
      color: 'var(--primary-color)',
      popular: false,
      features: [
        { name: 'Browse producers', included: true },
        { name: 'Basic messaging', included: true },
        { name: 'Up to 3 projects/month', included: true },
        { name: '5GB cloud storage', included: true },
        { name: 'Standard support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom contracts', included: false },
      ],
    },
    {
      name: 'Professional',
      description: 'For serious artists and producers',
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: <Star />,
      color: 'var(--secondary-color)',
      popular: true,
      features: [
        { name: 'Everything in Starter', included: true },
        { name: 'Unlimited projects', included: true },
        { name: '50GB cloud storage', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Video collaboration', included: true },
        { name: 'Custom contracts', included: false },
        { name: 'API access', included: false },
      ],
    },
    {
      name: 'Enterprise',
      description: 'For labels and professional studios',
      monthlyPrice: 99,
      yearlyPrice: 990,
      icon: <Award />,
      color: '#10b981',
      popular: false,
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'Unlimited cloud storage', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom contracts', included: true },
        { name: 'API access', included: true },
        { name: 'White-label options', included: true },
        { name: 'Custom integrations', included: true },
      ],
    },
  ]

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required.',
    },
    {
      question: 'What happens if I cancel?',
      answer: 'You can cancel anytime. You\'ll have access until the end of your billing period.',
    },
  ]

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getSavings = (plan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
      const yearlySavings = plan.monthlyPrice * 12 - plan.yearlyPrice
      return `Save $${yearlySavings}`
    }
    return null
  }

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <h1 className="page-title">Simple, Transparent Pricing</h1>
            <p className="page-subtitle">
              Choose the perfect plan for your needs. Always know what you'll pay.
            </p>
            
            {/* Billing Toggle */}
            <div className="billing-toggle">
              <button
                className={billingCycle === 'monthly' ? 'active' : ''}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={billingCycle === 'yearly' ? 'active' : ''}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
                <span className="savings-badge">Save 17%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="section pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.popular ? 'popular-card' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                
                <div className="pricing-card-header">
                  <div
                    className="plan-icon"
                    style={{ background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)` }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="pricing-card-price">
                  <div className="price-wrapper">
                    <span className="currency">$</span>
                    <span className="price">{getPrice(plan)}</span>
                    <span className="period">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {getSavings(plan) && (
                    <div className="savings-text">{getSavings(plan)}</div>
                  )}
                </div>

                <button className="btn btn-primary btn-large">
                  {plan.monthlyPrice === 0 ? 'Get Started Free' : 'Start Free Trial'}
                </button>

                <div className="features-list">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`feature-item ${!feature.included ? 'disabled' : ''}`}
                    >
                      {feature.included ? (
                        <Check size={20} className="check-icon" />
                      ) : (
                        <X size={20} className="x-icon" />
                      )}
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section comparison-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Compare Plans</h2>
            <p className="section-subtitle">
              See all features side by side
            </p>
          </div>
          <div className="comparison-note">
            <p>All plans include basic features like profile creation, search, and messaging.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Still Have Questions?</h2>
            <p className="cta-subtitle">
              Our team is here to help you choose the right plan
            </p>
            <button className="btn btn-primary btn-large">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing

