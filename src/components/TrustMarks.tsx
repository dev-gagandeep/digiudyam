import Image from "next/image";

type TrustMarksProps = { variant?: "hero" | "footer" };

export function TrustMarks({ variant = "hero" }: TrustMarksProps) {
  return (
    <div className={`trust-marks trust-marks-${variant}`} aria-label="Business trust information">
      <div className="trust-mark-logo">
        <Image src="/msme-logo.png" alt="Ministry of Micro, Small and Medium Enterprises, Government of India" width={600} height={600} sizes="(max-width: 560px) 60px, 66px" />
      </div>
      <div className="trust-mark-copy">
        <small>MSME-FOCUSED DIGITAL PARTNER</small>
        <strong>Built for Indian small businesses</strong>
        <span>Practical digital solutions for the MSME community.</span>
      </div>
    </div>
  );
}
