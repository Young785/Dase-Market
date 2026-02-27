import { Link } from 'react-router-dom';
import { Play, Users, Tv, Zap, Globe, Shield } from 'lucide-react';
import bctvLogo from '../assets/bctv_logo.png';
import pbcLogo from '../assets/pbc_logo.png';
import heroBg from '../assets/hero_bg.png';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Cinematic Background Image */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    background: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3)'
                }} />

                <div className="hero-overlay" />

                {/* Animated particles effect */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="animate-fade-in" style={{ maxWidth: '900px' }}>
                        <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '900' }}>
                            WELCOME TO THE (FACE FIREPOWER) DOMAIN OF TV BROADCASTING SOLUTIONS THAT MATTER.
                        </h1>
                        <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '700px', lineHeight: '1.6' }}>
                            We are BROADCASTERS COMMUNITY TELEVISION: The Revolutionary (FACE FIREPOWER) Machine Serving Your Visual Waves Interest.
                        </p>

                        <div style={{ display: 'flex', gap: '3.5rem', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
                            {/* Logo Section */}
                            <div className="animate-slide-left" style={{ textAlign: 'center' }}>
                                <div className="glass card-hover" style={{ width: '150px', height: '150px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', overflow: 'hidden', padding: '1rem', background: 'rgba(255,255,255,0.05)' }}>
                                    <img src={bctvLogo} alt="BROADCASTERS COMMUNITY TELEVISION BRAND LOGO, FACE FIREPOWER" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.1em' }}>BCTV BRAND LOGO</p>
                            </div>
                            <div className="animate-slide-right" style={{ textAlign: 'center' }}>
                                <div className="glass card-hover" style={{ width: '110px', height: '110px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', overflow: 'hidden', padding: '0.75rem', background: 'rgba(255,255,255,0.05)' }}>
                                    <img src={pbcLogo} alt="PAVE BROADCASTERS COMMUNITY BRAND LOGO, DIGITAL FIREPOWER" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.1em' }}>PBC PRIMARY LOGO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - NEW */}
            <section className="section" style={{ background: 'var(--surface-color)', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
                            Why Choose BCTV?
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Revolutionary broadcasting solutions designed for the modern content creator
                        </p>
                    </div>

                    <div className="feature-grid">
                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Tv size={35} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Professional Broadcasting</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                State-of-the-art streaming technology that delivers crystal-clear content to your audience worldwide.
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Users size={35} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Community Driven</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Join a thriving community of broadcasters and content creators sharing their passion with the world.
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Zap size={35} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Lightning Fast</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Ultra-low latency streaming ensures your content reaches viewers in real-time with zero delays.
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Globe size={35} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Global Reach</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Broadcast to audiences across the globe with our worldwide content delivery network.
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Shield size={35} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Secure & Reliable</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Enterprise-grade security and 99.9% uptime guarantee keeps your channel always accessible.
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Play size={35} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Easy to Use</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Intuitive interface designed for creators of all skill levels. Start broadcasting in minutes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - NEW */}
            <section className="section" style={{ background: 'var(--bg-color)', padding: '5rem 0' }}>
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item animate-fade-in">
                            <div className="stat-number">10K+</div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '600' }}>Active Broadcasters</p>
                        </div>
                        <div className="stat-item animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <div className="stat-number">50M+</div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '600' }}>Monthly Viewers</p>
                        </div>
                        <div className="stat-item animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="stat-number">99.9%</div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '600' }}>Uptime Guarantee</p>
                        </div>
                        <div className="stat-item animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <div className="stat-number">24/7</div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '600' }}>Support Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Gallery Section - NEW (Placeholder for Freepik images) */}
            <section className="section" style={{ background: 'var(--surface-color)', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
                            Experience the Power of Broadcasting
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            See how creators are transforming their content with BCTV
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Image placeholders - Replace with actual Freepik images */}
                        <div className="image-container glass" style={{ height: '300px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem' }}>
                                <Tv size={60} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                                    Add broadcasting studio image from Freepik<br/>
                                    (e.g., professional streaming setup)
                                </p>
                            </div>
                            <div className="image-overlay">
                                <p style={{ color: 'white', fontWeight: '600' }}>Professional Studio Setup</p>
                            </div>
                        </div>

                        <div className="image-container glass" style={{ height: '300px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem' }}>
                                <Users size={60} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                                    Add community/audience image from Freepik<br/>
                                    (e.g., diverse group watching content)
                                </p>
                            </div>
                            <div className="image-overlay">
                                <p style={{ color: 'white', fontWeight: '600' }}>Engaged Community</p>
                            </div>
                        </div>

                        <div className="image-container glass" style={{ height: '300px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem' }}>
                                <Globe size={60} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                                    Add global network image from Freepik<br/>
                                    (e.g., world map with connections)
                                </p>
                            </div>
                            <div className="image-overlay">
                                <p style={{ color: 'white', fontWeight: '600' }}>Worldwide Reach</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '16px', border: '1px dashed var(--primary-color)' }}>
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            <strong style={{ color: 'var(--primary-color)' }}>📸 Image Recommendations:</strong> Download high-quality images from Freepik.com:<br/>
                            • Broadcasting studio/streaming setup<br/>
                            • Content creators at work<br/>
                            • Audience/community engagement<br/>
                            • Technology/network graphics<br/>
                            • Professional video production scenes<br/>
                            Save images to <code style={{ background: 'var(--surface-color)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>landing/src/assets/</code> and update the image sources above.
                        </p>
                    </div>
                </div>
            </section>

            {/* Action Sections */}
            <section className="section" style={{ background: 'var(--bg-color)', position: 'relative', zIndex: 1, padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>

                        {/* Sign Up Card */}
                        <div className="glass animate-fade-in card-hover" style={{ padding: '3.5rem 2.5rem', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))' }}>
                            <div style={{ width: '60px', height: '60px', background: 'var(--primary-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Users size={30} color="white" />
                            </div>
                            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.85rem', color: 'var(--text-main)' }}>Hello to you the sweet, charming and endearing camera hogs!</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                                Yikes! It's your best decision ever. Welcome, we are glad to have you. Please use the button below to create your independent Broadcasters Community Television Channel and share with the world.
                            </p>
                            <button className="btn btn-primary w-full" style={{ width: '100%', padding: '1.1rem', fontSize: '1rem', fontWeight: '700' }}>
                                CLICK HERE TO SIGN UP
                            </button>
                            <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
                                * Sign-up phrase will be clickable soon
                            </p>
                        </div>

                        {/* Sign In Card */}
                        <div className="glass animate-fade-in card-hover" style={{ padding: '3.5rem 2.5rem', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))' }}>
                            <div style={{ width: '60px', height: '60px', background: 'var(--accent-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Shield size={30} color="white" />
                            </div>
                            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.85rem', color: 'var(--text-main)' }}>Valued Returning Member</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                                We appreciate you and your ongoing loyalty. Thank you! Please use the button below to access and manage your existing BCTV account. Let's go!
                            </p>
                            <button className="btn btn-outline w-full" style={{ width: '100%', padding: '1.1rem', fontSize: '1rem', fontWeight: '700' }}>
                                CLICK HERE TO SIGN-IN
                            </button>
                            <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
                                * Sign-in phrase will be clickable soon
                            </p>
                        </div>

                    </div>

                    <div style={{ textAlign: 'center', marginTop: '8rem' }}>
                        <div className="animate-float" style={{ display: 'inline-block' }}>
                            <h3 style={{ fontSize: '1.6rem', letterSpacing: '0.3em', color: 'var(--text-muted)', opacity: 0.8, fontWeight: '700' }}>
                                BROADCASTERS COMMUNITY TELEVISION
                            </h3>
                            <p style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginTop: '0.5rem', fontWeight: '600' }}>
                                THE FACE FIREPOWER SOLUTIONS
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
