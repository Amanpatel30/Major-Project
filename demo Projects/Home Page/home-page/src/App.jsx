import './App.css'
import devProjectsLogo from './assets/db1645cc1ed95625a5dff41ee9a0f164.jpg'
import dataInterchangeImg from './assets/Data-Interchange.webp'

function App() {
  return (
    <>
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={devProjectsLogo} alt="DevProjects" />
        </div>
        <nav>
          <ul>
            <li><a href="#" className="nav-link">About</a></li>
            <li><a href="#" className="nav-link">Projects</a></li>
            <li><a href="#" className="nav-link">Resources</a></li>
            <li><a href="#" className="nav-link">Community</a></li>
            <li><a href="#" className="nav-link">Blog</a></li>
          </ul>
        </nav>
        <button className="get-started-btn">Get Started</button>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Code, Create,
                <br />
                <span className="highlight">Learn & Grow</span>
                <br />
                With Projects
              </h1>
              <p>Transform your coding journey through hands-on project experience. Join our community of passionate developers.</p>
              
              <div className="cta-box">
                <p>Start your coding journey with hands-on project experience</p>
                <div className="join-form">
                  <div className="form-header">
                    <span>Join our</span>
                    <span className="highlight">Developer Community</span>
                  </div>
                  <div className="form-inputs">
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <button className="start-btn">Start Learning</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src={dataInterchangeImg} alt="Programming Illustration" />
            </div>
          </div>
        </div>
      </main>
    
    </div>
    </>
  )
}

export default App

