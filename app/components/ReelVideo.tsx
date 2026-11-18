"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Sparkles,
  Users,
  Rocket,
  Award,
  Volume2,
  VolumeX,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROGRAM_PILLARS = [
  {
    icon: Sparkles,
    badgeBg: "bg-amber-300",
    badgeText: "المسار التكويني",
    title: "3 مراحل متكاملة",
    description: "بناء الشخصية، التمكين الرقمي، وتأهيل المدربين (TOT)",
    position: "left-0 top-6 -rotate-2",
  },
  {
    icon: Users,
    badgeBg: "bg-sky-200",
    badgeText: "المجتمع المستهدف",
    title: "18 إلى 35 سنة",
    description: "للشباب الجزائري الطموح الساعي لصناعة أثر حقيقي",
    position: "right-0 top-12 rotate-2",
  },
  {
    icon: Rocket,
    badgeBg: "bg-emerald-200",
    badgeText: "مهارات العصر",
    title: "ذكاء اصطناعي ومقاولاتية",
    description: "تطبيق عملي على أدوات AI، دراسة السوق، ونموذج العمل (BMC)",
    position: "right-4 bottom-10 -rotate-1",
  },
  {
    icon: Award,
    badgeBg: "bg-rose-200",
    badgeText: "المخرجات العملية",
    title: "مشاريع و Demo Day",
    description: "إطلاق مشاريع واقعية وعرضها أمام لجنة موجهين وخبراء",
    position: "left-4 bottom-8 rotate-1",
  },
];

export default function ReelVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Play video automatically on scroll into view, pause on scroll out
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Browser standard: muted is required for guaranteed autoplay on both desktop and mobile
    video.muted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.2, // Triggers when at least 20% is in viewport
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    video.volume = 1.0;
    setIsMuted(nextMuted);
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative w-full my-16 overflow-hidden px-4 py-16 sm:px-8 lg:px-12"
    >
      {/* Section Header */}
      <div className="relative mx-auto max-w-5xl text-center">
        <span className="inline-flex mb-3 items-center gap-2 border-2 border-black heading bg-secondary px-5 py-1.5 text-xl -rotate-2 font-bold text-black shadow-[3px_3px_0_0_#111111]">
          فيديو تعريفي بالمشروع
        </span>
        <h2
          ref={titleRef}
          className="heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900"
        >
          كل ما تحتاج معرفته عن
          <span className="text-primary heading"> تجربة مخيم الرواد</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          شاهد الفيديو الرسمي للتعرف على كواليس البرنامج، ورشات العمل، والمسارات التطبيقية لصناعة قادة الغد.
        </p>
      </div>

      {/* Main Video Presentation Area */}
      <div className="relative mx-auto mt-14 max-w-6xl">
        {/* Background Decorative Rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2  border-2 border-dashed border-primary/20 sm:h-[540px] sm:w-[540px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 border border-secondary/30 sm:h-[450px] sm:w-[450px]" />

        {/* Center Smartphone Mockup Frame */}
        <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[340px]">
          <div className="relative  border-4 border-black rounded-md bg-black p-2 shadow-[10px_10px_0_0_#111111] transition-transform hover:scale-[1.01]">
            {/* Phone Notch/Speaker */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 h-4 w-24  bg-black/80 flex items-center justify-center">
              <span className="h-1.5 w-8  bg-white/20" />
            </div>

            {/* Video Container */}
            <div className="relative aspect-[9/16] w-full overflow-hidden  bg-slate-950">
              <video
                ref={videoRef}
                className="h-full w-full object-cover cursor-pointer"
                loop
                muted={isMuted}
                autoPlay
                playsInline
                preload="auto"
                onClick={toggleSound}
              >
                <source src="/videodef.mp4" type="video/mp4" />
                متصفحك لا يدعم تشغيل هذا الفيديو.
              </video>

              {/* Sound Toggle Button Overlay */}
              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 border-2 border-black bg-white/95 px-3 py-1.5 text-xs font-bold text-black shadow-[2px_2px_0_0_#111111] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX size={15} className="text-rose-600" />
                    <span>الصوت مكتوم (انقر للتشغيل 🔊)</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={15} className="text-primary animate-pulse" />
                    <span>الصوت يعمل 🔊</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Surrounding Authentic Program Cards (Desktop / Tablet) */}
        {PROGRAM_PILLARS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`pointer-events-none absolute hidden w-[270px]  border-2 border-black bg-white p-4 shadow-[5px_5px_0_0_#111111] lg:block ${item.position}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center  border-2 border-black ${item.badgeBg}`}
                >
                  <Icon size={20} className="text-black" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {item.badgeText}
                  </span>
                  <h3 className="heading text-base font-bold text-black leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="my-2.5 h-0.5 w-full bg-black/10" />
              <p className="text-xs leading-5 text-slate-700 font-medium">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile-Friendly Grid for Program Cards (Shown on mobile under the video) */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {PROGRAM_PILLARS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className=" border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#111111]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center  border-2 border-black ${item.badgeBg}`}
                >
                  <Icon size={18} className="text-black" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500">
                    {item.badgeText}
                  </span>
                  <h3 className="heading text-base font-bold text-black">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600 font-medium">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
