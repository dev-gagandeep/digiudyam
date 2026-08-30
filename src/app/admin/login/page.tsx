import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Admin Login | DigiUdyam", robots: { index: false, follow: false } };

export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  return <main className="admin-login">
    <section><Link href="/"><Image src="/digiudyam-logo.png" alt="DigiUdyam" width={2172} height={724}/></Link><div><span>INTERNAL OPERATIONS</span><h1>Agency operations.<br/><em>One controlled view.</em></h1><p>Clients, delivery, integrations and account health for authorized DigiUdyam staff.</p></div><footer>STAFF ACCESS ONLY / ACTIVITY AUDITED</footer></section>
    <section><Link href="/"><ArrowLeft/> Public website</Link><form action="/api/auth/login" method="post"><input type="hidden" name="destination" value="admin"/><ShieldCheck/><span>AUTHORIZED STAFF ACCESS</span><h2>DigiUdyam Admin</h2><p>Use your staff identity to continue.</p>{searchParams.error && <div role="alert">Sign-in failed or this account has no staff role.</div>}<label htmlFor="admin-email">Work email</label><input id="admin-email" name="email" type="email" required autoComplete="email"/><label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" required autoComplete="current-password"/><button type="submit">Sign in to Admin <b>→</b></button><small>Uses Supabase Auth and verifies an active staff profile server-side.</small></form></section>
  </main>;
}
