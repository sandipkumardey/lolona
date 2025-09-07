import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import XLogoIcon from "./icons/x";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-background/80 backdrop-blur-sm border-t border-border/20 p-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
        {/* Brand Section */}
        <aside className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-galada text-primary">L</span>
          </div>
          <div>
            <p className="font-galada text-lg text-foreground mb-1">
              Lolona
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering women and transforming communities across India since our founding.
            </p>
          </div>
        </aside>

        {/* Social Links */}
        <nav>
          <h6 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
            Connect
          </h6>
          <div className="flex gap-4">
            <Link 
              target="_blank" 
              className={buttonVariants({ size: "icon", variant: "ghost" })} 
              href={socialLinks.instagram}
            >
              <InstagramLogoIcon className="size-5" />
            </Link>
            <Link 
              target="_blank" 
              className={buttonVariants({ size: "icon", variant: "ghost" })} 
              href={socialLinks.x}
            >
              <XLogoIcon className="size-5" />
            </Link>
            <Link 
              target="_blank" 
              className={buttonVariants({ size: "icon", variant: "ghost" })} 
              href={socialLinks.github}
            >
              <GitHubLogoIcon className="size-5" />
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border/10">
        <p className="text-xs text-muted-foreground/70 text-center">
          © 2025 Lolona. All rights reserved. Built with purpose for positive impact.
        </p>
      </div>
    </footer>
  );
};
