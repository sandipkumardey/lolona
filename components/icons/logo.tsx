import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 p-4 z-50">
      <Image
        src="public/lolona-white.png" 
        alt="Lolona Logo"
        width={100} 
        height={50} 
        priority
      />
    </div>
  );
};