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
    <section className="w-full py-16 px-inset">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Trusted by leading organizations
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            <span className="text-muted-foreground">Our partners trust </span>
            <span className="text-primary font-bold">Lolona</span>
            <span className="text-muted-foreground"> for empowering their communities</span>
          </h2>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={cn(
                "group flex flex-col items-center justify-center",
                "p-4 rounded-2xl transition-all duration-300",
                "hover:bg-primary/5 hover:shadow-lg",
                "cursor-pointer"
              )}
            >
              {/* Logo */}
              <div className={cn(
                "w-24 h-24 mb-4 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br from-primary/5 to-accent/5",
                "group-hover:from-primary/10 group-hover:to-accent/10",
                "transition-all duration-300 overflow-hidden"
              )}>
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={72}
                  height={72}
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Company Name */}
              <span className={cn(
                "text-xs font-medium text-muted-foreground",
                "group-hover:text-foreground transition-colors duration-300",
                "text-center"
              )}>
                {company.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm text-muted-foreground"
          >
            Join our growing network of partners making a positive impact
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
