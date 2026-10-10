import { useEffect, useMemo, useState } from "react";
import reception from "./assets/landing page bg.jpeg";
import room from "./assets/room 1 pic.jpeg";
import "./App.css";
import abodeLogo from "./assets/The Abode (original) logo.jpeg";

type Room = {
  id: string;
  name: string;
  description: string;
  bed: string;
  view: string;
  maxGuests: number;
  image: string;
};

const rooms: Room[] = [
  {
    id: "balcony-room",
    name: "Balcony Room",
    description:
      "A warm and comfortable room for solo travelers or couples, with a peaceful garden view and private bathroom.",
    bed: "1 Queen bed",
    view: "Garden view",
    maxGuests: 2,
    image: room,
  },
  {
    id: "standard-room",
    name: "Standard Room",
    description:
      "A bright and spacious room with a private balcony, designed for slower and more relaxing days.",
    bed: "1 King bed",
    view: "Private balcony",
    maxGuests: 2,
    image: room,
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    description:
      "A spacious room designed for close groups of friends, with comfortable space for a relaxing stay.",
    bed: "1 King-size bed",
    view: "Garden surroundings",
    maxGuests: 3,
    image: room,
  },
];

function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingStep, setBookingStep] = useState<"stay" | "details" | "summary">(
    "stay"
  );

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [bookingImage, setBookingImage] = useState(0);

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
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedRoom ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedRoom]);

  const today = new Date().toISOString().split("T")[0];

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    const difference = end.getTime() - start.getTime();

    return difference > 0
      ? Math.round(difference / (1000 * 60 * 60 * 24))
      : 0;
  }, [checkIn, checkOut]);

  const totalGuests = adults + children;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openBooking = (roomToBook: Room) => {
    setSelectedRoom(roomToBook);
    setBookingStep("stay");

    setCheckIn("");
    setCheckOut("");
    setAdults(1);
    setChildren(0);

    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setSpecialRequests("");
    setGuestsOpen(false);
    setBookingImage(0);
  };

  const closeBooking = () => {
    setSelectedRoom(null);
  };

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);

    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  };

  const increaseAdults = () => {
    if (!selectedRoom) return;

    if (totalGuests < selectedRoom.maxGuests) {
      setAdults((current) => current + 1);
    }
  };

  const increaseChildren = () => {
    if (!selectedRoom) return;

    if (totalGuests < selectedRoom.maxGuests) {
      setChildren((current) => current + 1);
    }
  };

  const canContinueToDetails =
    checkIn &&
    checkOut &&
    nights > 0 &&
    totalGuests > 0 &&
    selectedRoom;

  const canContinueToSummary =
    guestName.trim() &&
    guestEmail.trim() &&
    guestPhone.trim();

  const bookingImages = [room, reception, room];

  return (
    <main>
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-inner">
          <button className="logo" onClick={() => scrollToSection("home")}>
            <img src={abodeLogo} alt="The Abode" />
          </button>

          <nav className="nav-links">
            <button onClick={() => scrollToSection("story")}>Our Story</button>
            <button onClick={() => scrollToSection("rooms")}>Rooms</button>
            <button onClick={() => scrollToSection("location")}>
              Location
            </button>
            <button onClick={() => scrollToSection("reviews")}>Reviews</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </nav>

          <button
            className="availability-button"
            onClick={() => scrollToSection("rooms")}
          >
             Book
            <span> </span>
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
              onClick={() => scrollToSection("rooms")}
            >
               Book Your Stay
              <span> </span>
            </button>

            <button
              className="secondary-button"
              onClick={() => scrollToSection("rooms")}
            >
               Explore the Space
              <span> </span>
            </button>
          </div>
        </div>
      </section>

      {/* BOOKING INTRO */}
      <section id="booking" className="booking-section reveal">
        <div className="booking-content">
          <div>
            <span className="eyebrow">BOOK YOUR STAY</span>

            <h2>Find a room for your time away.</h2>

            <p>
              Choose your room, select your dates and tell us a little about
              your stay. Your booking details will be handled securely.
            </p>
          </div>

          <div className="booking-action">
            <button
              className="secondary-button"
              onClick={() => scrollToSection("rooms")}
            >
               Explore Rooms
              <span> </span>
            </button>

            <p>
              Choose a room first,
              <br />
              then select your stay details.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="story-section">
        <div className="story-image reveal">
          <img src={reception} alt="The Abode interior" />
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

      {/* ROOMS */}
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
          {rooms.map((roomItem) => (
            <article
              className="room-card reveal"
              key={roomItem.id}
              onClick={() => openBooking(roomItem)}
            >
              <div className="room-image">
                <img src={roomItem.image} alt={`The Abode ${roomItem.name}`} />
              </div>

              <div className="room-info">
                <h3>{roomItem.name}</h3>

                <p>
                  {roomItem.description} {roomItem.bed} ·{" "}
                  {roomItem.view} · Up to {roomItem.maxGuests} guests.
                </p>

                <div className="room-bottom">
                  <span className="room-price">
                    {roomItem.maxGuests === 3 ? "Up to 3 guests" : "Up to 2 guests"}
                  </span>

                  <button
                    className="room-link"
                    onClick={(event) => {
                      event.stopPropagation();
                      openBooking(roomItem);
                    }}
                  >
                    Book
                    <span>↗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY THE ABODE */}
      <section id="why-stay" className="why-stay-section">
        <div className="why-stay-header reveal">
          <p className="why-stay-label">WHY THE ABODE?</p>

          <h2>Why guests love staying here</h2>
        </div>

        <div className="why-stay-grid">
          <div className="why-card reveal">
            <div className="why-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
                <path d="M9 21v-6h6v6" />
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 21V8" />
                <path d="M12 12c-4 0-6-2-6-5 4 0 6 2 6 5Z" />
                <path d="M12 15c4 0 6-2 6-5-4 0-6 2-6 5Z" />
                <path d="M12 8c-3 0-5-2-5-5 3 0 5 2 5 5Z" />
              </svg>
            </div>

            <h3>Nature Outside Your Door</h3>

            <p>
              A private balcony, garden, and green surroundings make every
              morning feel calmer.
            </p>
          </div>

          <div className="why-card reveal">
            <div className="why-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M2 8.5a15 15 0 0 1 20 0" />
                <path d="M5 12a10.5 10.5 0 0 1 14 0" />
                <path d="M8.5 15.5a6 6 0 0 1 7 0" />
                <path d="M12 19h.01" />
              </svg>
            </div>

            <h3>Everything You Need</h3>

            <p>
              Air conditioning, high-speed Wi-Fi, a kitchen, hot water,
              ample parking, and essential supplies are ready for your stay.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      {/* LOCATION */}
<section id="location" className="location-section">
  <div className="location-header reveal">
    <div>
      <p className="location-label">FIND THE ABODE</p>

      <h2>
        Close to where you
        <br />
        want to go, far enough
        <br />
        away to feel peaceful.
      </h2>
    </div>

    <p className="location-intro">
      The Abode offers a peaceful base in Naivasha, with easy
      access to the A104 and the town while keeping you close
      to the places worth exploring.
    </p>
  </div>

  <div className="location-map-wrapper reveal">
    <iframe
      title="The Abode Naivasha location"
      src="https://www.google.com/maps?q=The%20Abode%20Naivasha%2C%20A104%20behind%20Hylise%20Hotel%20and%20Jimmy%27s%20Choma%20Bite%2C%20Naivasha&output=embed"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />

    <a
      className="maps-button"
      href="https://www.google.com/maps/dir/?api=1&destination=The%20Abode%20Naivasha%2C%20A104%20behind%20Hylise%20Hotel%20and%20Jimmy%27s%20Choma%20Bite%2C%20Naivasha%2C%20Kenya"
      target="_blank"
      rel="noopener noreferrer"
    >
      Get Directions
      <span>↗</span>
    </a>
  </div>

  <div className="location-details reveal">
    <div className="location-details-heading">
      <p>WELL CONNECTED, QUIETLY PLACED.</p>
      <span>
        Easy to reach, easy to settle into.
      </span>
    </div>

    <div className="location-detail-grid">
  <div className="location-detail">
    <strong>93 km</strong>
    <span>From Nairobi</span>
  </div>

  <div className="location-detail">
    <strong>70 km</strong>
    <span>From Nakuru</span>
  </div>

  <div className="location-detail">
    <strong>2 min</strong>
    <span>Naivasha town</span>
  </div>

  <div className="location-detail">
    <strong>A104</strong>
    <span>Nairobi–Nakuru Highway</span>
  </div>
</div>
  </div>
</section>

      {/* AMENITIES */}
      <section id="amenities" className="placeholder-section reveal">
        <span className="eyebrow">AMENITIES</span>
        <h2>Everything you need.</h2>
      </section>

      
      
{/* GUEST REVIEWS */}
<section id="reviews" className="reviews-section">
  <div className="reviews-header reveal">
    <span className="eyebrow reviews-eyebrow">
      THE ABODE EXPERIENCE
    </span>

    <h2>Stories that began right here.</h2>

    <div className="reviews-subtitle">
      <span className="reviews-line"></span>
      <p>Little moments. Lasting memories.</p>
      <span className="reviews-line"></span>
    </div>
  </div>

  <article className="review-card review-featured reveal">
    <span className="review-quote-mark" aria-hidden="true">“</span>

    <div className="review-stars" aria-label="4 out of 5 stars">
      {[1, 2, 3, 4].map((star) => (
        <span key={star} aria-hidden="true">★</span>
      ))}
    </div>

    <blockquote>
      “The room was clean, bright, and even more peaceful than it
      looked in the photos. The host was incredibly helpful and
      shared a full list of great local restaurants.”
    </blockquote>

    <div className="review-author-row">
      <span className="review-author-avatar">M</span>
      <div>
        <p className="review-author">Mary Wanjiru Mbatia</p>
        <span className="review-author-label">Guest experience</span>
      </div>
    </div>
  </article>

  <div className="reviews-grid">
    <article className="review-card reveal">
      <div className="review-stars" aria-label="4 out of 5 stars">
        {[1, 2, 3, 4].map((star) => (
          <span key={star} aria-hidden="true">★</span>
        ))}
      </div>

      <blockquote>
        “Our family had such a relaxing weekend. Our child loved
        the garden, while we finally had time to slow down and rest.”
      </blockquote>

      <div className="review-author-row">
        <span className="review-author-avatar">J</span>
        <div>
          <p className="review-author">John &amp; Jane Mathenge</p>
          <span className="review-author-label">Guest experience</span>
        </div>
      </div>
    </article>

    <article className="review-card reveal">
      <div className="review-stars" aria-label="4 out of 5 stars">
        {[1, 2, 3, 4].map((star) => (
          <span key={star} aria-hidden="true">★</span>
        ))}
      </div>

      <blockquote>
        “A wonderful place for couples. It felt private, the balcony
        was beautiful, and the evenings were exceptionally peaceful.”
      </blockquote>

      <div className="review-author-row">
        <span className="review-author-avatar">L</span>
        <div>
          <p className="review-author">Lisah Gitau</p>
          <span className="review-author-label">Guest experience</span>
        </div>
      </div>
    </article>
  </div>
</section>


      {/* CONTACT */}
      <section id="contact" className="placeholder-section reveal">
        <span className="eyebrow">CONTACT</span>
        <h2>We'd love to hear from you.</h2>
      </section>

      {/* BOOKING MODAL */}
      {selectedRoom && (
        <div className="booking-modal-overlay" onClick={closeBooking}>
          <div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="booking-close"
              onClick={closeBooking}
              aria-label="Close booking"
            >
              ×
            </button>

           <div className="booking-modal-image">
  <img
    src={bookingImages[bookingImage]}
    alt={`${selectedRoom.name} ${bookingImage + 1}`}
  />

  <button
    type="button"
    className="booking-image-arrow booking-image-prev"
    onClick={() =>
      setBookingImage(
        (current) =>
          (current - 1 + bookingImages.length) % bookingImages.length
      )
    }
    aria-label="Previous room image"
  >
    ←
  </button>

  <button
    type="button"
    className="booking-image-arrow booking-image-next"
    onClick={() =>
      setBookingImage(
        (current) => (current + 1) % bookingImages.length
      )
    }
    aria-label="Next room image"
  >
    →
  </button>

  <div className="booking-image-dots">
    {bookingImages.map((_, index) => (
      <button
        key={index}
        type="button"
        className={bookingImage === index ? "active" : ""}
        onClick={() => setBookingImage(index)}
        aria-label={`Show room image ${index + 1}`}
      />
    ))}
  </div>
</div>

            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="eyebrow">BOOK YOUR STAY</span>

                <h2 id="booking-title">{selectedRoom.name}</h2>

                <p>{selectedRoom.description}</p>

                <div className="room-meta">
                  <span>{selectedRoom.bed}</span>
                  <span>{selectedRoom.view}</span>
                  <span>Up to {selectedRoom.maxGuests} guests</span>
                </div>
              </div>

              {/* STEP 1: STAY */}
              {bookingStep === "stay" && (
                <div className="booking-form">
                  <div className="date-fields">
                    <label>
                      <span>Check-in</span>

                      <input
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(event) =>
                          handleCheckInChange(event.target.value)
                        }
                      />
                    </label>

                    <label>
                      <span>Check-out</span>

                      <input
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(event) =>
                          setCheckOut(event.target.value)
                        }
                      />
                    </label>
                  </div>

                 <div className="guest-selector">
  <button
    type="button"
    className="guest-dropdown-trigger"
    onClick={() => setGuestsOpen((open) => !open)}
    aria-expanded={guestsOpen}
  >
    <div className="guest-dropdown-summary">
      <span className="guest-label">Guests</span>

      <strong>
        {adults} adult{adults !== 1 ? "s" : ""}
        {children > 0
          ? ` · ${children} child${children !== 1 ? "ren" : ""}`
          : ""}
      </strong>
    </div>

    <span className={`guest-dropdown-arrow ${guestsOpen ? "open" : ""}`}>
      ↓
    </span>
  </button>

  {guestsOpen && (
    <div className="guest-dropdown-menu">
      <div className="guest-row">
        <div>
          <strong>Adults</strong>
          <small>18+ years</small>
        </div>

        <div className="guest-counter">
          <button
            type="button"
            onClick={() =>
              setAdults((current) => Math.max(1, current - 1))
            }
            disabled={adults <= 1}
          >
            −
          </button>

          <span>{adults}</span>

          <button
            type="button"
            onClick={increaseAdults}
            disabled={
              !selectedRoom ||
              totalGuests >= selectedRoom.maxGuests
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="guest-row">
        <div>
          <strong>Children</strong>
          <small>Under 18 years</small>
        </div>

        <div className="guest-counter">
          <button
            type="button"
            onClick={() =>
              setChildren((current) => Math.max(0, current - 1))
            }
            disabled={children <= 0}
          >
            −
          </button>

          <span>{children}</span>

          <button
            type="button"
            onClick={increaseChildren}
            disabled={
              !selectedRoom ||
              totalGuests >= selectedRoom.maxGuests
            }
          >
            +
          </button>
        </div>
      </div>

      <p className="guest-limit">
        Up to {selectedRoom?.maxGuests} guests
      </p>
    </div>
  )}
</div>
                  {nights > 0 && (
                    <div className="stay-summary">
                      <div>
                        <span>Stay</span>
                        <strong>
                          {nights} night{nights !== 1 ? "s" : ""}
                        </strong>
                      </div>

                      <div>
                        <span>Guests</span>
                        <strong>{totalGuests}</strong>
                      </div>
                    </div>
                  )}

                  <button
                    className="booking-primary-button"
                    disabled={!canContinueToDetails}
                    onClick={() => setBookingStep("details")}
                  >
                    Continue
                    <span>→</span>
                  </button>
                </div>
              )}

              {/* STEP 2: GUEST DETAILS */}
              {bookingStep === "details" && (
                <div className="booking-form">
                  <div className="booking-progress">
                    <span className="active">1</span>
                    <span className="line active-line" />
                    <span className="active">2</span>
                    <span className="line" />
                    <span>3</span>
                  </div>

                  <div className="form-heading">
                    <h3>Tell us about yourself</h3>
                    <p>
                      We'll use these details to prepare your reservation.
                    </p>
                  </div>

                  <label>
                    <span>Full name</span>

                    <input
                      type="text"
                      placeholder="Your full name"
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                    />
                  </label>

                  <label>
                    <span>Email address</span>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={guestEmail}
                      onChange={(event) => setGuestEmail(event.target.value)}
                    />
                  </label>

                  <label>
                    <span>Phone number</span>

                    <input
                      type="tel"
                      placeholder="+254..."
                      value={guestPhone}
                      onChange={(event) => setGuestPhone(event.target.value)}
                    />
                  </label>

                  <label>
                    <span>Special requests <small>Optional</small></span>

                    <textarea
                      placeholder="Anything you'd like us to know?"
                      value={specialRequests}
                      onChange={(event) =>
                        setSpecialRequests(event.target.value)
                      }
                      rows={3}
                    />
                  </label>

                  <div className="booking-form-actions">
                    <button
                      className="booking-back-button"
                      onClick={() => setBookingStep("stay")}
                    >
                      ← Back
                    </button>

                    <button
                      className="booking-primary-button"
                      disabled={!canContinueToSummary}
                      onClick={() => setBookingStep("summary")}
                    >
                      Review Booking
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUMMARY */}
              {bookingStep === "summary" && (
                <div className="booking-form">
                  <div className="booking-progress">
                    <span className="active">1</span>
                    <span className="line active-line" />
                    <span className="active">2</span>
                    <span className="line active-line" />
                    <span className="active">3</span>
                  </div>

                  <div className="form-heading">
                    <h3>Review your booking</h3>

                    <p>
                      Make sure everything looks right before confirming.
                    </p>
                  </div>

                  <div className="final-summary">
                    <div>
                      <span>Room</span>
                      <strong>{selectedRoom.name}</strong>
                    </div>

                    <div>
                      <span>Dates</span>
                      <strong>
                        {checkIn} → {checkOut}
                      </strong>
                    </div>

                    <div>
                      <span>Stay</span>
                      <strong>
                        {nights} night{nights !== 1 ? "s" : ""}
                      </strong>
                    </div>

                    <div>
                      <span>Guests</span>
                      <strong>
                        {adults} adult{adults !== 1 ? "s" : ""}
                        {children > 0
                          ? ` · ${children} child${
                              children !== 1 ? "ren" : ""
                            }`
                          : ""}
                      </strong>
                    </div>

                    <div>
                      <span>Guest</span>
                      <strong>{guestName}</strong>
                    </div>

                    <div>
                      <span>Contact</span>
                      <strong>{guestPhone}</strong>
                    </div>
                  </div>

                  <div className="booking-note">
                    Your booking will be checked against room availability
                    before it is confirmed.
                  </div>

                  <div className="booking-form-actions">
                    <button
                      className="booking-back-button"
                      onClick={() => setBookingStep("details")}
                    >
                      ← Back
                    </button>

                    <button
                      className="booking-primary-button"
                      onClick={() => {
                        alert(
                          "Your booking details are ready. The backend booking system will be connected next."
                        );
                      }}
                    >
                      Confirm Booking
                      <span>✓</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;