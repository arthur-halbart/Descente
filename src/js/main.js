import "../scss/main.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

////////////////////////////Animation principal inspiration -> https://gsap.com/ 

//////////////ANIMATION HERO

const HeroAnimation = () => {
  const hero = document.querySelector(".hero");
  const introCard = document.querySelector(".intro__card");
  const sloganLines = gsap.utils.toArray(".slogan__line");
  const heroElements = gsap.utils.toArray([".hero__graphic", ".hero__logo", ".hero__footer"]);

  if (!hero || !introCard || sloganLines.length === 0 || heroElements.length === 0) {
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
  gsap.set(sloganLines, { yPercent: 110 });

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
      ease: "power2.inOut" 
    })
    .to(introCard, { 
      opacity: 1, 
      duration: 0.3, 
      ease: "power1.inOut" 
    }, ">")
    .to(introCard, { 
      width: "100vw", 
      height: "100vh", 
      borderRadius: "0px",
       duration: 1.2, 
       ease: "power2.inOut" 
      })
    .to(sloganLines, { 
      yPercent: 0, 
      duration: 0.8, 
      stagger: 0.1, 
      ease: "power4.out" 
    });
};


const IntroTransitions = () => {
  const hero = document.querySelector(".hero");
  const preface = document.querySelector(".preface");

  if (!hero || !preface) {
    return;
  }

  gsap.to(hero, {
    yPercent: 150, 
    scrollTrigger: {
      trigger: preface,
      start: "top bottom", 
      end: "top top",      
      scrub: true          
    }
  });
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


///////////////////////ANIMATION PAGE PARESSE | GSAP -> codePen : "https://codepen.io/GreenSock/pen/rNOebyo"

const ParesseCrossfade = () => {
  const container = document.querySelector(".page--paresse");
  if (!container) return;

  const sections = gsap.utils.toArray(".page--paresse .slide");
  if (sections.length === 0) return;

  let currentSection = sections[0];

  gsap.defaults({ overwrite: "auto", duration: 0.6 });

  gsap.set("body", { height: sections.length * window.innerHeight });

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      start: () => (i - 0.5) * window.innerHeight,
      end: () => (i + 0.5) * window.innerHeight,
      onToggle: self => self.isActive && setSection(section)
    });
  });

  function setSection(newSection) {
    if (newSection !== currentSection) {
      const oldContent = currentSection.querySelector(".slide__content");
      const newContent = newSection.querySelector(".slide__content");

      gsap.to(oldContent, { y: -30, autoAlpha: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(currentSection, { autoAlpha: 0, duration: 0.4 });

      gsap.set(newSection, { autoAlpha: 1 });
      gsap.fromTo(newContent,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.2, ease: "power3.out" }
      );

      currentSection = newSection;
    }
  }

  gsap.set(sections.slice(1), { autoAlpha: 0 });

  document.querySelectorAll(".page--paresse .slide").length
};

//////////////////////////////////////////////////////////////////////////Envie animation page

  const liberties = gsap.utils.toArray(".envie__liberty");
 
  liberties.forEach((el) => {
    const toggle = () => {
      const wasOpen = el.classList.contains("is-open");
 
      liberties.forEach((other) => {
        other.classList.remove("is-open");
        other.setAttribute("aria-expanded", "false");
      });
 
      if (!wasOpen) {
        el.classList.add("is-open");
        el.setAttribute("aria-expanded", "true");
      }
    };
 
    el.addEventListener("click", toggle);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

 
HeroAnimation();
IntroTransitions();
ScrollHorizontale();
ParesseCrossfade();


//////////////////////////////////