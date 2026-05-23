"use client";
import React from "react";
import { motion } from "motion/react";
import TextReveal from "@/components/TextReveal";

const testimonials = [
  {
    text: "The Beast Smash is genuinely the best burger in East London. 52g of protein and it actually tastes unreal. I order after every leg day.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Jamie",
    name: "Jamie Holloway",
    role: "Fitness Coach",
  },
  {
    text: "Finally a place in Shoreditch that takes macros seriously without sacrificing flavour. The Powerhouse Bowl is my post-training ritual.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Priya",
    name: "Priya Osei",
    role: "Nutritionist",
  },
  {
    text: "Iron Stack is dangerous. Three patties and I still hit my protein goals for the day. Best thing to happen to Bethnal Green. Full stop.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Tom",
    name: "Tom McAllister",
    role: "Personal Trainer",
  },
  {
    text: "I've tried every high-protein meal prep service in London. Nothing compares to eating at IRONPLATE fresh, hot, and loaded with flavour.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Sofia",
    name: "Sofia Chen",
    role: "CrossFit Athlete",
  },
  {
    text: "The Midnight Burn hit different. Ghost pepper sauce had me sweating but I couldn't stop eating. Absolute banger of a burger.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Marcus",
    name: "Marcus Adebayo",
    role: "Food Blogger",
  },
  {
    text: "Brought my entire rugby squad here after a match. Every single one of them is now a regular. The protein numbers are insane.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Liam",
    name: "Liam Gallagher",
    role: "Rugby Captain",
  },
  {
    text: "As a dietitian, I'm usually skeptical of 'high-protein' claims. IRONPLATE actually delivers. Real food, real macros, no gimmicks.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Hannah",
    name: "Hannah Reeves",
    role: "Registered Dietitian",
  },
  {
    text: "Best late-night food in East London, hands down. The fact that it's protein-packed is just a bonus. The taste alone would bring me back.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Daniel",
    name: "Daniel Okonkwo",
    role: "Night Shift Worker",
  },
  {
    text: "I meal-prep every Sunday but Fridays are IRONPLATE days. The Powerhouse Bowl is my cheat that isn't actually a cheat. Genius menu.",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Emily",
    name: "Emily Sato",
    role: "Yoga Instructor",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ flex: 1, minWidth: 0 }}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
        style={{ willChange: 'transform' }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="rounded-3xl w-full"
                  key={i}
                  style={{
                    background: 'var(--iron-surface)',
                    border: '1px solid var(--iron-border)',
                    boxShadow: '0 4px 24px rgba(232, 80, 26, 0.08)',
                    padding: 'clamp(20px, 3vw, 32px)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      fontStyle: 'italic',
                      color: 'var(--iron-cream)',
                      lineHeight: 1.7,
                    }}
                  >
                    &ldquo;{text}&rdquo;
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                      style={{
                        background: 'var(--iron-elevated)',
                        border: '2px solid var(--iron-orange)',
                      }}
                    />
                    <div className="flex flex-col">
                      <div
                        className="font-medium tracking-tight leading-5"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--iron-cream)',
                        }}
                      >
                        {name}
                      </div>
                      <div
                        className="leading-5 tracking-tight"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--iron-muted)',
                          letterSpacing: 1,
                        }}
                      >
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section
      id="reviews"
      style={{
        background: 'var(--iron-bg)',
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 48px)',
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 64px)' }}>
        <TextReveal delay={0}>
          <span className="section-label">WHAT THEY SAY</span>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: 'var(--iron-cream)',
              lineHeight: 1,
              marginTop: 12,
            }}
          >
            REAL REVIEWS FROM{' '}
            <span style={{ color: 'var(--iron-orange)' }}>REAL LIFTERS</span>
          </h2>
        </TextReveal>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'var(--iron-muted)',
            marginTop: 16,
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          Don&apos;t just take our word for it. Hear from the people who fuel their gains at IRONPLATE every week.
        </p>
      </div>

      {/* Scrolling Columns Wrapper */}
      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          maxHeight: 740,
          overflow: 'hidden',
        }}
      >
        {/* Top Fade Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100,
            background: 'linear-gradient(to bottom, var(--iron-bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom Fade Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: 'linear-gradient(to top, var(--iron-bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling Columns Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 2vw, 24px)',
            maxHeight: 740,
            overflow: 'hidden',
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
