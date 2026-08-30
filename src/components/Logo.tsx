import Link from "next/link";
import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="DigiUdyam home">
    <Image className="brand-logo" src="/digiudyam-logo.png" alt="DigiUdyam" width={2172} height={724} priority />
  </Link>;
}
