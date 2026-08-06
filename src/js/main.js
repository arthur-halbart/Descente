import "../scss/main.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. L'ANIMATION INTERNE DU HERO (La séquence d'introduction)
// ==========================================================================
const HeroAnimation = () => {
  const hero = document.querySelector(".hero");
  const introCard = document.querySelector(".intro__card");
  const sloganLines = gsap.utils.toArray(".slogan__line");
  const heroElements = gsap.utils.toArray([".hero__graphic", ".hero__logo", ".hero__footer"]);

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
      anticipatePin: 1
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


const PageTransitions = () => {
  const hero = document.querySelector(".hero");
  const preface = document.querySelector(".preface");

  gsap.to(hero, {
    yPercent: 150, 
    ease: "none", 
    scrollTrigger: {
      trigger: preface,
      start: "top bottom", 
      end: "top top",      
      scrub: true          
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {  

  if (document.querySelector(".hero")) {
    HeroAnimation();
  }
  if (document.querySelector(".preface")) {
    PageTransitions();
  }
});