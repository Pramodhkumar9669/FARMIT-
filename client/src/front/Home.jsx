import Footer from "../components/equal/Footer";
import "../styles/F.css"; 

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url("/farmd.jpeg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px",
  };

  const features = [
    { icon: "🚜", title: "Smart Farm Management", description: "Efficiently organize and track farm activities." },
    { icon: "📈", title: "Investment Growth", description: "Maximize profits with data-driven investment insights." },
    { icon: "🏦", title: "Quick Loan Access", description: "Get financial support with our seamless loan system." },
    { icon: "🌍", title: "Sustainable Farming", description: "Adopt eco-friendly techniques for better yields." }
  ];

  return (
    <div className="home-container" style={backgroundStyle}>
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Farm IT</h1>
          <p className="hero-subtitle">
            Empowering Farmers and Investors for a Sustainable Future
          </p>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Why Choose Farm IT?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.icon} {feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
