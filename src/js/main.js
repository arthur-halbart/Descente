import "../scss/main.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  gsap.set([".intro__card", ".intro__card-wrapper",], {
    xPercent: -50, 
    yPercent: -50
  });

  const introAnim = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero", 
      start: "top top",
      end: "+=200%",  
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }
  });

  introAnim
    .fromTo(".intro__card", { 
        scale: 0.5, 
        opacity: 0 
    }, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8,
        force3D: true 
    })
    .to(".intro__card", { 
        width: "100vw", 
        height: "100vh",
        duration: 1.5, 
        force3D: true 
    })

    // .to(".intro__slogan", {
    //     opacity: 1,
    //     y: 0, 
    //     duration: 1,
    //     ease: "power2.out"
    // });

});