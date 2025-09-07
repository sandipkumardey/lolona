"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const companies = [
  { name: "Rangeen Khidki", logo: "/rkflogo_black.png" },
  { name: "Global Shapers Kolkata", logo: "/gsk.png" },
  { name: "Orange Window", logo: "/orangew.png" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const CompaniesTrust = () => {
  return (
    <section className="w-full py-20 px-inset bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background depth elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-orange-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm font-medium text-slate-300/90 mb-4 uppercase tracking-widest relative z-10"
          >
            Trusted by leading organizations
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-galada leading-tight relative z-10"
          >
            <span className="text-slate-200/90">Our partners trust </span>
            <span className="text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Lolona
            </span>
            <br className="hidden md:block" />
            <span className="text-slate-200/90"> for empowering their communities</span>
          </motion.h2>
        </motion.div>

        {/* Companies Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center items-center gap-16 md:gap-20 lg:gap-24"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={cn(
                "group flex flex-col items-center justify-center relative z-10",
                "transition-all duration-500",
                "cursor-pointer"
              )}
            >
              {/* Logo Container */}
              <div className={cn(
                "w-36 h-28 mb-4 rounded-3xl flex items-center justify-center relative overflow-hidden",
                "bg-gradient-to-br from-white/95 via-slate-50/90 to-white/95",
                "backdrop-blur-sm border border-white/20 shadow-2xl shadow-slate-900/40",
                "group-hover:border-red-200/50 group-hover:shadow-2xl group-hover:shadow-red-500/30",
                "group-hover:scale-105 transition-all duration-500",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-500/5 before:to-orange-500/5 before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500"
              )}>
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={140}
                  height={105}
                  className="object-contain transition-all duration-500 group-hover:scale-110 relative z-10"
                  priority
                />
              </div>
              
              {/* Company Name */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
                className={cn(
                  "text-xs font-medium text-slate-400/80",
                  "group-hover:text-slate-200/90 transition-colors duration-300",
                  "text-center uppercase tracking-wider"
                )}
              >
                {company.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="mt-16 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>
  );
};
