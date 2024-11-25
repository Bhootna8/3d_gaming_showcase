import React, { useEffect, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import gsap from "gsap";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="" />
  </div>
);

const Contact = () => {
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect(); // Get dimensions of the container

    const xOffset = clientX - (rect.left + rect.width / 2); // Calculate X offset
    const yOffset = clientY - (rect.top + rect.height / 2); // Calculate Y offset

    if (hovering) {
      gsap.to("#contact", {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 3, // Add 3D rotation effect
        rotationX: -yOffset / 3,
        transformPerspective: 2000, // Perspective for realistic 3D effect
        duration: 1,
        ease: "power1.out",
      });

      gsap.to("#contact-container", {
        x: -xOffset / 3,
        y: -yOffset / 3,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    if (!hovering) {
      gsap.to("#contact", {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to("#contact-container", {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [hovering]);
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div
        id="contact-container"
        className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden"
      >
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src={"/img/contact-1.webp"}
            clipClass={"contact-clip-path-1"}
          />

          <ImageClipBox
            src={"/img/contact-2.webp"}
            clipClass={"contact-clip-path-2 lg:translate-y-40 translate-y-60"}
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src={"/img/swordman-partial.webp"}
            clipClass={"absolute md:scale-125"}
          />
          <ImageClipBox
            src={"/img/swordman.webp"}
            clipClass={"sword-man-clip-path md:scale-125"}
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Zentry
          </p>

          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatedTitle
              title={
                "let&#39;s b<b>u</b>ild the <br/> new era of <br/> g<b>a<b/>ming t<b>o</b>gether."
              }
              containerClass={
                "special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
              }
            />
          </div>

          <Button
            title={"contact us"}
            containerClass={"mt-10 cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
