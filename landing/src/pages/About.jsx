const About = () => {
    return (
        <div className="container section animate-fade-in">
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>ABOUT</h1>

            <div className="glass" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '4rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    A pained and disappointed but not defeated visionary individual is Sulaimon Salam Bamidele. He has proudly owned and successfully run internet powered (GREAT DREAMS RADIO) station consistently since 2015. Years before jumping-in on Project GDRStation, no established individuals in the industry or media companies approached were ready to employ him in mid-2000.
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Today, project Broadcasters Community Television (BCTV) is birthed through the tearful pains of an inborn gifted and professionally trained Broadcast Journalist, who once had no way desired to showcase and use his Broadcast Journalism talents. The project (BCTV) as part of PAVE BROADCASTERS COMMUNITY family is designed to be the helpful solution and readymade digital media pavement for new Broadcast Journalism enthusiasts.
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    The Video Domain of PAVE BROADCASTERS COMMUNITY; (Project BCTV) is conceptualized to be a thoughtful solution resolving issues related to the limitations of free speech, individual self-expression, and restricted access to the space where useful information could be shared and delivered to a large audience of interest at a material time of given necessity.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
                    Intentionally, the creative concept of Project BCTV is designed to ensure no one else would have to go through the said personal experience of project BCTV Initiator. In addition, the PAVE BROADCASTERS COMMUNITY TV solution accommodates the livestream and pre-produced content creators, music artists and other related professionals who are mostly comfortable using the preference of video productions to creating broadcast content conveying their messages to the world.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                    <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>Our Vision</h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Provide a space for the gifted individuals to showcasing their media profession skills, and integrate digital technology with the system of television broadcasting toward building the community, connection, and independence every Talent deserves to shine.
                    </p>
                </div>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                    <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>Our Mission</h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        To be a referenced domain where exceptional TV broadcast talents are readily discovered and gainfully contracted by individuals and media companies looking for expertise to help run own establishments.
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic' }}>
                    Herein domain of Broadcasters Community Television, we'd always remain committed towards the sustenance of our goals. You are warmly welcome to benefit onward as valued members of PAVE BROADCASTERS COMMUNITY.
                </p>
            </div>
        </div>
    );
};

export default About;
