const BrandLogo = ({ className = "", size = "default", theme = "dark" }) => {
  const sizes = {
    small: "h-6",
    default: "h-8",
    large: "h-10"
  };

  const textColor = theme === "light" ? "text-white" : "text-dark";
  const subtextColor = theme === "light" ? "text-white-50" : "text-muted";

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <div className="d-flex align-items-center gap-2">
        <div className={`bg-primary text-white rounded d-flex align-items-center justify-content-center ${sizes[size]}`} 
             style={{ width: size === 'small' ? '24px' : size === 'large' ? '40px' : '32px', 
                      height: size === 'small' ? '24px' : size === 'large' ? '40px' : '32px' }}>
          <i className="ri-shield-star-line fs-18"></i>
        </div>
        <div className="text-start">
          <div className={`fw-bold ${textColor}`} style={{ fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px' }}>
            Dase Market
          </div>
          <div className={subtextColor} style={{ fontSize: size === 'small' ? '9px' : '10px', marginTop: '-4px' }}>
            Superadmin Portal
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;

