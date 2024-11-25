/* eslint-disable react/prop-types */
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title?.split("<br/>").map((line, index) => (
        <div
          className="flex-center max-w-full gap-2 md:gap-3 flex-wrap px-10 "
          key={index}
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              dangerouslySetInnerHTML={{ __html: word }}
              className="animated-word"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
