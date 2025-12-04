"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGSAPAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Hero fade in
    gsap.from(".hero__content", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    });

    // Cards stagger animation
    gsap.from(".card", {
      scrollTrigger: {
        trigger: ".card",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Stats counter animation
    gsap.from(".stats__number", {
      scrollTrigger: {
        trigger: ".stats",
        start: "top 70%",
      },
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });

    // Section titles
    gsap.utils.toArray(".text-display").forEach((element: any) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    // Smooth scroll for buttons/links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const target = document.querySelector(href);
          if (target) {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: target, offsetY: 80 },
              ease: "power3.inOut",
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
