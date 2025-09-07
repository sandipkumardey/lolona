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
    <section className="w-full py-20 px-inset bg-gradient-to-b from-background/50 to-background">
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
            className="text-sm font-medium text-muted-foreground/80 mb-4 uppercase tracking-widest"
          >
            Trusted by leading organizations
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-galada text-foreground leading-tight"
          >
            <span className="text-muted-foreground/90">Our partners trust </span>
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Lolona
            </span>
            <br className="hidden md:block" />
            <span className="text-muted-foreground/90"> for empowering their communities</span>
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
                "group flex flex-col items-center justify-center",
                "transition-all duration-500",
                "cursor-pointer"
              )}
            >
              {/* Logo Container */}
              <div className={cn(
                "w-32 h-24 mb-4 rounded-2xl flex items-center justify-center",
                "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
                "backdrop-blur-sm border border-primary/10",
                "group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10",
                "transition-all duration-500"
              )}>
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={120}
                  height={90}
                  className="object-contain transition-all duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              
              {/* Company Name */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
                className={cn(
                  "text-xs font-medium text-muted-foreground/70",
                  "group-hover:text-foreground/90 transition-colors duration-300",
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
