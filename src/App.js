import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Navigation from './components/Navigation';
import { Grow } from '@mui/material';
import './App.css'; // Make sure to import the CSS file for any custom styles

const App = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingUp(false);
        setShowNav(false);
      } else {
        setScrollingUp(true);
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Intersection Observer to animate the cards when they come into view
  const observer = useRef();

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const [entry] = entries;
      setInView(entry.isIntersecting);
    };

    const options = {
      rootMargin: '0px 0px -100px 0px', // Trigger the animation a bit before they come fully into view
    };

    observer.current = new IntersectionObserver(handleIntersection, options);
    const cardElements = document.querySelectorAll('.experience-card');
    cardElements.forEach((el) => observer.current.observe(el));

    return () => {
      observer.current.disconnect();
    };
  }, []);

  return (
    <div className="gradient-background min-h-screen bg-cover bg-fixed">
      <Navigation showNav={showNav} />
      <main>
        {/* About Me Section with Fade-In */}
        <section id="aboutme" className="h-screen p-8 flex flex-col justify-center items-center">
          <animated.div style={fadeInProps}>
            <div className="flex items-center justify-center space-x-8">
              <Grow in={true} timeout={1000}>
                <img src="/bhavya.png" alt="Sketch of Bhavya" className="w-1/3 mb-4" />
              </Grow>
              <div>
                <h2 className="text-4xl font-bold text-center text-gray-800">Hi, I'm Bhavya</h2>
                <p className="mt-4 text-center max-w-2xl text-gray-700">
                  Welcome to my portfolio! I am Bhavya, a passionate developer looking forward to collaborating with great minds.
                </p>
              </div>
            </div>
          </animated.div>
        </section>

        {/* Experiences Section with Cards */}
        <animated.section id="experiences" style={fadeInProps} className="h-screen p-8 flex flex-col justify-center items-center bg-slate-500">
          <h2 className="text-3xl font-bold text-gray-800">Experiences</h2>
          <p className="mt-4 text-center max-w-2xl text-gray-700">
            Here are some of my professional experiences that have shaped my career.
          </p>

          {/* Experience Cards */}
          <div className="flex flex-col gap-8 mt-8">
            <div
              ref={observer}
              className={`experience-card p-6 bg-white rounded-lg shadow-lg transition-transform duration-2000 transform ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ width: '80vw' }}  /* Makes the card wide */
            >
              <div className="flex items-center ">
                <img src="/persist.jpg" alt="Organization 1" className="w-10 h-10 object-cover rounded-full" />
                <div className="flex flex-col text-left ">
                  <h3 className="text-xl font-bold text-gray-800 ml-4">Persist Ventures</h3>
                  <span className="text-sm text-gray-500 ml-4">1 yr 2 mos</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">Position: Chief Technology Officer</p>
              </div>
            </div>

            <div
              ref={observer}
              className={`experience-card p-6 bg-white rounded-lg shadow-lg transition-transform duration-500 transform ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ width: '80vw' }}  /* Makes the card wide */
            >
             <div className="flex items-center ">
                <img src="/heydey.jpg" alt="Organization 3" className="w-10 h-10 object-cover rounded-full" />
                <div className="flex flex-col text-left ">
                  <h3 className="text-xl font-bold text-gray-800 ml-4">Heydaw Technologies</h3>
                  <span className="text-sm text-gray-500 ml-4">3 mos</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">Position: AI Software Developer</p>
              </div>
            </div>

            <div
              ref={observer}
              className={`experience-card p-6 bg-white rounded-lg shadow-lg transition-transform duration-500 transform ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ width: '80vw' }}  /* Makes the card wide */
            >
             <div className="flex items-center ">
                <img src="/tela.jpg" alt="Organization 3" className="w-10 h-10 object-cover rounded-full" />
                <div className="flex flex-col text-left ">
                  <h3 className="text-xl font-bold text-gray-800 ml-4">Telaverge Communications</h3>
                  <span className="text-sm text-gray-500 ml-4">1 yr</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">Position: Software Engineer-Intern</p>
              </div>
            </div>
          </div>
        </animated.section>

        {/* Contact Me Section with Form */}
        <animated.section id="contactme" style={fadeInProps} className="bg-slate-300 h-screen p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-800">Contact Me</h2>
          <p className="mt-4 text-center max-w-2xl text-gray-700">
            Feel free to reach out to me on LinkedIn or via email. I look forward to connecting with you!
          </p>

          {/* Contact Form */}
          <form className="mt-8 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <textarea
                placeholder="Your Message"
                className="p-3 border border-gray-300 rounded-md"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* LinkedIn Link */}
          <div className="mt-6">
            <a
              href="https://www.linkedin.com/in/bhavya-bansal98/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Connect with me on LinkedIn
            </a>
          </div>
        </animated.section>
      </main>
    </div>
  );
};

export default App;
