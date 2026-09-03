import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle, FirstAid, Globe, MapPin, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, JsonLd, PageShell } from "@/components/PageShell";
import { Button, Container, Eyebrow } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";
import { faqSchema, serviceSchema } from "@/lib/seo/schema";

const path="/website-development-for-healthcare-business";
const description="DigiUdyam builds websites for doctors, clinics and hospitals across India. Appointment booking, local SEO and mobile friendly design included.";

export const metadata=createMetadata({
  title:"Healthcare Website Development Company India",
  description,
  path,
  keywords:["Healthcare Website Development Company India","Healthcare website development services India","Healthcare website design company India","Medical website development company","Clinic website development company India","Doctor website design services","Hospital website development services","Custom healthcare website development","Healthcare website developers India"]
});

const challenges=[
  ["No real online presence","A Facebook page or an outdated website built years ago does not tell a patient anything useful. There is no clear list of services, no doctor information, and often no way to contact the clinic beyond a phone number."],
  ["Patient enquiries go nowhere","Someone finds the clinic on Google, visits the website, and leaves without doing anything, because there is no enquiry form, no WhatsApp link, and no clear next step."],
  ["No appointment system","Patients today expect to check availability and book a slot without calling during business hours. A website without booking functionality pushes patients toward competitors who offer this."],
  ["Poor mobile experience","Most patients search for healthcare providers on their phones. If the website is slow, difficult to read, or was never designed for mobile screens, patients leave within seconds."],
  ["Low visibility on Google","Many healthcare websites are simply not built with search visibility in mind. They do not rank for the clinic name, the location, or the services offered, which means patients searching nearby never find them."],
  ["Unclear services and specialisations","A generic homepage that does not explain what conditions are treated, which procedures are offered, or what makes the practice different leaves patients unsure and hesitant to book."]
];

const reasons=[
  ["Patient trust starts online","Before a patient calls a clinic or walks in, they usually check the website first. A clear, professional site signals that the practice is established and takes its patients seriously. A missing or outdated website raises doubt, even if the actual care provided is excellent."],
  ["Online discovery is now the default","Patients search for symptoms, treatments, specialists and clinics near them before deciding where to go. If a healthcare business is not visible in these searches, it is invisible to a large share of potential patients, regardless of how good the practice actually is."],
  ["Appointment enquiries need a clear path","A website should make it obvious how to book, call, or send a query. Every extra step or unclear instruction is a chance for a patient to give up and look elsewhere."],
  ["Brand credibility across specialisations","Whether it is a single doctor practice or a multi specialty hospital, a well structured website communicates credibility consistently, which matters more in healthcare than almost any other industry."],
  ["Better communication with existing patients","A website is also useful for people who already know about the practice. Clear service pages, doctor profiles and contact details reduce repetitive phone calls and help patients get information faster."]
];

const services=[
  ["Clinic Website Development","We build websites for single and multi doctor clinics that clearly present services, specialisations, doctor details and contact options. The structure is built around how patients search for a clinic in a specific locality, so the site supports both patient experience and local search visibility."],
  ["Doctor Profile Websites","For individual practitioners, we build a website centred around the doctor, including qualifications, areas of expertise, patient testimonials, consultation details and a straightforward way to book or enquire. This works well for specialists building an independent reputation online."],
  ["Hospital Websites","Hospital websites need to handle more complexity, including multiple departments, several doctors, various services and often multiple locations. We structure this information so patients can find the right department or specialist without confusion, while keeping the overall site fast and easy to navigate."],
  ["Appointment Booking Systems","We integrate appointment booking directly into the website, so patients can check availability and request a slot without needing to call during working hours. This reduces missed enquiries and gives the practice a steady, trackable flow of new patient requests."],
  ["Healthcare Service Pages","Every treatment, procedure or department gets its own dedicated page, written clearly and structured for both patients and search engines. This also supports ranking for specific treatment related searches, not just the clinic name."],
  ["Patient Enquiry Forms","Simple, well placed enquiry forms make it easy for a hesitant visitor to ask a question before committing to a call or visit. We design these forms to be short, mobile friendly and easy to respond to on your end."],
  ["SEO Friendly Website Structure","Every website is built with a clean structure from the start, including proper heading hierarchy, fast loading pages and clear URLs, so the site has a real foundation for search visibility rather than needing to be fixed later."],
  ["Mobile Optimised Design","Since most patients browse on their phones, every page is designed and tested for mobile first, ensuring forms, phone numbers and booking options work smoothly on smaller screens."]
];

const features=["Appointment booking integrated into the website","Doctor profiles with qualifications and specialisations","Individual service and treatment pages","Patient enquiry and contact forms","WhatsApp enquiry button for quick communication","Google Maps integration for location and directions","Patient testimonials and reviews section","Blog section for health related content and local SEO support","Fast loading pages across devices","Mobile friendly design throughout"];

const process=[
  ["Discovery","We start by understanding your practice, the services you offer, your patients, and what has not worked with your online presence so far."],
  ["Planning","We map out the website structure, decide which pages are needed, and plan how patients will move from landing on the site to booking or enquiring."],
  ["Design","We design the website around clarity and trust, keeping healthcare specific needs in mind, such as readability for older patients and straightforward navigation."],
  ["Development","The website is built with clean code, proper structure and attention to loading speed, since slow websites lose patients quickly."],
  ["SEO Setup","Before launch, we configure on page SEO basics, including titles, meta descriptions, headings and local SEO elements relevant to your location and specialisation."],
  ["Testing","We test the website across devices and browsers, checking that forms, booking systems and contact options all work correctly before anything goes live."],
  ["Launch","Once everything is verified, the website goes live, along with basic tracking so you can see how patients are interacting with it."],
  ["Support","We remain available after launch for updates, fixes and guidance, since a healthcare website needs occasional changes as your practice grows or services change."]
];

const seoItems=[
  ["Local SEO","Since most patients search for healthcare providers near their location, we optimise the website for local relevance, including location specific pages where needed."],
  ["Google Business Profile","We help set up and align your Google Business Profile with your website, since this is often the first thing patients see when searching for a clinic nearby."],
  ["Healthcare content structure","Content needs to be organised by service, condition and specialisation, so search engines and patients can both understand what the practice offers."],
  ["Service pages","Dedicated pages for each major service or treatment give the website more opportunities to appear in relevant searches, instead of relying on one homepage to rank for everything."],
  ["Location relevance","For practices with multiple branches, we structure location pages correctly so each branch has its own visibility rather than competing with the others."],
  ["Technical SEO","This includes page speed, mobile usability, proper heading structure and clean code, all of which affect how search engines evaluate and rank the website."]
];

const why=[
  ["Business focused approach","We build websites with the goal of generating patient enquiries and bookings, not just to look good. Every decision on the site is made with that outcome in mind."],
  ["Healthcare understanding","We have worked with clinics, doctors and healthcare businesses before, so we understand the specific concerns around patient trust, information clarity and communication that come up in this industry."],
  ["SEO friendly development","Search visibility is built into the website from the start, not treated as an afterthought once the site is already live."],
  ["Transparent process","You know what is being built, when, and why, at every stage of the project. There are no vague timelines or unclear deliverables."],
  ["Long term support","A website needs updates over time, whether that is adding a new doctor, a new service, or fixing something that has changed. We remain available for this after the site is live."]
];

const audience=["Doctors setting up an independent online presence","Clinics looking to attract more local patients","Hospitals needing a structured, multi department website","Diagnostic centres wanting clearer service and test information online","Healthcare consultants building a professional reputation","Wellness businesses such as physiotherapy, dental and skin care practices"];

const faqs=[
  {question:"How much does a healthcare website cost in India?",answer:"Cost depends on the size and complexity of the website. A single doctor website costs less than a multi department hospital website with appointment booking and several service pages. We provide a clear quote after understanding your specific requirements."},
  {question:"How long does it take to build a healthcare website?",answer:"Most clinic and doctor websites take a few weeks from discovery to launch. Larger hospital websites with more pages and features take longer, depending on the amount of content and functionality involved."},
  {question:"Do doctors need a website?",answer:"Yes. Patients increasingly search online before choosing a doctor or clinic. A website gives an independent doctor a way to be found, build credibility and receive enquiries without relying only on referrals."},
  {question:"Can you add appointment booking to my website?",answer:"Yes. We integrate appointment booking systems that let patients check availability and request a slot directly through the website, reducing the need for phone calls during working hours."},
  {question:"Is the website optimised for Google?",answer:"Yes. Every website we build includes on page SEO fundamentals such as proper headings, meta descriptions and clean structure, along with local SEO setup relevant to your location and services."},
  {question:"Do you provide website maintenance after launch?",answer:"Yes. We offer ongoing support for updates, changes and fixes after the website goes live, since healthcare practices often need to update services, doctors or content over time."},
  {question:"Can the website work for multiple clinic locations?",answer:"Yes. For practices with more than one branch, we build location specific pages so each branch can be found separately in local search results."},
  {question:"Will patients be able to use the website easily on their phones?",answer:"Yes. Every website is designed and tested for mobile use first, since most patients browse and search for healthcare providers on their phones rather than a desktop computer."}
];

function SectionHead({eyebrow,title,copy,light=false}:{eyebrow:string;title:string;copy?:string;light?:boolean}){return <header className={`hcw-heading${light?" light":""}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{title}</h2>{copy&&<p>{copy}</p>}</header>}

export default function HealthcareWebsitePage(){
  const service={...serviceSchema({name:"Healthcare Website Development",description,path}),serviceType:"Healthcare Website Development",audience:{"@type":"Audience",audienceType:"Doctors, Clinics, Hospitals, Diagnostic Centres, Healthcare Businesses"}};
  return <PageShell><JsonLd data={[service,faqSchema(faqs)]}/><div className="hcw-page">
    <section className="hcw-hero"><Container><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Website Development",href:"/services/website-development"},{label:"Healthcare Website Development"}]}/><div className="hcw-title"><Eyebrow>HEALTHCARE WEBSITE DEVELOPMENT / INDIA</Eyebrow><h1>Healthcare Website Development Company India</h1></div><div className="hcw-hero-grid"><div><h2>A website that helps patients find you, trust you and book with you</h2><p>Most doctors, clinics and hospitals in India still run their practice the way it was run ten years ago. Patients ask friends for a recommendation, call the clinic directly, or walk in without knowing what services are available or who the doctors are. Meanwhile, the same patients are searching Google every day for a clinic near them, checking reviews, and comparing options before they decide who to trust with their health.</p><p>DigiUdyam builds websites for healthcare businesses that close this gap. We work with doctors, clinics, hospitals, diagnostic centres and wellness practices across India to create websites that explain your services clearly, show up on Google when patients search, and make it simple for someone to book an appointment or send an enquiry. This is not a template store front. It is a website built around how patients actually search for and choose healthcare providers.</p><Button href="/contact">Talk to us about your healthcare website</Button></div><figure><Image src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1500&q=85" alt="Doctor consulting with patient in clinic reception area" fill priority sizes="(max-width: 900px) 100vw, 48vw"/><figcaption><FirstAid weight="duotone"/>Clear healthcare information. Simple patient actions.</figcaption></figure></div></Container></section>

    <section className="hcw-section hcw-challenges"><Container><SectionHead eyebrow="Healthcare website challenges" title="Where patient journeys lose clarity" copy="Most healthcare businesses come to us with a version of the same problem. Here is what we see repeatedly across clinics, hospitals and individual practices in India."/><div className="hcw-card-grid hcw-three">{challenges.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></section>

    <section className="hcw-section hcw-reasons"><Container><SectionHead eyebrow="Why a professional website matters" title="Patient confidence begins before the first conversation"/><div className="hcw-reason-grid">{reasons.map(([title,copy],i)=><article key={title}><b>0{i+1}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></Container></section>

    <section className="hcw-section hcw-services"><Container><SectionHead light eyebrow="Healthcare website development services" title="A complete website system built around patient needs"/><div className="hcw-card-grid">{services.map(([title,copy],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><Globe weight="duotone"/><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></section>

    <section className="hcw-section hcw-features"><Container><SectionHead eyebrow="Features of healthcare websites" title="Practical functionality patients and teams can use"/><div className="hcw-feature-grid">{features.map((item,i)=><div key={item}><CheckCircle weight="fill"/><span>{String(i+1).padStart(2,"0")}</span><p>{item}</p></div>)}</div></Container></section>

    <section className="hcw-section hcw-process"><Container><SectionHead eyebrow="Website development process" title="Eight clear stages from discovery to support"/><div className="hcw-process-grid">{process.map(([title,copy],i)=><article key={title}><span>STEP {String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></section>

    <section className="hcw-section hcw-seo"><Container><div className="hcw-seo-intro"><Eyebrow light>SEO for healthcare websites</Eyebrow><h2>Visibility needs a connected foundation</h2><p>A website alone does not guarantee visibility. Search visibility for healthcare businesses depends on a few specific things done correctly.</p><div><MapPin weight="duotone"/><b>Local discovery</b><span>Website, profile, services and locations working together.</span></div></div><div className="hcw-seo-grid">{seoItems.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></section>

    <section className="hcw-section hcw-why"><Container><SectionHead eyebrow="Why choose DigiUdyam" title="Website decisions connected to a clear business outcome"/><div className="hcw-card-grid hcw-why-grid">{why.map(([title,copy],i)=><article key={title}><ShieldCheck weight="duotone"/><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></section>

    <section className="hcw-section hcw-audience"><Container><SectionHead light eyebrow="Who this service is for" title="Designed for healthcare practices at different stages"/><div>{audience.map(item=><p key={item}><CheckCircle weight="fill"/>{item}</p>)}</div></Container></section>

    <section className="hcw-section hcw-faq"><Container><SectionHead eyebrow="Frequently asked questions" title="Clear answers before you start"/><div>{faqs.map((faq,i)=><details key={faq.question}><summary><span>{String(i+1).padStart(2,"0")}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></Container></section>

    <nav className="hcw-links" aria-label="Related services"><Container><span>Build the connected system</span><Link href="/services/website-development">Website development services <ArrowRight/></Link><Link href="/services/seo">SEO services <ArrowRight/></Link><Link href="/services/local-seo">Local SEO for healthcare businesses <ArrowRight/></Link><Link href="/services/google-business-profile">Google Business Profile setup <ArrowRight/></Link><Link href="/industries/clinics">Digital growth for clinics <ArrowRight/></Link></Container></nav>

    <section className="hcw-final"><Container><CalendarCheck weight="duotone"/><Eyebrow light>READY TO START?</Eyebrow><h2>Ready to build a professional online presence for your healthcare business?</h2><p>Contact DigiUdyam today.</p><Button variant="light" href="/contact">Talk to our team</Button></Container></section>
  </div></PageShell>;
}
