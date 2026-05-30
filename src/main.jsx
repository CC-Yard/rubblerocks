import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Landmark,
  MapPinned,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sprout,
  Mail,
} from 'lucide-react';
import './styles.css';

const WEB3FORMS_ACCESS_KEY = "0bf8768c-4cb0-4915-8f34-4a7b76a0cfe3";

const services = [
  {
    icon: Building2,
    title: 'Real Estate Development',
    text: 'End-to-end planning, approvals, design coordination, construction oversight, and delivery for residential and mixed-use projects.',
  },
  {
    icon: MapPinned,
    title: 'Land Development',
    text: 'Site evaluation, plotting strategy, infrastructure planning, clear documentation, and value creation for raw and semi-developed land.',
  },
  {
    icon: Landmark,
    title: 'Land Marketing',
    text: 'Positioning, buyer outreach, investor decks, channel partner programs, and campaign support for premium land parcels.',
  },
  {
    icon: Factory,
    title: 'Commercial Advisory',
    text: 'Location strategy, acquisition support, redevelopment feasibility, and market insight for commercial and industrial assets.',
  },
];



const insights = [
  'How plotted developments create long-term value in emerging corridors',
  'What buyers check before investing in land parcels',
  'Infrastructure-led growth: choosing the next development zone',
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Allow only numbers and cap at exactly 10 digits
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      alert('Please configure your Web3Forms access key at the top of src/main.jsx to receive emails!');
      return;
    }

    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          phone: formData.phone,
          service_interest: formData.service,
          message: formData.message,
          subject: `New RubbleRock Lead: ${formData.name}`,
          from_name: 'RubbleRock Website',
        }),
      });

      const result = await response.json();
      if (response.status === 200 || result.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', phone: '', service: '', message: '' });
      } else {
        setStatus({ submitting: false, success: false, error: result.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: 'Failed to send enquiry. Please check your connection.' });
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="RubbleRock home">
          <span className="brand-mark">RR</span>
          <span>RubbleRock</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#insights">Insights</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="call-link" href="tel:+910000000000">
            <Phone size={18} />
            Talk to us
          </a>
          <button className="icon-button mobile-menu" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Builders | Land Developers | Land Marketing</p>
          <h1>Real estate partnerships built around land, trust, and growth.</h1>
          <p>
            We help landowners, investors, and buyers move from opportunity to
            well-planned real estate outcomes with clear strategy and disciplined
            execution.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Start a conversation
              <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#services">Explore services</a>
          </div>
        </div>
      </section>


      <section id="services" className="section">
        <div className="section-heading">
          <p className="eyebrow">Find a service</p>
          <h2>Specialist real estate services for every stage of land value.</h2>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }) => (
            <article className="service-card" key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact">
                Learn more
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="promise">
          <ShieldCheck size={34} />
          <h2>Clear documentation, practical guidance, and relationships that last beyond the transaction.</h2>
        </div>
      </section>

      <section id="approach" className="section approach">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Our Methodology</p>
            <h2>A disciplined approach to land and development.</h2>
          </div>
          <a className="text-link" href="#contact">
            Discuss a mandate
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="approach-grid">
          <div className="approach-card">
            <span className="step-number">01</span>
            <h3>Valuation & Evaluation</h3>
            <p>We conduct thorough physical inspections, local market research, and zoning feasibility reviews to uncover the true value potential of your asset.</p>
          </div>
          <div className="approach-card">
            <span className="step-number">02</span>
            <h3>Strategy Formulation</h3>
            <p>Developing tailored plotting strategies, Joint Venture (JV) feasibility models, and high-conversion positioning programs custom-built for prime buyers.</p>
          </div>
          <div className="approach-card">
            <span className="step-number">03</span>
            <h3>Compliance & Due Diligence</h3>
            <p>Rigorous structural verification, title history search, and document collation to ensure absolute zero-friction compliance and legal clarity.</p>
          </div>
          <div className="approach-card">
            <span className="step-number">04</span>
            <h3>Mandate Execution</h3>
            <p>Leveraging deep local network ties, builder partnerships, and active marketing campaigns to close land deals with absolute transparency.</p>
          </div>
        </div>
      </section>

      <section className="section sectors">
        <div className="section-heading">
          <p className="eyebrow">Browse by sector</p>
          <h2>Focused support across high-demand real estate categories.</h2>
        </div>
        <div className="sector-list">
          {['Residential', 'Plotted Development', 'Farm Land', 'Commercial', 'Industrial', 'Mixed Use'].map((item) => (
            <span key={item}>
              <CheckCircle2 size={18} />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="insights" className="insights">
        <div>
          <p className="eyebrow">Insight & opinion</p>
          <h2>Market thinking for confident property decisions.</h2>
        </div>
        <div className="insight-list">
          {insights.map((item) => (
            <a href="#contact" key={item}>
              <Sprout size={20} />
              <span>{item}</span>
              <ArrowRight size={17} />
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div>
          <p className="eyebrow">Have a question?</p>
          <h2>Tell us your property ambition. We will help shape the next move.</h2>
          <address className="contact-info">
            <div className="info-title">RubbleRock Enterprises Private Limited</div>
            <div className="info-item">
              <MapPinned size={18} />
              <div>
                <span>Regus - Bangalore World Trade Centre</span>
                <span>22nd Floor, World Trade Center 26/1, Dr Rajkumar Road</span>
                <span>Malleshwaram, Bengaluru, Karnataka 560055</span>
              </div>
            </div>
            <div className="info-item">
              <Phone size={18} />
              <a href="tel:+919739295374">+91 9739295374</a>
            </div>
            <div className="info-item">
              <Mail size={18} />
              <a href="mailto:ramesh@rubblerock.in">ramesh@rubblerock.in</a>
            </div>
          </address>
        </div>
        {status.success ? (
          <div className="contact-success">
            <CheckCircle2 size={48} className="success-icon" />
            <h3>Enquiry Sent!</h3>
            <p>Thank you for reaching out. We will review your property ambition and get back to you shortly.</p>
            <button className="secondary-button" onClick={() => setStatus({ submitting: false, success: false, error: null })}>
              Send another enquiry
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="ccemail" value="ramesh@rubblerocks.in" />
            <div className="input-group">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-label="Name"
                placeholder="Name"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-label="Phone"
                placeholder="Phone (10 digits)"
                required
              />
            </div>
            <div className="input-group full-width">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                aria-label="Service interest"
                defaultValue=""
              >
                <option value="" disabled>Service interest</option>
                <option value="Real estate development">Real estate development</option>
                <option value="Land development">Land development</option>
                <option value="Land marketing">Land marketing</option>
                <option value="Buying or selling">Buying or selling</option>
              </select>
            </div>
            <div className="input-group full-width">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                aria-label="Message"
                placeholder="Briefly describe your requirement"
              />
            </div>
            {status.error && <p className="form-error">{status.error}</p>}
            <button type="submit" className="submit-button" disabled={status.submitting}>
              {status.submitting ? 'Sending...' : 'Send enquiry'}
              <ArrowRight size={18} />
            </button>
          </form>
        )}
      </section>

      <footer>
        <strong>RubbleRock Enterprises Private Limited</strong>
        <span>Regus - Bangalore World Trade Centre, Bengaluru, Karnataka 560055</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
