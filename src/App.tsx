import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-inner">
          <button
            className="logo"
            onClick={() => scrollToSection("home")}
          >
            The Abode
          </button>

          <nav className="nav-links">
            <button onClick={() => scrollToSection("story")}>
              Our Story
            </button>

            <button onClick={() => scrollToSection("rooms")}>
              Rooms
            </button>

            <button onClick={() => scrollToSection("amenities")}>
              Amenities
            </button>

            <button onClick={() => scrollToSection("reviews")}>
              Reviews
            </button>

            <button onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </nav>

          <button
            className="availability-button"
            onClick={() => scrollToSection("booking")}
          >
            Request Availability
            <span>⌁</span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-overlay" />

        <div className="hero-content reveal">
          <h1>
            Escape for a while,
            <br />
            without leaving
            <br />
            the comfort of
            <br />
            home behind.
          </h1>

          <p>
            A private retreat surrounded by nature, where you can slow
            down, reconnect, and enjoy every moment of your stay.
          </p>

          <div className="hero-buttons">
            <button
              className="availability-button"
              onClick={() => scrollToSection("booking")}
            >
              Request Availability
              <span>⌁</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => scrollToSection("rooms")}
            >
              Explore the Space
              <span>↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* BOOKING INQUIRIES */}
      <section id="booking" className="booking-section reveal">
        <div className="booking-content">
          <div>
            <span className="eyebrow">BOOKING INQUIRIES</span>

            <h2>Tell us when you'd like to stay.</h2>

            <p>
              Share your preferred dates, guest count, and room preference.
              The Abode will reply personally to confirm availability.
            </p>
          </div>

          <div className="booking-action">
            <button
              className="secondary-button"
              onClick={() => scrollToSection("rooms")}
            >
              Explore Rooms
              <span>⌂</span>
            </button>

            <p>
              Browse the rooms first, then send
              <br />
              an inquiry when you're ready.
            </p>
          </div>
        </div>
      </section>

      {/* TEMPORARY SECTIONS */}
      <section id="story" className="placeholder-section reveal">
        <span className="eyebrow">OUR STORY</span>
        <h2>A place to slow down.</h2>
      </section>

      <section id="rooms" className="placeholder-section reveal">
        <span className="eyebrow">ROOMS</span>
        <h2>Stay awhile.</h2>
      </section>

      <section id="amenities" className="placeholder-section reveal">
        <span className="eyebrow">AMENITIES</span>
        <h2>Everything you need.</h2>
      </section>

      <section id="reviews" className="placeholder-section reveal">
        <span className="eyebrow">REVIEWS</span>
        <h2>Words from our guests.</h2>
      </section>

      <section id="contact" className="placeholder-section reveal">
        <span className="eyebrow">CONTACT</span>
        <h2>We'd love to hear from you.</h2>
      </section>
    </main>
  );
}

export default App;