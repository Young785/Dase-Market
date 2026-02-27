import { Heart, Target, Lightbulb, Users, Award, Sparkles } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))', padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />
                <div className="container animate-fade-in">
                    <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', textAlign: 'center' }}>ABOUT BCTV</h1>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        Born from passion, built for creators
                    </p>
                </div>
            </section>

            <div className="container section">
                {/* Story Section */}
                <div className="glass card-hover" style={{ padding: '3.5rem', borderRadius: '32px', marginBottom: '5rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={26} color="white" />
                        </div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', margin: 0 }}>Our Story</h2>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            A pained and disappointed but not defeated visionary individual is Sulaimon Salam Bamidele. He has proudly owned and successfully run internet powered (GREAT DREAMS RADIO) station consistently since 2015. Years before jumping-in on Project GDRStation, no established individuals in the industry or media companies approached were ready to employ him in mid-2000.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            Today, project Broadcasters Community Television (BCTV) is birthed through the tearful pains of an inborn gifted and professionally trained Broadcast Journalist, who once had no way desired to showcase and use his Broadcast Journalism talents. The project (BCTV) as part of PAVE BROADCASTERS COMMUNITY family is designed to be the helpful solution and readymade digital media pavement for new Broadcast Journalism enthusiasts.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            The Video Domain of PAVE BROADCASTERS COMMUNITY; (Project BCTV) is conceptualized to be a thoughtful solution resolving issues related to the limitations of free speech, individual self-expression, and restricted access to the space where useful information could be shared and delivered to a large audience of interest at a material time of given necessity.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            Intentionally, the creative concept of Project BCTV is designed to ensure no one else would have to go through the said personal experience of project BCTV Initiator. In addition, the PAVE BROADCASTERS COMMUNITY TV solution accommodates the livestream and pre-produced content creators, music artists and other related professionals who are mostly comfortable using the preference of video productions to creating broadcast content conveying their messages to the world.
                        </p>
                    </div>
                </div>

                {/* Vision & Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
                    <div className="glass card-hover" style={{ padding: '3rem', borderRadius: '28px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), transparent)' }}>
                        <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <Target size={35} color="white" />
                        </div>
                        <h2 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Our Vision</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                            Provide a space for the gifted individuals to showcasing their media profession skills, and integrate digital technology with the system of television broadcasting toward building the community, connection, and independence every Talent deserves to shine.
                        </p>
                    </div>
                    
                    <div className="glass card-hover" style={{ padding: '3rem', borderRadius: '28px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), transparent)' }}>
                        <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <Lightbulb size={35} color="white" />
                        </div>
                        <h2 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Our Mission</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                            To be a referenced domain where exceptional TV broadcast talents are readily discovered and gainfully contracted by individuals and media companies looking for expertise to help run own establishments.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div style={{ marginBottom: '5rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Our Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="glass card-hover" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <Users size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Community First</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Building connections that empower creators</p>
                        </div>
                        <div className="glass card-hover" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <Award size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Excellence</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Delivering quality in every broadcast</p>
                        </div>
                        <div className="glass card-hover" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <Sparkles size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '1.3rem' }}>Innovation</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Pioneering the future of broadcasting</p>
                        </div>
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="glass" style={{ padding: '3rem', borderRadius: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08))' }}>
                    <Sparkles size={50} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem' }} />
                    <p style={{ color: 'var(--text-main)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontStyle: 'italic' }}>
                        Herein domain of Broadcasters Community Television, we'd always remain committed towards the sustenance of our goals. You are warmly welcome to benefit onward as valued members of PAVE BROADCASTERS COMMUNITY.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
