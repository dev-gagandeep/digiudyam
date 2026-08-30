import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div>; }
export function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) { return <section id={id} className={`section ${className}`}>{children}</section>; }
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</div>; }
export function Heading({ eyebrow, title, copy, light = false, center = false }: { eyebrow?: string; title: React.ReactNode; copy?: string; light?: boolean; center?: boolean }) { return <div className={`section-heading ${center ? "center" : ""} ${light ? "light" : ""}`}>{eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}<h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }
export function Button({ children, href = "#audit", variant = "primary" }: { children: React.ReactNode; href?: string; variant?: "primary" | "secondary" | "light" }) { return <Link href={href} className={`button button-${variant}`}>{children}<ArrowRight size={18} weight="bold" /></Link>; }
