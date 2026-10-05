import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Play,
  Plus,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

gsap.registerPlugin(ScrollTrigger);

type MenuItem = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  color: string;
  tag?: string;
};

type GalleryItem = {
  image: string;
  alt: string;
  size: string;
};

const photos = {
  citrus: 'https://images.pexels.com/photos/35667646/pexels-photo-35667646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  strawberry: 'https://images.pexels.com/photos/36673074/pexels-photo-36673074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mojito: 'https://images.pexels.com/photos/4966104/pexels-photo-4966104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mojitoDark: 'https://images.pexels.com/photos/11009215/pexels-photo-11009215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  shake: 'https://images.pexels.com/photos/28525200/pexels-photo-28525200.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  shakeAlt: 'https://images.pexels.com/photos/14662100/pexels-photo-14662100.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mocktail: 'https://images.pexels.com/photos/12419177/pexels-photo-12419177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  fizz: 'https://images.pexels.com/photos/8880742/pexels-photo-8880742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  red: 'https://images.pexels.com/photos/24870657/pexels-photo-24870657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  splash: 'https://images.pexels.com/photos/39130899/pexels-photo-39130899.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  colorful: 'https://images.pexels.com/photos/4669292/pexels-photo-4669292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  drink1:"../images/drinks/1.png",
  drink2:"../images/drinks/2.png",
};

const menuItems: MenuItem[] = [
  { name: 'Classic Soda', category: 'Soda', description: 'Fresh lime, soda & a sparkle of joy.', price: '₹80', image: photos.fizz, color: '#c4ee78' },
  { name: 'Blue Lagoon Mojito', category: 'Mojito', description: 'Mint, lime and electric blue freshness.', price: '₹140', image: photos.mojitoDark, color: '#70d9e6', tag: 'Bestseller' },
  { name: 'Strawberry Mojito', category: 'Mojito', description: 'Sweet strawberry with garden-fresh mint.', price: '₹150', image: photos.strawberry, color: '#ff7a70' },
  { name: 'Chocolate Shake', category: 'Shake', description: 'Dark, rich and unapologetically creamy.', price: '₹160', image: photos.shake, color: '#d7a16b' },
  { name: 'Oreo Shake', category: 'Shake', description: 'Creamy vanilla loaded with Oreo crunch.', price: '₹180', image: photos.shakeAlt, color: '#bba6e2', tag: 'Must try' },
  { name: 'Mango Special', category: 'Specials', description: 'The season’s juiciest sunshine in a glass.', price: '₹130', image: photos.mocktail, color: '#ffc65c', tag: 'Seasonal' },
];

const galleryItems: GalleryItem[] = [
  { image: photos.citrus, alt: 'Colorful citrus drinks', size: 'gallery-wide' },
  { image: photos.mojito, alt: 'Fresh mojito with mint and lime', size: '' },
  { image: photos.shake, alt: 'Chocolate milkshake', size: '' },
  { image: photos.mocktail, alt: 'Fresh fruit mocktail', size: 'gallery-tall' },
  { image: photos.colorful, alt: 'Colorful mocktails', size: '' },
  { image: photos.red, alt: 'Berry red mocktail', size: 'gallery-wide' },
  { image: photos.citrus, alt: 'Colorful citrus drinks', size: 'gallery-wide' },
  { image: photos.mojito, alt: 'Fresh mojito with mint and lime', size: '' },
];

const categories = ['All', 'Soda', 'Mojito', 'Shake', 'Mocktail', 'Specials'];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filteredMenu = useMemo(
    () => activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const loader = gsap.timeline({ onComplete: () => setIsLoading(false) });
    loader.to('.loader-ring', { rotation: 360, duration: 1.4, ease: 'power2.inOut' })
      .to('.loader-content', { opacity: 0, scale: 0.92, duration: 0.45, ease: 'power2.in' })
      .to('.loader', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' });

    const context = gsap.context(() => {
      const marqueeTrack = document.querySelector(
  '.drink-marquee-track'
) as HTMLElement | null;

if (marqueeTrack) {
  const cards = marqueeTrack.querySelectorAll(
    '.drink-marquee-card'
  );

  const firstCard = cards[0] as HTMLElement;

  const cardWidth = firstCard.offsetWidth;
  const gap = 24;

  const totalWidth =
    (cardWidth + gap) * menuItems.slice(1, 5).length;

  gsap.to(marqueeTrack, {
    x: `-=${totalWidth}`,
    duration: 18,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((value) => {
        const x = parseFloat(value);

        return x <= -totalWidth
          ? x + totalWidth
          : x;
      }),
    },
  });
}
      gsap.from('.hero-logo', { opacity: 0, scale: 0.75, duration: 1.2, delay: 1.6, ease: 'back.out(1.5)' });
      gsap.from('.hero-kicker, .hero-title-line, .hero-copy, .hero-actions', { opacity: 0, y: 26, duration: 0.8, stagger: 0.1, delay: 1.9, ease: 'power3.out' });
      gsap.to('.hero-glow', { y: 90, x: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.floating-bubble', { y: -120, opacity: 0, duration: 4, stagger: 0.8, repeat: -1, ease: 'none' });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.from(element, { opacity: 0, y: 38, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } });
      });
      gsap.utils.toArray<HTMLElement>('.counter').forEach((element) => {
        const target = Number(element.dataset.value ?? 0);
        gsap.fromTo(element, { innerText: 0 }, { innerText: target, duration: 1.8, snap: { innerText: 1 }, scrollTrigger: { trigger: element, start: 'top 84%' } });
      });
      gsap.to('.story-image', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.story-image-wrap', start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    return () => { loader.kill(); context.revert(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      {isLoading && 
      <div className="loader"><div className="loader-content"><img src="/images/logo.png" alt="Mahajan Family Soda Point" /><div className="loader-ring"><span /></div></div></div>
      }

      <header className="navbar-wrap">
        <nav className="navbar container-fluid">
          <button className="brand-lockup" onClick={() => scrollTo('home')} aria-label="Go to homepage"><img src="/images/logo.png" alt="Mahajan Family Soda Point logo" /><span>MAHAJAN<small>Family Soda Point</small></span></button>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {['home', 'about', 'menu', 'specials', 'franchise', 'gallery'].map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
            <button className="nav-order mobile-order" onClick={() => scrollTo('contact')}>Contact Us <ArrowRight size={16} /></button>
          </div>
          <button className="nav-order desktop-order" onClick={() => scrollTo('contact')}>Contact Us <ArrowRight size={16} /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">{menuOpen ? <X size={24} /> : <MenuIcon size={24} />}</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-glow" /><div className="hero-grid" />
          <div className="bubble-field">{Array.from({ length: 10 }, (_, index) => <i key={index} className="floating-bubble" style={{ left: `${10 + index * 9}%`, animationDelay: `${index * 0.45}s` }} />)}</div>
          <div className="hero-content container-fluid">
            <div className="hero-copy-col"><p className="eyebrow hero-kicker"><span /> Est. 2000 · Freshly poured</p><h1><span className="hero-title-line">Refresh</span><em className="hero-title-line">Your Mood.</em></h1><p className="hero-copy">Sodas, mojitos, creamy shakes and unforgettable flavors — made for every generation.</p><div className="hero-actions"><button className="button button-gold" onClick={() => scrollTo('menu')}>Explore our menu <ArrowRight size={17} /></button><button className="button button-quiet" onClick={() => scrollTo('contact')}><MapPin size={17} /> Visit us</button></div><div className="hero-meta"><span><strong>25+</strong> years of refreshment</span><span><strong>20+</strong> signature flavors</span></div></div>
            <div className="hero-product"><div className="hero-product-orbit" /><div className="hero-product-image"><img src={photos.drink2} alt="Colorful refreshing drinks" /><div className="image-sticker">Fresh<br /><b>always</b></div></div><div className="hero-product-label"><small>Today's mood</small><strong>Something<br />refreshing</strong></div></div>
          </div>  
          <button className="scroll-cue" onClick={() => scrollTo('about')}><span>Scroll to sip</span><ArrowDown size={15} /></button>
        </section>

        <section id="about" className="about-section section-light">
          <div className="container-fluid section-inner about-grid"><div className="story-image-wrap reveal"><div className="image-frame"><img className="story-image" src="../images/drinks/ab.jpg" alt="Fresh mojito with mint and lime" /><span className="frame-note">Made with a little<br /><b>extra joy.</b></span></div><div className="vertical-note">MAHAJAN · FAMILY · SODA POINT</div></div><div className="story-copy reveal"><p className="eyebrow">A local icon, since 2000</p><h2>More than just<br /><em>a soda.</em></h2><p>Some places serve drinks. We serve the pause in your day, the after-school treat, the late-night catch-up and the little moments that become memories.</p><p>For 25+ years, Mahajan has been mixing fresh ingredients, big flavors and family warmth into every glass.</p><button className="text-link" onClick={() => scrollTo('contact')}>Our story <ArrowRight size={16} /></button><div className="stats"><div><strong><span className="counter" data-value="25">0</span>+</strong><span>Years of<br />refreshment</span></div><div><strong><span className="counter" data-value="10">0</span>K+</strong><span>Happy<br />customers</span></div><div><strong><span className="counter" data-value="20">0</span>+</strong><span>Refreshing<br />flavors</span></div></div></div></div>
        </section>

        <section id="menu" className="menu-section section-cream"><div className="container-fluid section-inner"><div className="section-heading reveal"><div><p className="eyebrow">The good stuff</p><h2>Our signature<br /><em>refreshments.</em></h2></div><p>Pick a mood. Pick a flavor.<br />We’ll do the pouring.</p></div><div className="category-tabs reveal">{categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="menu-grid">{filteredMenu.map((item) => <article className="menu-card reveal" key={item.name} style={{ '--drink-color': item.color } as CSSProperties}><div className="menu-image"><img src={item.image} alt={item.name} /><span className="plus-icon"><Plus size={18} /></span>{item.tag && <span className="menu-tag">{item.tag}</span>}</div><div className="menu-info"><div><p>{item.category}</p><h3>{item.name}</h3><span>{item.description}</span></div><strong>{item.price}</strong></div></article>)}</div></div></section>

      <section id="specials" className="showcase-section">
  <div className="showcase-heading container-fluid">
    <p className="eyebrow">Choose your color</p>

    <h2>
      Pick your<br />
      <em>refreshment.</em>
    </h2>
  </div>

  <div className="drink-marquee">
    <div className="drink-marquee-track">
      {[...menuItems.slice(1, 5), ...menuItems.slice(1, 5)].map(
        (item, index) => (
          <div
            className="drink-marquee-card"
            key={`${item.name}-${index}`}
            style={
              {
                '--drink-color': item.color,
              } as CSSProperties
            }
          >
            <img src={item.image} alt={item.name} />

            <div className="showcase-overlay">
              <small>{item.category}</small>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              {/* <span>
                Explore flavor <ArrowRight size={14} />
              </span> */}
            </div>
          </div>
        )
      )}
    </div>
  </div>
</section>
        <section id="franchise" className="franchise-section"><div className="container-fluid section-inner"><div className="franchise-intro reveal"><div><p className="eyebrow">Bring the mood to your city</p><h2>Make Mahajan<br /><em>your next move.</em></h2></div><div><p>Join a growing family of refreshment lovers and bring our signature sodas, mojitos and shakes to your neighbourhood.</p><button className="button button-gold" onClick={() => scrollTo('contact')}>Become a franchise partner <ArrowRight size={17} /></button></div></div><div className="franchise-grid"><article className="franchise-card reveal"><span className="franchise-number">01</span><Sparkles size={22} /><h3>Compact kiosk</h3><p>A smart, efficient format built for high-footfall spots and quick refreshment runs.</p><strong>Perfect for high-energy locations</strong></article><article className="franchise-card franchise-card-featured reveal"><span className="franchise-number">02</span><Flame size={22} /><h3>Family outlet</h3><p>A welcoming Mahajan destination for families, friends and the everyday catch-up.</p><strong>Our most-loved format</strong></article><article className="franchise-card reveal"><span className="franchise-number">03</span><Star size={22} /><h3>Flagship experience</h3><p>A standout space with the full Mahajan menu, signature styling and room to linger.</p><strong>For ambitious local partners</strong></article></div></div></section>\n\n        <section className="why-section section-light"><div className="container-fluid section-inner"><div className="section-heading reveal"><div><p className="eyebrow">The Mahajan way</p><h2>Good vibes<br /><em>in every sip.</em></h2></div><p>Freshness is not a trend<br />around here. It’s tradition.</p></div><div className="feature-grid">{[{ icon: Sparkles, title: 'Fresh ingredients', copy: 'Made fresh, every time.' }, { icon: Flame, title: 'Perfect taste', copy: 'Balanced flavors in every sip.' }, { icon: Users, title: 'Family favorite', copy: 'Loved by every generation.' }, { icon: Star, title: 'Since 2000', copy: 'Trusted for 25+ years.' }].map(({ icon: Icon, title, copy }) => <div className="feature-card reveal" key={title}><Icon size={23} strokeWidth={1.4} /><h3>{title}</h3><p>{copy}</p><span>0{Math.floor(Math.random() * 4) + 1}</span></div>)}</div></div></section>

        <section className="cinematic-section"><div className="cinematic-bg" style={{ backgroundImage: `url(${photos.splash})` }} /><div className="cinematic-content reveal"><p className="eyebrow">Pour a little happiness</p><h2>One sip.<br /><em>Pure refreshment.</em></h2><p>Experience the Mahajan taste.</p><button className="play-button" onClick={() => scrollTo('menu')}><Play size={15} fill="currentColor" /> Watch the pour</button></div></section>

        <section id="gallery" className="gallery-section section-cream"><div className="container-fluid section-inner"><div className="section-heading reveal"><div><p className="eyebrow">A little eye candy</p><h2>Made for your<br /><em>camera roll.</em></h2></div><p>Colorful pours, big smiles<br />and plenty of reasons to visit.</p></div><div className="gallery-grid">{galleryItems.map((item) => <button className={`gallery-item ${item.size} reveal`} key={item.image} onClick={() => setLightbox(item)}><img src={item.image} alt={item.alt} /><span><Plus size={18} /></span></button>)}</div></div></section>

        <section className="reviews-section section-light"><div className="container-fluid section-inner reviews-layout"><div className="reviews-intro reveal"><p className="eyebrow">The word on the street</p><h2>People love<br /><em>Mahajan.</em></h2><div className="review-stars">★★★★★</div><p className="review-count">4.9 / 5 from our happy regulars</p></div><div className="review-card reveal"><div className="quote-mark">“</div><p>Great taste, amazing shakes and the perfect place to chill with friends. The kind of place you come back to without even thinking about it.</p><div className="review-person"><span>AS</span><div><strong>Ananya S.</strong><small>Regular since 2018</small></div><div className="review-arrows"><button aria-label="Previous review">←</button><button aria-label="Next review">→</button></div></div></div></div></section>

        <section id="contact" className="visit-section"><div className="container-fluid section-inner visit-grid"><div className="visit-copy reveal"><p className="eyebrow">Your next stop</p><h2>Come get<br /><em>refreshed.</em></h2><p>Bring your people, bring your mood. We’ll bring the good stuff.</p><div className="visit-details"><div><MapPin size={18} /><span><strong>Mahajan Family Soda Point</strong><br />[ADD SHOP ADDRESS]</span></div><div><Clock3 size={18} /><span><strong>Open every day</strong><br />[ADD TIMINGS]</span></div><div><Phone size={18} /><span><strong>Say hello</strong><br />[ADD PHONE NUMBER]</span></div></div><div className="hero-actions"><button className="button button-gold"><MapPin size={17} /> Get directions</button><button className="button button-dark"><Phone size={17} /> Call now</button></div></div><div className="map-card reveal"><div className="map-grid" /><div className="map-pin"><MapPin size={25} fill="currentColor" /><span>Mahajan<br /><small>you are here</small></span></div><div className="map-label">Good drinks this way <ArrowRight size={15} /></div></div></div></section>

        <section className="final-cta"><div className="cta-bubbles">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ left: `${12 + index * 11}%`, bottom: `${18 + (index % 3) * 12}%` }} />)}</div><div className="reveal"><p className="eyebrow">The mood is calling</p><h2>What are you<br /><em>waiting for?</em></h2><p>Your perfect refreshment is just one sip away.</p><button className="button button-gold" onClick={() => scrollTo('contact')}>Visit Mahajan <ArrowRight size={17} /></button></div></section>
      </main>

      <footer className="footer"><div className="container-fluid footer-top"><div className="footer-brand"><img src="/images/logo.png" alt="Mahajan logo" /><p>Mahajan Family Soda Point — Since 2000</p></div><div className="footer-links"><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('about')}>About</button><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('franchise')}>Franchise</button><button onClick={() => scrollTo('gallery')}>Gallery</button><button onClick={() => scrollTo('contact')}>Contact</button></div><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={18} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={18} /></a><a href="#whatsapp" aria-label="WhatsApp"><MessageCircle size={18} /></a></div></div><div className="footer-bottom container-fluid"><span>Made with care for every generation.</span><span>Refresh your mood.</span></div></footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X size={24} /></button><img src={lightbox.image} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /></div>}
    </div>
  );
}

export default App;
