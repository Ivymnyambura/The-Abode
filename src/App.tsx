import { useEffect } from "react";
import reception from "./assets/landing page bg.jpeg";
import room from "./assets/room 1 pic.jpeg";
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

            <button onClick={() => scrollToSection("location")}>
              Location
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
      <section id="story" className="story-section">
  <div className="story-image reveal">
    <img
      src={reception}
      alt="The Abode interior"
    />
  </div>

  <div className="story-content reveal">
    <p className="section-label">OUR STORY</p>

    <h2>
      A peaceful retreat
      <br />
      created from
      <br />
      the smallest
      <br />
      thoughtful details.
    </h2>

    <p>
      The Abode began with a simple wish: to create a place where
      people could step away from the pace of everyday life.
    </p>

    <p>
      Here, you will find a room that feels private, a natural
      setting that feels peaceful, and all the essential comforts
      needed to enjoy meaningful time with the people you love.
    </p>
  </div>
</section>

      <section id="why-stay" className="why-stay-section">
  <div className="why-stay-header reveal">
    <p className="why-stay-label">WHY THE ABODE?</p>
    <h2>Why guests love staying here</h2>
  </div>

  <div className="why-stay-grid">

    <div className="why-card reveal">
      <div className="why-icon">
  <svg viewBox="0 0 80 80" aria-hidden="true">
    <path d="M12 52h56" />
    <path d="M19 52V35l21-17 21 17v17" />
    <path d="M31 52V39h18v13" />
    <path d="M35 45h10" />
    <path d="M17 35c0-8 5-13 11-13 3 0 6 1 8 4" />
    <path d="M55 31c0-7 4-12 10-12" />
    <circle cx="61" cy="16" r="3" />
    <path d="M17 56c3-3 7-3 10 0M51 56c4-3 8-3 12 0" />
  </svg>
</div>

      <h3>A Private and Peaceful Space</h3>

      <p>
        Enjoy a quiet environment that feels comfortably secluded
        while exploring the area.
      </p>
    </div>

    <div className="why-card reveal">
      <div className="why-icon">
  <svg viewBox="0 0 80 80" aria-hidden="true">
    <path d="M13 56h54" />
    <path d="M20 56V31h40v25" />
    <path d="M20 39h40" />
    <path d="M29 39v17M51 39v17" />
    <path d="M14 28c6-7 12-7 17 0" />
    <path d="M20 28c-1-7 3-12 9-15" />
    <path d="M61 33c0-8 4-14 10-17" />
    <path d="M67 22c4 2 6 5 6 9" />
    <path d="M16 50c-3-6-2-11 3-15" />
    <path d="M12 39c5 0 8 3 9 8" />
  </svg>
</div>

      <h3>Nature Outside Your Door</h3>

      <p>
        A private balcony, garden, and green surroundings make
        every morning feel calmer.
      </p>
    </div>

    <div className="why-card reveal">
      <div className="why-icon">
  <svg viewBox="0 0 80 80" aria-hidden="true">
    <rect x="12" y="16" width="34" height="16" rx="3" />
    <path d="M17 23h24" />
    <path d="M20 28h12" />

    <path d="M55 19v8M51 23h8" />
    <path d="M61 19v8M57 23h8" />

    <path d="M14 51h18" />
    <path d="M17 51v9h12v-9" />
    <path d="M20 47c0-3 2-5 5-5s5 2 5 5" />

    <path d="M42 59h25" />
    <path d="M47 59c0-7 4-11 8-11s8 4 8 11" />
    <path d="M50 48c2-2 5-2 7 0" />

    <path d="M57 38c3-3 7-3 10 0" />
  </svg>
</div>

      <h3>Everything You Need</h3>

      <p>
        Air conditioning, high-speed Wi-Fi, a kitchen, hot water,
        a hair dryer, and essential supplies are ready for your stay.
      </p>
    </div>

    

  </div>

  <section id="rooms" className="rooms-section">
  <div className="rooms-header reveal">
    <p className="rooms-label">OUR ROOMS</p>

    <h2>
      Choose the room made
      <br />
      for your kind of getaway.
    </h2>
  </div>
 
  <div className="rooms-grid">

    <article className="room-card reveal">
      <div className="room-image">
        <img
          src={room}
          alt="The Abode Balcony Room"
        />
      </div>

      <div className="room-info">
        <h3>Balcony Room</h3>

        <p>
          A warm and comfortable room for solo travelers or
          couples. One Queen bed · Up to 2 guests · Garden view ·
          Private bathroom.
        </p>

        <div className="room-bottom">
          <span className="room-price">KSH8,500</span>

          <button
            className="room-link"
            onClick={() => scrollToSection("booking")}
          >
            Request Availability
          </button>
        </div>
      </div>
    </article>


    <article className="room-card reveal">
      <div className="room-image">
        <img
          src={room}
          alt="The Abode Standard Room"
        />
      </div>

      <div className="room-info">
        <h3>Standard Room</h3>

        <p>
          A bright and spacious room with a private balcony for
          slower, more relaxing days. One King bed · Up to 2
          guests.
        </p>

        <div className="room-bottom">
          <span className="room-price">KSH7,000</span>

          <button
            className="room-link"
            onClick={() => scrollToSection("booking")}
          >
            Request Availability
          </button>
        </div>
      </div>
    </article>


    <article className="room-card reveal">
      <div className="room-image">
        <img
          src={room}
          alt="The Abode Deluxe Room"
        />
      </div>

      <div className="room-info">
        <h3>Deluxe Room</h3>

        <p>
          A spacious room designed for close groups of friends.
          Kingsize bed · Up to 3 guests · Child-friendly amenities.
        </p>

        <div className="room-bottom">
          <span className="room-price">KSH8,500</span>

          <button
            className="room-link"
            onClick={() => scrollToSection("booking")}
          >
            Request Availability
          </button>
        </div>
      </div>
    </article>

  </div>
</section>

<section id="location" className="location-section">
  <div className="location-header reveal">
    <div>
      <p className="location-label">FIND THE ABODE</p>

      <h2>
        Close to enough
        <br />
        to go, far enough
        <br />
        to feel peaceful.
      </h2>
    </div>

    <p className="location-intro">
      The Abode offers a peaceful base for exploring Naivasha,
      with easy access to the highway, everyday conveniences,
      and nearby attractions.
    </p>
  </div>

  <div className="location-map-wrapper reveal">
    <iframe
    
      src="https://www.google.com/maps?q=The%20Abode%20Naivasha%2C%20A104%20behind%20Hylise%20Hotel%20and%20Jimmy%27s%20Choma%20Bite%2C%20Naivasha&output=embed"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />

    <div className="location-card">
      <span className="location-card-label">THE ABODE</span>

      <h3>Naivasha, Kenya</h3>

      <p>
        A104 · Behind Hylise Hotel and Jimmy's Choma Bite
      </p>
    </div>

    <a
      className="maps-button"
      href="https://www.google.com/maps/search/?api=1&query=The%20Abode%20Naivasha%2C%20A104%20behind%20Hylise%20Hotel%20and%20Jimmy%27s%20Choma%20Bite%2C%20Naivasha"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open in Google Maps
      <span>↗</span>
    </a>
  </div>
</section>

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