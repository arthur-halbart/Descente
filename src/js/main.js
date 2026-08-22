import "../scss/main.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

///////////////////////////////////////////////////Menu Burger
  
const SiteHeader = () => {
  const btn = document.querySelector(".nav-toggle");
  const overlay = document.querySelector(".nav-overlay");

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    overlay.classList.toggle("open");
  });
};

////////////////////////////Animation principal inspiration -> https://gsap.com/ | https://gsap.com/docs/v3/

//////////////ANIMATION HERO

const HeroAnimation = () => {
  const hero = document.querySelector(".hero");
  const introCard = document.querySelector(".intro__card");
  const sloganLines = gsap.utils.toArray(".slogan__line");
  const heroElements = gsap.utils.toArray([".hero__graphic", ".hero__logo", ".hero__footer"]);

  if (!hero || !introCard || heroElements.length === 0) {
    return;
  }

  gsap.set(introCard, { 
    xPercent: -50, 
    yPercent: -50, 
    width: "30vw", 
    height: "40vh", 
    opacity: 0, 
    borderRadius: "8px" 
  });


  const introAnim = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=250%",
      pin: true,
      scrub: 1,
    }
  });

  introAnim
    .to(heroElements, { 
      yPercent: -30, 
      opacity: 0, 
      stagger: 0.05, 
      duration: 0.8, 
    })
    .to(introCard, { 
      opacity: 1, 
      duration: 0.3, 
    }, ">")

    .to(introCard, { 
      width: "100vw", 
      height: "100vh", 
      borderRadius: "0px",
       duration: 1.2, 
      })
};


////////////////////SCROLL HORIZONTALE
const ScrollHorizontale = () => {
const section = document.querySelector(".parcours, .avarice");
 const wrapper = document.querySelector(".parcours__wrapper, .avarice__wrapper");

if (!section || !wrapper) {
  return;
}

let responsive = gsap.matchMedia();

responsive.add("(min-width: 1024px)", () => {
const totalContentWidth = wrapper.scrollWidth;
const visibleAreaWidth = section.offsetWidth;
const scrollDistance = totalContentWidth - visibleAreaWidth;

if (scrollDistance <= 0) return;

    gsap.to(wrapper, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
};

//////////////////////////////////////////////////////////////////////////Envie animation page

const liberties = gsap.utils.toArray(".envie__liberty");

liberties.forEach((el) => {
  el.addEventListener("click", () => {
    const isOpen = el.classList.contains("is-open");

    liberties.forEach((other) => other.classList.remove("is-open"));

    if (!isOpen) {
      el.classList.add("is-open");
    }
  });
});

  //////////////////////Animation Colere Page 

  const ColereResolutionReveal = () => {
    const climax = document.querySelector(".colere__block--climax");
    const panel = document.querySelector(".colere__block--resolution");
  
    if (!climax || !panel) {
      return;
    }
  
    gsap.set(panel, {
      xPercent: -50,
      yPercent: -50,
      width: "30vw",
      height: "30vh",
      opacity: 0,
      borderRadius: "50%",
    });
  
    const revealAnim = gsap.timeline({
      scrollTrigger: {
        trigger: climax,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1,
      },
    });
  
    revealAnim
      .to(panel, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
      })
      .to(panel, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 2,
        ease: "power2.inOut",
      });
  };



/////////////////////////////////////////////////Gallery Gourmandise 

const GourmandiseGallery = () => {
  const galleries = gsap.utils.toArray(".gourmandise__gallery");
  if (galleries.length === 0) return;

  galleries.forEach((gallery, index) => {
    const wrapper = gallery.querySelector(".gourmandise__gallery-wrapper");
    if (!wrapper) return;

    const scrollDistance = wrapper.scrollWidth - gallery.offsetWidth;
    if (scrollDistance <= 0) return;

    const [xStart, xEnd] = (index % 2)
      ? ["0%", -scrollDistance]
      : [-scrollDistance, 0];

    gsap.fromTo(wrapper,
      { x: xStart },
      {
        x: xEnd,
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          scrub: 1,
          invalidateOnRefresh: true
        }
      }
    );
  });
};

///////////////////////////////////////////////////Animation de textes GSAP  https://codepen.io/GreenSock/pen/GggpRoB

const Reveal = () => {
  const targets = gsap.utils.toArray(".reveal");
  if (targets.length === 0) return;

  gsap.set(targets, 
    { opacity: 1 
    });

  document.fonts.ready.then(() => {
    targets.forEach((el) => {
      SplitText.create(el, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,

        onSplit: (instance) => {
          return gsap.from(instance.lines, {
            yPercent: 120,
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              scrub: true,
              start: "clamp(top center)",
              end: "clamp(bottom center)",
            },
          });
        },
      });
    });
  });
};

 
SiteHeader();
HeroAnimation();
ScrollHorizontale();
ColereResolutionReveal();
GourmandiseGallery();
Reveal();

//////////////////////////////////