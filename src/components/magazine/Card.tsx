import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  category?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  linkText?: string;
  variant?: "default" | "elevated" | "horizontal";
}

export default function Card({
  title,
  description,
  category,
  image,
  imageAlt = "",
  link,
  linkText = "Lees meer",
  variant = "default",
}: CardProps) {
  const variantClass =
    variant === "elevated"
      ? "card--elevated"
      : variant === "horizontal"
      ? "card--horizontal"
      : "";

  return (
    <article className={`card ${variantClass}`}>
      {image && (
        <div className="card__image-wrapper">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="card__image"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="card__content">
        {category && <div className="card__category">{category}</div>}
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        {link && (
          <Link href={link} className="card__link">
            {linkText}
          </Link>
        )}
      </div>
    </article>
  );
}
