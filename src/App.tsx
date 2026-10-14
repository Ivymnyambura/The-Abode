import { useEffect, useMemo, useState } from "react";
import reception from "./assets/landing page bg.jpeg";
import room from "./assets/room 1 pic.jpeg";
import "./App.css";
import abodeLogo from "./assets/The Abode (original) logo.png";
import {
  ArrowUpRight,
 
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

const whatsappUrl =
  "https://wa.me/254711308481?text=Hello%20The%20Abode%2C%20I%20would%20like%20to%20make%20an%20inquiry.";

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

const faqs = [
  {
    question: "Is the homestay suitable for children?",
    answer:
      "Yes. We offer rooms suitable for small families and can provide selected child-friendly amenities. Please let us know in advance so we can prepare for your stay.",
  },
  {
    question: "Is car parking available?",
    answer:
      "Please contact our team before your arrival to confirm parking availability and any arrangements you may need.",
  },
  {
    question: "Can I check in early?",
    answer:
      "Early check-in may be possible depending on room availability. Please contact us in advance and we will do our best to accommodate your request.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Please contact us before booking to confirm our current pet policy and whether any special arrangements can be made.",
  },
  {
    question: "Can I cancel or change my booking dates?",
    answer:
      "Booking changes and cancellations depend on the terms of your reservation. Please contact us with your booking details for assistance.",
  },
];


function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"stay" | "details" | "summary">(
    "stay"
  );
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);
 

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
  const navigateMobile = (id: string) => {
  setMobileMenuOpen(false);
  scrollToSection(id);
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
    {/* LOGO */}
    <button
      type="button"
      className="logo"
      onClick={() => navigateMobile("home")}
      aria-label="The Abode — Home"
    >
      <img src={abodeLogo} alt="The Abode" />
    </button>

    {/* DESKTOP NAVIGATION */}
    <nav className="nav-links" aria-label="Main navigation">
      <button type="button" onClick={() => scrollToSection("story")}>
        Our Story
      </button>
      <button type="button" onClick={() => scrollToSection("rooms")}>
        Rooms
      </button>
      <button type="button" onClick={() => scrollToSection("location")}>
        Location
      </button>
      <button type="button" onClick={() => scrollToSection("reviews")}>
        Reviews
      </button>
      <button type="button" onClick={() => scrollToSection("contact")}>
        Contact
      </button>
    </nav>

    {/* DESKTOP BOOKING BUTTON */}
    <button
      type="button"
      className="availability-button"
      onClick={() => scrollToSection("rooms")}
    >
      Book
      <span aria-hidden="true"> </span>
    </button>

    {/* PHONE & TABLET HAMBURGER */}
    <button
      type="button"
      className={`abode-hamburger ${mobileMenuOpen ? "is-open" : ""}`}
      onClick={() => setMobileMenuOpen((open) => !open)}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileMenuOpen}
      aria-controls="abode-mobile-menu"
    >
      <span />
      <span />
      <span />
    </button>
  </div>

  {/* PHONE & TABLET NAVIGATION MENU */}
  <nav
    id="abode-mobile-menu"
    className={`abode-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
    aria-label="Mobile navigation"
    aria-hidden={!mobileMenuOpen}
    inert={!mobileMenuOpen}
  >
    <div className="abode-mobile-menu-inner">
      <p className="abode-mobile-eyebrow">
        WELCOME TO THE ABODE
      </p>

      <div className="abode-mobile-links">
        {[
          { label: "Home", id: "home" },
          { label: "Our Story", id: "story" },
          { label: "Rooms", id: "rooms" },
          { label: "Why The Abode", id: "why-stay" },
          { label: "Amenities", id: "amenities" },
          { label: "Location", id: "location" },
          { label: "Reviews", id: "reviews" },
          { label: "Contact", id: "contact" },
        ].map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigateMobile(item.id)}
          >
            <span className="abode-mobile-index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>{item.label}</span>

            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {/* MOBILE BOOKING BUTTON */}
      <button
        type="button"
        className="abode-mobile-book"
        onClick={() => navigateMobile("rooms")}
      >
        Book Your Stay
        <ArrowUpRight
          size={19}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      {/* BRAND TAGLINE */}
      <p className="abode-mobile-tagline">
        Refined Hospitality
      </p>
    </div>
  </nav>
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
  role="button"
  tabIndex={0}
  aria-label={`View ${roomItem.name} and book your stay`}
  onClick={() => openBooking(roomItem)}
  onKeyDown={(event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBooking(roomItem);
    }
  }}
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
                    View & Book
<ArrowUpRight
  size={16}
  strokeWidth={1.25}
  aria-hidden="true"
/>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* THE ABODE GALLERY */}
<section id="gallery" className="abode-gallery-section">
  <div className="abode-gallery-heading reveal">
    <div>
      <p className="abode-gallery-label">A CLOSER LOOK</p>
      <h2>
        A glimpse of life
        <br />
        at The Abode.
      </h2>
    </div>

    <p className="abode-gallery-description">
      Thoughtful spaces, quiet corners, and the little details
      that make every stay feel special.
    </p>
  </div>

  <div className="abode-gallery-grid">
    {[
      { image: reception, label: "A warm welcome" },
      { image: room, label: "Room to unwind" },
      { image: reception, label: "The little details" },
      { image: room, label: "Make yourself at home" },
    ].map((photo, index) => (
      <figure
        className={`abode-gallery-item abode-gallery-item-${index + 1} reveal`}
        key={index}
      >
        <img src={photo.image} alt={photo.label} loading="lazy" />

        <figcaption>
          <span>{photo.label}</span>
          <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </figcaption>
      </figure>
    ))}
  </div>

  <p className="abode-gallery-signature">
    The Abode <span>— Refined Hospitality</span>
  </p>
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
<section id="amenities" className="amenities-section">
  <div className="amenities-container">

    <div className="amenities-heading">
      <span className="amenities-eyebrow">
        THE LITTLE EXTRAS
      </span>

      <h2>
        Everything you need for a
        <em> comfortable stay.</em>
      </h2>

      <p>
        From everyday essentials to thoughtful services,
        every detail is designed to make your stay
        feel a little more like home.
      </p>
    </div>

    <div className="amenities-list">

      <div className="amenity-row">
        <span className="amenity-number">01</span>

        <div className="amenity-content">
          <div className="amenity-title">
            <span className="amenity-icon">⌂</span>
            <h3>In Your Room</h3>
          </div>

          <p>
            Air conditioning <span>·</span> High-speed Wi-Fi
            <span> · </span> Smart TV <span> · </span>
            Hot water <span> · </span> Balcony
            <span> · </span> Work desk
          </p>
        </div>

        <span className="amenity-arrow">
  <ArrowUpRight size={20} strokeWidth={1.7} />
</span>
      </div>

      <div className="amenity-row">
        <span className="amenity-number">02</span>

        <div className="amenity-content">
          <div className="amenity-title">
            <span className="amenity-icon"></span>
            <h3>Shared Spaces</h3>
          </div>

          <p>
            Restaurant <span> · </span> Parking
            <span> · </span> Rooftop
          </p>
        </div>

        <span className="amenity-arrow">
  <ArrowUpRight size={20} strokeWidth={1.7} />
</span>
      </div>

      <div className="amenity-row">
        <span className="amenity-number">03</span>

        <div className="amenity-content">
          <div className="amenity-title">
            <span className="amenity-icon"></span>
            <h3>Guest Services</h3>
          </div>

          <p>
            Flexible check-in <span> · </span>
            Fully operational restaurant <span> · </span>
            Housekeeping <span> · </span>
            Local itinerary assistance
          </p>
        </div>

        <span className="amenity-arrow">
  <ArrowUpRight size={20} strokeWidth={1.7} />
</span>
      </div>

    </div>

    <div className="amenities-footer">
      
    </div>

  </div>
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


{/* QUERIES ANSWERED / FAQ */}
<section id="faq" className="faq-section">
  <div className="faq-layout">

    {/* LEFT SIDE */}
    <div className="faq-intro">
      <span className="faq-eyebrow">GOOD TO KNOW</span>

      <h2>A few things you may want to know.</h2>

      <p className="faq-description">
        Planning a stay should feel simple. Browse the most
        common questions, or contact us directly if you would
        like personal help.
      </p>

      <div className="faq-image-wrap">
        <img
          src={room}
          alt="Comfortable guest bedroom at The Abode"
          loading="lazy"
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;

        return (
          <div
            className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
            key={faq.question}
          >
            <h3 className="faq-question-heading">
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() =>
                  setOpenFaq(isOpen ? null : index)
                }
              >
                <span className="faq-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="faq-question-text">
                  {faq.question}
                </span>

                <span className="faq-toggle" aria-hidden="true">
                  {isOpen ? "×" : "+"}
                </span>
              </button>
            </h3>

            <div
              id={`faq-answer-${index}`}
              className="faq-answer"
              hidden={!isOpen}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>



      {/* CONTACT */}
      
{/* CONTACT */}
<section id="contact" className="contact-section">
  <div className="contact-shell">
    <div className="contact-layout">

      {/* LEFT: INTRODUCTION */}
      <div className="contact-intro">
        <span className="contact-eyebrow">
          LET'S PLAN YOUR STAY
        </span>

        <h2>
          Your next getaway
          <em> begins here.</em>
        </h2>

        <p className="contact-description">
          A quiet escape, a warm welcome, and a little room
          to slow down. Tell us when you'd like to visit,
          and we'll help you plan your stay.
        </p>

        <div className="contact-details">
          <a
            className="contact-detail"
            href="tel:+254711308481"
          >
            <span className="contact-detail-icon">↗</span>
            <span className="contact-detail-copy">
              <small>CALL US</small>
              <strong>+254 711 308 481</strong>
            </span>
          </a>

          <a
            className="contact-detail"
            href="mailto:contact@theabode.com"
          >
            <span className="contact-detail-icon">↗</span>
            <span className="contact-detail-copy">
              <small>EMAIL US</small>
              <strong>contact@theabode.com</strong>
            </span>
          </a>

          
<a
  className="contact-detail"
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
>

            <span className="contact-detail-icon">↗</span>
            <span className="contact-detail-copy">
              <small>WHATSAPP</small>
              <strong>Start a conversation</strong>
            </span>
          </a>
        </div>

        <div className="contact-signoff">
          
        </div>
      </div>

      {/* RIGHT: INQUIRY FORM */}
      <div className="contact-form-panel">
        <div className="contact-form-heading">
          <span>YOUR STAY, YOUR WAY</span>
          <h3>Make an inquiry.</h3>
          <p>
            Share a few details and we'll help you
            check availability.
          </p>
        </div>

        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.currentTarget;
            if (!form.reportValidity()) return;

            const data = new FormData(form);
            const get = (name: string) =>
              String(data.get(name) ?? "").trim();

            const checkIn = get("checkIn");
            const checkOut = get("checkOut");

            if (checkOut <= checkIn) {
              alert(
                "Check-out must be later than check-in."
              );
              return;
            }

            const subject =
              "Accommodation Inquiry - The Abode";

            const message = [
              "Hello The Abode,",
              "",
              "I would like to inquire about a stay.",
              "",
              `Full name: ${get("fullName")}`,
              `Phone: ${get("phone")}`,
              `Email: ${get("email")}`,
              `Guests: ${get("guests")}`,
              `Check-in: ${checkIn}`,
              `Check-out: ${checkOut}`,
              `Room preference: ${get("room")}`,
              "",
              `Additional message: ${get("message") || "None"}`,
              "",
              "Please let me know about availability.",
              "",
              "Thank you!"
            ].join("\n");

            window.location.href =
              `mailto:contact@theabode.com?subject=${
                encodeURIComponent(subject)
              }&body=${encodeURIComponent(message)}`;
          }}
        >
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Full Name *</span>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </label>

            <label className="contact-field">
              <span>Phone Number *</span>
              <input
                type="tel"
                name="phone"
                placeholder="+254..."
                autoComplete="tel"
                required
              />
            </label>

            <label className="contact-field">
              <span>Email Address *</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="contact-field">
              <span>Number of Guests *</span>
              <input
                type="number"
                name="guests"
                placeholder="2"
                min="1"
                max="20"
                required
              />
            </label>

            <label className="contact-field">
              <span>Check-in Date *</span>
              <input
                type="date"
                name="checkIn"
                min={new Date().toLocaleDateString(
                  "en-CA"
                )}
                required
              />
            </label>

            <label className="contact-field">
              <span>Check-out Date *</span>
              <input
                type="date"
                name="checkOut"
                min={new Date().toLocaleDateString(
                  "en-CA"
                )}
                required
              />
            </label>

            <label className="contact-field contact-field-full">
              <span>Room Preference</span>
              <select name="room" defaultValue="No preference">
                <option>No preference</option>
                <option>Balcony Room</option>
                <option>Standard Room</option>
                <option>Deluxe Room</option>
              </select>
            </label>

            <label className="contact-field contact-field-full">
              <span>Anything else?</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us anything that would make your stay more special..."
              />
            </label>
          </div>

          <button
            type="submit"
            className="contact-submit"
          >
            Send Inquiry
<ArrowUpRight
  size={16}
  strokeWidth={1.25}
  aria-hidden="true"
/>
          </button>

          
        </form>
      </div>
    </div>
  </div>
</section>


{/* FOOTER */}
<footer className="abode-footer">
  <div className="footer-container">

    <div className="footer-main">
      <div className="footer-brand">
        <button
          type="button"
          className="footer-logo-button"
          onClick={() =>
            document.getElementById("home")?.scrollIntoView({
              behavior: "smooth"
            })
          }
          aria-label="The Abode - Back to top"
        >
          <img
            src={abodeLogo}
            alt="The Abode"
            className="footer-logo-image"
          />
        </button>

        <p className="footer-tagline">
          Refined Hospitality.
        </p>

        <span className="footer-brand-caption">
          Tembea Vasha.
        </span>
      </div>

      <div className="footer-navigation">
        <div className="footer-column">
          <h3>EXPLORE</h3>

          <button
            onClick={() =>
              document.getElementById("story")?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Our Story
          </button>

          <button
            onClick={() =>
              document.getElementById("rooms")?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Our Rooms
          </button>

          <button
            onClick={() =>
              document.getElementById("amenities")?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Amenities
          </button>

          <button
            onClick={() =>
              document.getElementById("faq")?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            FAQs
          </button>
        </div>

        <div className="footer-column">
          <h3>FIND US</h3>

          <p>Nakuru–Naivasha Highway</p>
          <p>Kenya</p>

          <a href="tel:+254711308481">
            +254 711 308 481
          </a>

          <a href="mailto:contact@theabode.com">
            contact@theabode.com
          </a>
        </div>
      </div>
    </div>

    

<div className="footer-socials">
  <span className="footer-social-label">
    FOLLOW OUR JOURNEY
  </span>

  <div className="footer-social-links">
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      title="Instagram"
    >
      <FaInstagram size={19} />
    </a>

    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      title="Facebook"
    >
      <FaFacebookF size={19} />
    </a>

    <a
      href="https://www.tiktok.com/@the.abode.hotel.na?_r=1&_t=ZS-9ASdnh9mr7G"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
      title="TikTok"
    >
      <FaTiktok size={19} />
    </a>

   
<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with The Abode on WhatsApp"
  title="WhatsApp"
>
  <FaWhatsapp size={19} />
</a>

<a
  href="https://www.booking.com/hotel/ke/the-abode-naivasha.html"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-booking-link"
  aria-label="View The Abode on Booking.com"
  title="Booking.com"
>
  Booking.com
</a>

  </div>
</div>



    <div className="footer-bottom">
      <p>
        © {new Date().getFullYear()} The Abode.
        All rights reserved.
      </p>

      <p>
        Thoughtfully designed & developed by
        <span> Ivy Nyambura.</span>
      </p>

      <button
        type="button"
        className="footer-back-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }
      >
        Back to top ↑
      </button>
    </div>
  </div>
</footer>



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