const Career = () => {
    return (
        <div className="container section animate-fade-in">
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>CAREER</h1>

            <div className="glass" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '4rem' }}>
                <p style={{ fontSize: '1.25rem', color: 'white', marginBottom: '2rem', lineHeight: '1.4' }}>
                    At BROADCASTERS COMMUNITY TELEVISION, every quality individual commitment and our valued collective contributions toward the sustainable growth and development of BCTV digital platform remain sacrosanct.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Thank you for your interest and consideration to share your gift, talents, expertise and time with BROADCASTERS COMMUNITY TELEVISION. Be sure to checking right back on this page regularly for new openings and career updates. You are valued.
                </p>
            </div>

            <div className="glass" style={{ padding: '4rem', borderRadius: '24px', textAlign: 'center', border: '1px dashed var(--border-color)', background: 'transparent' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>No Current Openings</h3>
                <p style={{ color: 'var(--text-muted)' }}>We are always looking for passionate talents. Check back soon for new opportunities!</p>
            </div>
        </div>
    );
};

export default Career;
