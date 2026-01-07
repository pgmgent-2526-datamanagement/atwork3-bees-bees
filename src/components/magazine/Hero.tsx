import Image from "next/image";
import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  text?: string;
  image: string;
  imageAlt: string;
  showScroll?: boolean;
  children?: ReactNode;
}

export default function Hero({
  title,
  subtitle,
  text,
  image,
  imageAlt,
  showScroll = true,
  children,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__image-wrapper">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="hero__image"
          priority
          quality={90}
          sizes="50vw"
        />
      </div>
      <div className="hero__content">
        <h1 className="heading-primary">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {text && <p className="hero__text">{text}</p>}
        {children}
      </div>
    </section>
  );
}
