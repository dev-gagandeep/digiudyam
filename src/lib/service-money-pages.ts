export type RichTextPart = string | { text: string; href: string };
export type RichText = string | RichTextPart[];

export type MoneyPageGroup = {
  heading: string;
  paragraphs?: RichText[];
  items?: string[];
};

export type MoneyPageSection = {
  id?: string;
  presentation?: "cards" | "list" | "comparison" | "timeline" | "audit";
  heading: string;
  paragraphs?: RichText[];
  items?: string[];
  groups?: MoneyPageGroup[];
  table?: { headings: [string, string]; rows: [string, string][] };
  cta?: { label: string; href: string };
};

export type ServiceMoneyPage = {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    imageAlt: string;
  };
  hero: {
    heading: string;
    paragraphs: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    needsHeading: string;
    needs: string[];
  };
  sections: MoneyPageSection[];
  faqs: { q: string; a: string; items?: string[] }[];
  finalCta: {
    eyebrow?: string;
    heading: string;
    paragraphs: string[];
    subheading: string;
    fields: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    contactText: RichText;
  };
};

const websiteDevelopment: ServiceMoneyPage = {
  metadata: {
    title: "Website Development Company for India",
    description: "Affordable website development for Indian MSMEs. Get professional, mobile-friendly small business website design focused on trust and enquiries.",
    ogTitle: "Website Development for Indian Small Businesses",
    ogDescription: "Build a professional business website planned around your customers, services and enquiry goals with DigiUdyam.",
    imageAlt: "Business owner reviewing a responsive website developed for an Indian small business",
  },
  hero: {
    heading: "Website Development Services in India for Small Businesses",
    paragraphs: [
      "Your website should do more than show your business online. It should clearly explain what you offer, build customer confidence and make it easy for people to call, message or enquire.",
      "DigiUdyam provides website development services in India for MSMEs, entrepreneurs and small businesses. We plan each website around your business, customers and goals—whether you need your first professional website, want to replace an outdated one or require a website connected with your wider marketing and follow-up systems.",
    ],
    primaryCta: { label: "Discuss Your Website Project", href: "/contact" },
    secondaryCta: { label: "View Website Solutions", href: "#website-solutions" },
    needsHeading: "What do you need?",
    needs: [
      "Build my first business website",
      "Redesign my existing website",
      "Create an ecommerce website",
      "Build a custom website",
    ],
  },
  sections: [
    {
      heading: "Build a Website That Supports Your Business Goals",
      paragraphs: [
        "A good business website helps customers understand who you are, what you offer and how they can contact you.",
        "For a local shop, clinic, restaurant, consultant or service provider, that may mean helping visitors find essential information and send an enquiry. For a growing company, it may mean presenting multiple services, supporting marketing campaigns or connecting enquiries with a CRM.",
        "DigiUdyam approaches business website development by first understanding what the website needs to achieve.",
        "Your website can help you:",
      ],
      items: [
        "Create a professional online presence",
        "Present your services or products clearly",
        "Make important business information easier to find",
        "Build confidence among potential customers",
        "Receive calls, form submissions or WhatsApp enquiries",
        "Support Local SEO and digital marketing",
        "Track how visitors interact with your website",
        "Connect enquiries with CRM and automation workflows",
      ],
      groups: [{
        heading: "",
        paragraphs: ["A website alone cannot guarantee customers or search rankings. Its role is to give your business a clear, useful and credible digital foundation that can support your wider growth activities."],
      }],
    },
    {
      id: "website-solutions",
      heading: "Website Development Solutions for Indian Businesses",
      paragraphs: ["Different businesses need different website structures. DigiUdyam helps you choose a practical solution based on your audience, business model and main goal."],
      groups: [
        {
          heading: "Small Business Websites",
          paragraphs: [
            "A small business website gives customers one reliable place to learn about your business.",
            "It can include your company information, services, location, operating hours and contact options. This type of website may suit:",
          ],
          items: ["Clinics", "Restaurants", "Retail shops", "Salons", "Consultants", "Coaches", "Real estate businesses", "Local service providers", "Small companies"],
        },
        {
          heading: "",
          paragraphs: ["The structure should remain simple while giving visitors enough information to decide whether your business can help them."],
        },
        {
          heading: "Custom Business Websites",
          paragraphs: [
            "A custom business website is suitable when a standard layout cannot support your required content, user journey or functionality.",
            "The scope may include tailored page structures, custom forms, business-specific functionality or connections with external tools. Requirements are reviewed before the project begins so that the proposed solution reflects the actual needs of the business.",
          ],
        },
        {
          heading: "Ecommerce Websites",
          paragraphs: [
            "An ecommerce website allows customers to explore and purchase products online.",
            "Depending on the project, planning may cover:",
          ],
          items: ["Product categories", "Product information", "Search and filtering", "Shopping cart", "Online payments", "Order communication", "Delivery information", "Customer policies"],
        },
        {
          heading: "",
          paragraphs: ["Ecommerce requirements can vary significantly. Product volume, payment methods, shipping rules and operational workflows should be confirmed before the platform and project scope are selected."],
        },
        {
          heading: "Landing Pages",
          paragraphs: [
            "A landing page is designed around one campaign, offer or action.",
            "It may be used to support:",
          ],
          items: ["Google Ads", "Meta advertising", "Service enquiries", "Event registrations", "Consultation bookings", "Product launches", "Lead-generation campaigns"],
        },
        {
          heading: "",
          paragraphs: ["A focused landing page removes unnecessary distractions and guides the visitor towards a specific next step."],
        },
        {
          heading: "Website Redesign",
          paragraphs: [
            "An existing website may need a redesign when it no longer represents the business properly or makes information difficult to access.",
            "A redesign can address issues such as:",
          ],
          items: ["Outdated presentation", "Confusing navigation", "Poor mobile usability", "Unclear services", "Weak enquiry paths", "Slow or difficult pages", "Inconsistent branding", "Content that no longer reflects the business"],
        },
        {
          heading: "",
          paragraphs: ["Before recommending a complete rebuild, the current website and business requirements should be reviewed. Some websites may need structural improvements, while others may require a new foundation."],
        },
        {
          heading: "CRM and Automation-Connected Websites",
          paragraphs: [
            "A website can become part of a wider enquiry and follow-up system.",
            "Depending on the business requirement, website forms may be connected with a CRM or automation workflow. This can help organise enquiries, assign follow-ups and reduce the need to transfer information manually.",
            "The appropriate setup depends on the tools already used by the business and the type of customer journey being created.",
            ["Explore ", { text: "CRM solutions", href: "/services/crm-solutions" }, " or learn about ", { text: "business automation", href: "/services/automation" }, "."],
          ],
        },
      ],
    },
    {
      heading: "What Your Business Website Can Include",
      paragraphs: ["The final features depend on the agreed project scope. A business website can include:"],
      items: ["Mobile-responsive design", "Home, About, Services and Contact pages", "Product or service information", "Enquiry and contact forms", "WhatsApp and call buttons", "Google Maps", "Appointment or booking functionality", "Content management options", "Analytics and enquiry tracking", "Basic on-page SEO setup", "Social profile links", "CRM and automation connections", "Security and performance configuration", "Domain, hosting and launch support", "Relevant policy pages"],
      groups: [{ heading: "", paragraphs: ["Not every business requires every feature. The right approach is to select the pages and functionality that support your customers and operating needs without adding unnecessary complexity."] }],
    },
    {
      heading: "Website Development for Different Business Goals",
      paragraphs: ["The right website starts with a clear business goal."],
      table: {
        headings: ["Your business goal", "Recommended direction"],
        rows: [
          ["Establish an online presence", "A professional business website presenting your company, services and contact information"],
          ["Generate customer enquiries", "An enquiry-focused website with clear calls, forms and WhatsApp actions"],
          ["Attract local customers", "A business website supported by Local SEO and Google Business Profile optimization"],
          ["Sell products online", "An ecommerce website planned around products, payments and order requirements"],
          ["Run advertising campaigns", "A website with focused landing pages and appropriate tracking"],
          ["Improve lead follow-up", "A website connected with CRM or automation tools"],
        ],
      },
      groups: [{
        heading: "",
        paragraphs: [
          ["If your main goal is local discovery, combine your website with ", { text: "Local SEO services", href: "/services/local-seo" }, " and ", { text: "Google Business Profile optimization", href: "/services/google-business-profile" }, "."],
          ["If you plan to run campaigns, explore DigiUdyam’s ", { text: "digital marketing services", href: "/services/digital-marketing" }, "."],
        ],
      }],
      cta: { label: "Discuss the Right Website for Your Business", href: "/contact" },
    },
    {
      heading: "Our Website Development Process",
      paragraphs: ["A clear process keeps the project connected to its original business goal."],
      groups: [
        { heading: "1. Understand Your Business", paragraphs: ["We begin with your business, customers, services and main website goal.", "This stage helps clarify:"], items: ["Who the website is for", "What visitors need to understand", "Which action visitors should take", "What information and functionality are required", "Whether the project is a new website or redesign"] },
        { heading: "2. Plan the Website", paragraphs: ["We organise the required pages, content, navigation and enquiry journey.", "Planning before design helps prevent important information from being added as an afterthought. It also creates a shared understanding of the proposed scope."] },
        { heading: "3. Design the Experience", paragraphs: ["The website is designed to make the business easy to understand across mobile and desktop screens.", "The design direction considers:"], items: ["Brand presentation", "Readability", "Page hierarchy", "Navigation", "Service visibility", "Contact actions", "Mobile usability"] },
        { heading: "4. Develop and Integrate", paragraphs: ["After the direction is agreed, the approved pages and functionality are developed.", "Any agreed forms, analytics tools, enquiry channels or external connections are added according to the project scope."] },
        { heading: "5. Review and Test", paragraphs: ["Before launch, the website is reviewed for essential usability and functionality.", "The review may include:"], items: ["Page and content checks", "Mobile responsiveness", "Navigation", "Forms and contact actions", "Browser behaviour", "Basic performance", "Essential search setup"] },
        { heading: "6. Launch and Support", paragraphs: ["Once the agreed review is complete, the website is prepared for launch.", "Domain, hosting, access and ongoing support requirements should be clearly documented as part of the project scope. This helps the business understand what is included at launch and what may require separate ongoing support."] },
      ],
    },
    {
      heading: "What Makes a Business Website Effective?",
      paragraphs: ["An attractive design is useful, but appearance alone does not make a website effective."],
      groups: [
        { heading: "Clear Positioning", paragraphs: ["Visitors should quickly understand what the business does, who it helps and why the service is relevant to them."] },
        { heading: "Simple Navigation", paragraphs: ["Important information should not be difficult to find. A clear structure helps visitors move between services, business information and contact options."] },
        { heading: "Mobile Usability", paragraphs: ["Many customers will view the website on a mobile phone. Text, menus, forms and buttons should remain readable and easy to use on smaller screens."] },
        { heading: "Useful Service Information", paragraphs: ["A page should answer the questions a potential customer needs before making contact. Generic descriptions rarely help visitors make confident decisions."] },
        { heading: "Clear Contact Options", paragraphs: ["The desired next step—such as calling, messaging, booking or submitting a form—should be visible and easy to complete."] },
        { heading: "Trust and Transparency", paragraphs: ["Accurate company information, clear policies, genuine work examples and transparent communication help visitors assess the business."] },
        { heading: "Search-Friendly Structure", paragraphs: ["Descriptive headings, useful content, internal links and technically accessible pages help search engines understand the website. These elements create a foundation for SEO, but they do not guarantee rankings."] },
        { heading: "Measurement", paragraphs: ["Analytics and enquiry tracking can help a business understand how people reach the website and which actions they take. The tracking setup should reflect the business’s actual goals and privacy requirements."] },
        { heading: "Maintainable Technology", paragraphs: ["A website should be manageable after launch. Platform selection, access, updates, security and maintenance responsibilities should be discussed before development."] },
      ],
    },
    {
      heading: "How Much Does Website Development Cost in India?",
      paragraphs: ["The cost of business website development in India depends on the scope of the project.", "Important cost factors include:"],
      items: ["Number and type of pages", "Template-based or custom design requirements", "Content and image preparation", "Ecommerce functionality", "Appointment or booking features", "Payment integration", "CRM or automation connections", "Third-party tools and licenses", "Domain and hosting requirements", "Maintenance and ongoing support", "Delivery requirements"],
      groups: [{ heading: "", paragraphs: ["A simple information website and a custom ecommerce platform solve different problems, so they should not be priced as the same service.", "Affordable website design should mean receiving the right scope, transparent costs and a website your business can actually use. The lowest initial quotation may not include content assistance, mobile optimization, tracking, integrations, maintenance or launch support.", "DigiUdyam first reviews the business requirement before recommending a website structure. The final quotation should clearly identify what is included, what is excluded and which third-party costs may apply."] }],
      cta: { label: "Request a Website Project Discussion", href: "/contact" },
    },
    {
      heading: "Why Small Businesses Choose DigiUdyam",
      groups: [
        { heading: "We Start With the Business Goal", paragraphs: ["The conversation begins with what your business needs the website to achieve—not with a list of technical features."] },
        { heading: "We Keep Communication Simple", paragraphs: ["Website terminology can become confusing. DigiUdyam explains the available options in practical business language so that you can make an informed decision."] },
        { heading: "We Plan Beyond the Website", paragraphs: ["A website may need to work with Local SEO, Google Business Profile, digital marketing, CRM or automation. DigiUdyam considers how these services can work together when they are relevant to your goal."] },
        { heading: "We Define the Scope Clearly", paragraphs: ["Pages, functionality, integrations and responsibilities should be agreed before development. Clear scope helps both sides understand what the project includes."] },
        { heading: "We Focus on Useful Customer Journeys", paragraphs: ["The website should help visitors understand the business and take the appropriate next step. Every project should have a clear purpose rather than unnecessary features.", [{ text: "Learn more about DigiUdyam", href: "/about" }, "."]] },
      ],
    },
    {
      heading: "Website Development for Businesses Across India",
      paragraphs: ["DigiUdyam provides business website development for Indian MSMEs, entrepreneurs and small businesses.", "A website project does not need to become complicated because the business and development team are in different cities. Requirements, content, design reviews and feedback can be organised through a clear digital workflow.", "Before starting, both sides should agree on:"],
      items: ["The main website objective", "Required pages and functionality", "Content responsibilities", "Communication and review process", "Domain and hosting access", "Project deliverables", "Launch requirements", "Ongoing maintenance expectations"],
      groups: [{ heading: "", paragraphs: ["This creates transparency and gives the business a practical foundation for evaluating the project.", [{ text: "Explore solutions for different industries", href: "/industries" }, "."]] }],
    },
  ],
  faqs: [
    { q: "How much does a small business website cost in India?", a: "The cost depends on the number of pages, design requirements, content, functionality, integrations and ongoing support. A quotation should be prepared after the project requirements are understood. It should clearly explain inclusions, exclusions and any separate third-party costs." },
    { q: "How long does it take to develop a business website?", a: "The timeline depends on the website scope, content readiness, required functionality and review process. A simple website and a custom ecommerce project will not have the same schedule. The expected timeline should be confirmed after requirements are reviewed." },
    { q: "What pages does a small business website need?", a: "Many small business websites need a Home page, About page, Services or Products section and Contact page. Other useful pages may include individual service pages, locations, FAQs, a blog and relevant business policies. The final structure should reflect what customers need to know." },
    { q: "Will my website work properly on mobile phones?", a: "Mobile usability should be part of the website’s agreed requirements. A responsive website adapts its layout for different screen sizes so visitors can read information, navigate pages and use contact actions more easily." },
    { q: "Do you provide domain and hosting assistance?", a: "Domain, hosting and launch requirements can be discussed during project planning. The final scope should clearly state what assistance is included, who owns each account and which recurring charges are paid separately." },
    { q: "Is SEO included with website development?", a: "Website development can include an essential SEO foundation such as clear page structure, descriptive metadata and accessible content. Ongoing SEO—such as keyword research, content development, Local SEO and authority building—is a separate, continuing activity and should be scoped accordingly." },
    { q: "Can customers contact us through WhatsApp?", a: "WhatsApp can be included as a contact option when it suits the business requirement. Visitors can be directed to start a conversation from relevant pages or calls to action." },
    { q: "Can I update the website after it is launched?", a: "This depends on the selected platform and project scope. If content management is required, it should be discussed before development so that access, editable sections, training and maintenance responsibilities can be defined." },
    { q: "Do you redesign existing business websites?", a: "DigiUdyam supports website development and can evaluate an existing website as part of a redesign requirement. The review should identify whether the current website needs targeted improvements or a new structure." },
    { q: "Can the website connect with a CRM or automation system?", a: "A website can be connected with CRM and automation tools when the selected systems support the required integration. The exact workflow, data collected and follow-up actions should be defined before implementation." },
    { q: "Who owns the domain, hosting and website files?", a: "Ownership and access should be documented before the project begins. The agreement should explain who controls the domain and hosting accounts, what website files or platform access are provided, and whether any third-party licenses or subscriptions remain active after launch." },
    { q: "What information do you need before starting?", a: "Useful starting information includes:", items: ["Business name and industry", "Products or services", "Target customers", "Primary website goal", "Existing website, if any", "Required pages and functionality", "Brand assets", "Available content and images", "Preferred customer contact method", "Examples of websites you find useful"] },
  ],
  finalCta: {
    heading: "Let’s Plan the Right Website for Your Business",
    paragraphs: ["You do not need to decide every technical detail before speaking with us.", "Tell DigiUdyam about your business, current online presence and the result you want from your website. We can then discuss the appropriate pages, functionality and next steps."],
    subheading: "Share Your Requirements",
    fields: ["Your name", "Business name", "Phone number", "Email address", "City", "Existing website, if available", "Business type", "Website requirement", "Main business goal", "Preferred contact method"],
    primaryCta: { label: "Discuss Your Website Project", href: "/contact" },
    secondaryCta: { label: "Get a Free Growth Audit", href: "/free-audit" },
    contactText: ["You can also ", { text: "contact DigiUdyam", href: "/contact" }, " to discuss your requirements."],
  },
};

const localSeo: ServiceMoneyPage = {
  metadata: {
    title: "Local SEO Services India for Small Businesses",
    description: "Local SEO services for Indian MSMEs and local businesses. Improve your Google Maps visibility, local search presence and customer discovery.",
    ogTitle: "Local SEO for Indian Small Businesses",
    ogDescription: "Build a clearer local search presence across Google Maps, your website, business listings and customer reviews.",
    imageAlt: "Local business owner reviewing Google Maps visibility and local search information",
  },
  hero: {
    heading: "Local SEO Services in India for Small Businesses",
    paragraphs: [
      "When customers search for a nearby clinic, restaurant, salon, shop or service provider, your business should be easy to find, understand and contact.",
      "DigiUdyam provides Local SEO services for Indian MSMEs and local businesses. We connect your Google Business Profile, website, business information, local pages and review activity into a clearer local search presence.",
    ],
    primaryCta: { label: "Get a Free Local Growth Audit", href: "/free-audit" },
    secondaryCta: { label: "Explore Local SEO Services", href: "#local-seo-services" },
    needsHeading: "What would you like to improve?",
    needs: [
      "Help nearby customers discover my business",
      "Improve my Google Maps presence",
      "Correct inconsistent business information",
      "Build visibility for one or more locations",
    ],
  },
  sections: [
    {
      heading: "Your Customers Are Searching Nearby",
      paragraphs: [
        "Local customers often search when they are ready to compare options, call a business, request directions or visit a location.",
        "A business can provide a valuable service and still be difficult to discover online when its profile is incomplete, its website does not explain the location clearly or its information differs across platforms.",
        "Common local visibility problems include:",
      ],
      items: [
        "An incomplete or unverified Google Business Profile",
        "Incorrect address, phone number or operating hours",
        "Unclear business categories and services",
        "A website with weak location information",
        "Different business details across directories",
        "Few useful photos or business updates",
        "Customer reviews left unanswered",
        "No clear measurement of calls, directions or enquiries",
      ],
      groups: [{
        heading: "",
        paragraphs: ["Local SEO brings these signals together so customers and search platforms receive a clearer, more consistent picture of your business."],
      }],
    },
    {
      id: "local-seo-services",
      presentation: "list",
      heading: "How Local SEO Helps Customers Discover Your Business",
      paragraphs: [
        "Local SEO improves the information and digital signals that help people discover and evaluate a business in a particular area.",
        "The work is not limited to adding city names to pages. A practical local search system connects accurate business information, a useful Google Business Profile, relevant website pages, genuine reviews and consistent listings.",
      ],
      groups: [
        { heading: "Google Maps Presence", paragraphs: ["Keep essential profile information accurate and make services, categories, hours and contact options easier for customers to understand."] },
        { heading: "Location-Relevant Website Pages", paragraphs: ["Create useful pages that explain what the business offers, where it operates and how customers can take the next step."] },
        { heading: "Business Information Consistency", paragraphs: ["Review important listings so the business name, address, phone number and website do not send conflicting signals."] },
        { heading: "Review and Reputation Activity", paragraphs: ["Build a policy-compliant process for requesting genuine feedback and responding professionally to customer reviews."] },
        { heading: "Local Authority", paragraphs: ["Identify relevant local directories, organisations and websites where an accurate business mention or link may be genuinely useful."] },
        { heading: "Local Performance Measurement", paragraphs: ["Track available customer actions and website enquiries so decisions are based on useful signals rather than rankings alone."] },
      ],
    },
    {
      heading: "What Our Local SEO Services Can Include",
      paragraphs: ["The appropriate deliverables depend on the business type, locations, existing website and current local presence. A Local SEO scope can include:"],
      items: [
        "Local visibility audit",
        "Google Business Profile review",
        "Business category and service review",
        "Business information cleanup",
        "Location and service-area research",
        "Local keyword and search-intent research",
        "Location page planning",
        "On-page Local SEO",
        "Directory and citation review",
        "Review request and response guidance",
        "Local internal linking",
        "Website and profile measurement setup",
        "Ongoing monitoring and practical reporting",
      ],
      groups: [{
        heading: "",
        paragraphs: ["Not every business needs every activity. DigiUdyam first reviews the existing local presence and then recommends work connected to a clear business goal."],
      }],
      cta: { label: "Request a Local SEO Audit", href: "/free-audit" },
    },
    {
      heading: "Who Local SEO Is For",
      paragraphs: ["Local SEO is relevant when customers choose a business partly because of its location, service area or ability to serve people nearby."],
      groups: [
        { heading: "Clinics and Healthcare Businesses", paragraphs: ["Help patients find accurate location, service, timing and contact information without making unsupported medical claims."] },
        { heading: "Restaurants and Cafés", paragraphs: ["Make menus, hours, location details, photos, reviews and direction options easier to discover."] },
        { heading: "Salons and Wellness Businesses", paragraphs: ["Connect local discovery with services, appointment information, customer feedback and contact actions."] },
        { heading: "Retail Shops", paragraphs: ["Help nearby shoppers understand what the business offers, when it is open and how to visit or contact the store."] },
        { heading: "Service-Area Businesses", paragraphs: ["Clarify genuine service areas for businesses that travel to customers, while following Google Business Profile guidelines."] },
        { heading: "Multi-Location Businesses", paragraphs: ["Create a manageable structure for distinct eligible locations with accurate information and useful location pages."] },
      ],
    },
    {
      presentation: "list",
      heading: "Local Visibility Factors We Work On",
      paragraphs: [
        "Google explains that local results are mainly influenced by relevance, distance and prominence. No business or agency can purchase a better local ranking from Google or control every factor.",
        "DigiUdyam focuses on the parts a business can improve responsibly:",
      ],
      groups: [
        { heading: "Relevance", paragraphs: ["Accurate categories, services, website content and business details can help search platforms understand how the business relates to a customer’s search."] },
        { heading: "Distance", paragraphs: ["Distance depends on the customer’s location and cannot be removed through optimisation. Accurate location or service-area information helps avoid misleading signals."] },
        { heading: "Prominence", paragraphs: ["Genuine reviews, relevant mentions, useful links and a recognised business presence can contribute to how established a business appears."] },
        { heading: "Information Accuracy", paragraphs: ["Consistent names, addresses, phone numbers, hours and website links make it easier for customers to trust the information they find."] },
        { heading: "Website Clarity", paragraphs: ["Service and location pages should answer real customer questions and connect visitors with the correct location or contact method."] },
        { heading: "Customer Experience", paragraphs: ["Useful photos, honest review responses and clear contact actions support the customer’s decision after the business is discovered."] },
      ],
    },
    {
      heading: "Google Business Profile and Local SEO Work Together",
      paragraphs: [
        "A Google Business Profile helps an eligible storefront or service-area business manage how important information appears across Google Search and Maps.",
        "Local SEO connects that profile with the wider business presence. Google may use information from the official website, business owners, users and other public sources, so consistency matters.",
        "Profile work may include:",
      ],
      items: [
        "Verification and ownership review",
        "Accurate business name and contact information",
        "Primary and additional category review",
        "Services, products or menu information where applicable",
        "Opening hours and special hours",
        "Genuine business photos and updates",
        "Review monitoring and responses",
        "Website and appointment links where supported",
      ],
      groups: [{
        heading: "",
        paragraphs: [["Businesses needing dedicated profile support can explore DigiUdyam’s ", { text: "Google Business Profile optimization service", href: "/services/google-business-profile" }, "."]],
      }],
    },
    {
      presentation: "comparison",
      heading: "Local SEO and Google Business Profile: What Is the Difference?",
      paragraphs: ["The two are connected, but they are not the same service."],
      groups: [
        { heading: "Google Business Profile", paragraphs: ["Google Business Profile is one platform used by eligible businesses to manage important information and customer-facing features across Google Search and Maps."], items: ["Business details", "Categories and services", "Hours and contact options", "Photos and updates", "Reviews and responses"] },
        { heading: "Local SEO", paragraphs: ["Local SEO is the broader system that connects the Google Business Profile with the business website, location pages, listings, reviews, local authority and performance measurement."], items: ["Google Business Profile", "Website and location signals", "Listings and citations", "Reviews and local trust", "Local authority and measurement"] },
      ],
    },
    {
      presentation: "timeline",
      heading: "Our Local SEO Process",
      paragraphs: ["A structured process helps separate urgent corrections from longer-term local visibility work."],
      groups: [
        { heading: "1. Understand the Business", paragraphs: ["We review the services, customers, real locations or service areas and the actions that matter to the business."] },
        { heading: "2. Audit the Local Presence", paragraphs: ["We examine the website, Google Business Profile, important listings, reviews and available performance information."] },
        { heading: "3. Correct the Foundation", paragraphs: ["We prioritise inaccurate or incomplete information, ownership issues and website problems that make the business harder to understand."] },
        { heading: "4. Build Local Relevance", paragraphs: ["We improve useful service and location information without producing thin pages or repeating city names unnaturally."] },
        { heading: "5. Strengthen Trust Signals", paragraphs: ["We support genuine review activity, accurate listings and relevant local mentions while following platform policies."] },
        { heading: "6. Measure and Improve", paragraphs: ["We review available visibility and enquiry signals, explain what changed and prioritise the next practical actions."] },
      ],
    },
    {
      presentation: "audit",
      heading: "What Happens During the Free Local SEO Audit?",
      paragraphs: ["The audit is designed to identify practical priorities before recommending ongoing work."],
      groups: [
        { heading: "Profile Review", paragraphs: ["We review the available Google Business Profile information, ownership context, categories, services and important customer-facing details."] },
        { heading: "Website and Location Check", paragraphs: ["We check whether the website clearly explains the services, genuine locations or service areas and the next action for nearby customers."] },
        { heading: "Business Information Consistency", paragraphs: ["We compare important business details and identify obvious inconsistencies that may confuse customers or search platforms."] },
        { heading: "Priority Recommendations", paragraphs: ["We organise the findings into practical next steps so the business can understand what should be corrected, improved or monitored first."] },
      ],
    },
    {
      heading: "How Local SEO Progress Is Measured",
      paragraphs: [
        "A single ranking screenshot does not explain whether local search is helping the business.",
        "Reporting should use available signals that connect visibility with customer behaviour. Depending on the setup, these may include:",
      ],
      items: [
        "Relevant local search visibility",
        "Google Business Profile views and interactions",
        "Calls and direction requests where available",
        "Website visits from local discovery",
        "Enquiry form or WhatsApp actions",
        "Review activity and response status",
        "Accuracy of important business listings",
        "Performance of service and location pages",
      ],
      groups: [{
        heading: "",
        paragraphs: ["Results depend on the starting position, competition, location, customer demand and the work completed. DigiUdyam does not guarantee a particular ranking, number of calls or lead volume."],
      }],
    },
    {
      presentation: "list",
      heading: "Why Local Businesses Choose DigiUdyam",
      groups: [
        { heading: "Business Outcomes Before Ranking Reports", paragraphs: ["We connect local visibility with the calls, visits, directions and enquiries the business actually wants."] },
        { heading: "Website and Maps Work Together", paragraphs: [["Local SEO is planned alongside the business website and Google Business Profile instead of treating each channel as an isolated task. Explore our ", { text: "website development services", href: "/services/website-development" }, "."]] },
        { heading: "Clear, Practical Communication", paragraphs: ["We explain priorities and limitations in straightforward business language without hiding behind technical reports."] },
        { heading: "Policy-Aware Recommendations", paragraphs: ["We avoid fake reviews, misleading locations, keyword-stuffed business names and other shortcuts that can create long-term problems."] },
        { heading: "A Connected Growth Partner", paragraphs: ["When relevant, Local SEO can support a wider system involving website improvements, digital marketing, CRM and customer follow-up."] },
      ],
    },
  ],
  faqs: [
    { q: "What is Local SEO?", a: "Local SEO is the work of improving the information and digital signals that help nearby customers discover and evaluate a business in local search results. It can involve Google Business Profile, website pages, business listings, reviews and local relevance." },
    { q: "How is Local SEO different from regular SEO?", a: "General SEO may target broader informational or commercial searches. Local SEO focuses on searches connected with a location, nearby intent, a storefront or a genuine service area. The two can work together when a business serves both local and wider audiences." },
    { q: "How long does Local SEO take?", a: "The timeline depends on the current profile and website, competition, location, business category and work required. Important information can be corrected early, while stronger local visibility usually requires ongoing improvement. A responsible provider should not promise a fixed ranking date." },
    { q: "Can you guarantee a top position on Google Maps?", a: "No. Google controls local results, and factors such as the customer’s distance from the business cannot be controlled by an agency. DigiUdyam focuses on accurate implementation, useful local signals and transparent measurement rather than guaranteed positions." },
    { q: "Do I need a Google Business Profile for Local SEO?", a: "An eligible storefront or service-area business can use a Google Business Profile to manage important information on Google Search and Maps. Local SEO also includes the website, listings, reviews and other signals, so the profile is important but not the entire strategy." },
    { q: "Do I need a website for Local SEO?", a: "A website gives the business more space to explain services, locations, trust information and contact options. Google may also use information from the official website when understanding a business. A profile can exist without a website, but the wider local presence may be more limited." },
    { q: "Can Local SEO help a service-area business?", a: "It can help eligible businesses that travel to customers, such as home-service providers. The address and service area must be represented accurately and should follow Google Business Profile guidelines. A virtual office should not be used to create a misleading local presence." },
    { q: "How does Local SEO work for multiple locations?", a: "Each genuine eligible location needs accurate information and a clear relationship with the business. Useful location pages and properly managed profiles can help customers reach the correct branch. Duplicate or invented locations should not be created." },
    { q: "Are customer reviews part of Local SEO?", a: "Genuine reviews can help customers evaluate a business and may contribute to local prominence. Businesses can request honest feedback and respond professionally, but should not purchase reviews or offer incentives in exchange for positive ratings." },
    { q: "What are local citations?", a: "A local citation is a mention of business information on another website or directory. Relevant, accurate listings can help customers confirm business details. The goal is not to submit the business to every directory, but to maintain useful and trustworthy information where it matters." },
    { q: "How much do Local SEO services cost in India?", a: "Cost depends on the number of locations, current website and profile condition, competition, required content, listing cleanup and ongoing support. DigiUdyam reviews the business requirement before defining the work and quotation." },
    { q: "What information is needed for a Local SEO audit?", a: "Useful inputs include:", items: ["Business name and category", "Website URL", "Google Business Profile link", "Address or genuine service area", "Phone number and operating hours", "Services or products", "Number of locations", "Current access to profile and analytics tools", "Main customer locations", "Primary enquiry goal"] },
  ],
  finalCta: {
    heading: "Help Nearby Customers Find Your Business",
    paragraphs: [
      "You do not need to guess which local search activity should come first.",
      "Share your business, location or service area and current online presence with DigiUdyam. We can review the foundation and explain the most practical next steps.",
    ],
    subheading: "Share Your Local Business Details",
    fields: ["Your name", "Business name", "Phone number", "Email address", "City or service area", "Website, if available", "Google Business Profile link, if available", "Business category", "Number of locations", "Main visibility goal"],
    primaryCta: { label: "Get a Free Local Growth Audit", href: "/free-audit" },
    secondaryCta: { label: "Discuss Local SEO", href: "/contact" },
    contactText: ["You can also ", { text: "contact DigiUdyam", href: "/contact" }, " to discuss your local visibility requirements."],
  },
};

const googleBusinessProfile: ServiceMoneyPage = {
  metadata: {
    title: "Google Business Profile Optimization Services India",
    description: "Google Business Profile optimization for Indian MSMEs and local businesses. Improve profile accuracy, presentation, customer actions and maintenance.",
    ogTitle: "Google Business Profile Optimization for Local Businesses",
    ogDescription: "Build a more accurate, useful and customer-ready Google Business Profile with practical optimization and ongoing guidance from DigiUdyam.",
    imageAlt: "Indian local business owner reviewing Google Business Profile information and customer actions",
  },
  hero: {
    heading: "Google Business Profile Optimization Services in India",
    paragraphs: [
      "Your Google Business Profile can be one of the first places a nearby customer checks before calling, visiting your website or asking for directions. If the information is incomplete, outdated or poorly presented, customers may struggle to understand or trust the business.",
      "DigiUdyam helps eligible Indian MSMEs and local businesses improve and maintain their Google Business Profile. The work focuses on accurate business information, relevant profile features, clearer customer actions and a practical process for reviews, updates and performance measurement.",
    ],
    primaryCta: { label: "Get a Free Profile Audit", href: "/free-audit" },
    secondaryCta: { label: "See What We Optimize", href: "#profile-optimization" },
    needsHeading: "What needs attention?",
    needs: [
      "Complete an incomplete profile",
      "Correct outdated business information",
      "Improve profile presentation",
      "Create a better review process",
    ],
  },
  sections: [
    {
      presentation: "list",
      heading: "A Business Profile Should Help Customers Take the Next Step",
      paragraphs: [
        "Customers use Google Search and Maps to compare nearby businesses, check practical information and decide what to do next. A profile that is incomplete or unmanaged can create uncertainty even when the business itself provides a good service.",
        "Common problems include:",
      ],
      groups: [
        { heading: "Incomplete Profile Information", paragraphs: ["Important details such as categories, services, hours, contact options or business descriptions may be missing."] },
        { heading: "Incorrect or Outdated Details", paragraphs: ["Old phone numbers, changing hours, inaccurate addresses or unsuitable service areas can send customers to the wrong place or make contact difficult."] },
        { heading: "Weak Customer Actions", paragraphs: ["The profile may not make it easy for customers to call, visit the website, request directions or use available booking options."] },
        { heading: "Unmanaged Reviews", paragraphs: ["Genuine feedback may go unanswered, while the business has no consistent and policy-aware process for requesting new reviews."] },
        { heading: "Poor Profile Presentation", paragraphs: ["Limited photos, unclear services and irregular updates can make the profile less useful when a customer is comparing options."] },
      ],
    },
    {
      id: "profile-optimization",
      heading: "What Our Google Business Profile Optimization Can Include",
      paragraphs: [
        "The exact work depends on profile eligibility, access, verification status, business type and the features available for the selected category.",
      ],
      groups: [
        {
          heading: "Profile Foundation and Accuracy",
          items: ["Ownership and access review", "Verification status check", "Business name and contact detail review", "Address or service-area setup", "Regular and special hours", "Website and customer-action links"],
        },
        {
          heading: "Category, Services and Business Information",
          items: ["Primary category review", "Relevant additional categories", "Services, products or menu information where available", "Business description", "Business attributes supported by the profile"],
        },
        {
          heading: "Photos and Profile Updates",
          items: ["Photo quality and coverage review", "Practical guidance for genuine business images", "Update planning where the feature is available", "Removal or reporting guidance for unsuitable user-contributed content"],
        },
        {
          heading: "Review Process Guidance",
          items: ["A simple process for requesting genuine customer feedback", "Review link or QR-code guidance", "Response approach for positive and critical reviews", "Policy-aware handling without fake or incentivised reviews"],
        },
        {
          heading: "Insights and Measurement",
          items: ["Review of available profile performance information", "Customer-action tracking where available", "Website analytics connection where practical", "Priority recommendations for ongoing maintenance"],
        },
      ],
    },
    {
      heading: "Google Business Profile Optimization Deliverables",
      paragraphs: ["Depending on the agreed scope and the access available, your profile optimization work may include:"],
      items: [
        "Profile audit and issue summary",
        "Business information correction plan",
        "Category and service recommendations",
        "Profile description and customer-facing information setup",
        "Address or service-area configuration guidance",
        "Phone, website, directions and supported booking action review",
        "Photo and update recommendations",
        "Review request and response guidance",
        "Performance measurement setup or review",
        "Maintenance priorities for the business team",
      ],
      groups: [{ heading: "", paragraphs: [["Customer-facing links should lead to the correct business or location and make the next step clear. If the current website needs improvement, explore DigiUdyam’s ", { text: "website development services", href: "/services/website-development" }, ". Some edits may require business-owner approval, renewed verification or review by Google."]] }],
      cta: { label: "Request a Google Business Profile Audit", href: "/free-audit" },
    },
    {
      presentation: "comparison",
      heading: "Choose One-Time Optimization or Ongoing Profile Management",
      paragraphs: ["Businesses can choose optimization-only support or continue with an ongoing management scope. The right model depends on the current profile, available internal time and how frequently the business information changes."],
      groups: [
        {
          heading: "One-Time GBP Optimization",
          paragraphs: ["A focused setup for businesses that want the profile reviewed and improved, then plan to manage future activity internally."],
          items: ["Profile audit", "Priority corrections", "Setup improvements", "Optimization recommendations", "Handover priorities for the business team"],
        },
        {
          heading: "Ongoing GBP Management",
          paragraphs: ["Continued support for businesses that want help keeping the profile current and reviewing performance over time."],
          items: ["Business updates", "Profile monitoring", "Review-response support", "Performance review", "Ongoing improvement recommendations"],
        },
      ],
    },
    {
      presentation: "list",
      heading: "How Responsibilities Are Shared",
      groups: [
        { heading: "What DigiUdyam Manages", paragraphs: ["DigiUdyam completes the agreed audits, profile updates, monitoring, response support and performance reviews within the selected service scope."] },
        { heading: "What the Client Provides", paragraphs: ["The business confirms accurate information, supplies genuine photos or updates, approves important changes and responds when ownership or verification evidence is required."] },
        { heading: "The Business Keeps Control", paragraphs: ["The client should retain profile ownership. DigiUdyam uses appropriate manager access for implementation and never requires the client to surrender ownership."] },
        { heading: "Optimization-Only Is Available", paragraphs: ["Ongoing management is optional. A business can choose a one-time optimization and use the recommendations to maintain the profile internally."] },
      ],
    },
    {
      presentation: "comparison",
      heading: "Google Business Profile Optimization and Local SEO Are Different",
      paragraphs: ["The services support each other, but they solve different parts of local visibility."],
      groups: [
        {
          heading: "Google Business Profile Optimization",
          paragraphs: ["This is focused work on the Google Business Profile platform and the customer-facing actions available through the profile."],
          items: ["Profile information and categories", "Services, photos and updates", "Hours and contact options", "Reviews and responses", "Profile performance information"],
        },
        {
          heading: "Local SEO",
          paragraphs: [["Local SEO is the broader visibility system connecting the profile with the website, location information, business listings, reviews and local authority. Explore DigiUdyam’s ", { text: "Local SEO services", href: "/services/local-seo" }, "."]],
          items: ["Google Business Profile", "Website and location pages", "Listings and business information consistency", "Reviews and local trust", "Local relevance, authority and measurement"],
        },
      ],
    },
    {
      presentation: "list",
      heading: "Who Google Business Profile Optimization Is For",
      paragraphs: ["This service may be useful for eligible businesses that serve customers at a real location or travel to customers within a genuine service area."],
      groups: [
        { heading: "Clinics and Healthcare Practices", paragraphs: ["Help patients check the correct location, hours, services and contact options before making an enquiry."] },
        { heading: "Restaurants and Food Businesses", paragraphs: ["Present useful opening information, food-related details, genuine photos and customer feedback more clearly."] },
        { heading: "Salons and Personal Care Businesses", paragraphs: ["Clarify services, hours, location and the available paths for calling, visiting or booking."] },
        { heading: "Retail Shops", paragraphs: ["Keep store information useful for customers checking availability, hours, directions and business details."] },
        { heading: "Local Service Businesses", paragraphs: ["Represent a genuine service area accurately when the business visits or delivers to customers instead of serving them at the listed address."] },
        { heading: "Businesses With an Outdated Profile", paragraphs: ["Correct an incomplete, inconsistent or neglected profile and create a manageable routine for future updates."] },
      ],
    },
    {
      presentation: "timeline",
      heading: "Our Google Business Profile Optimization Process",
      paragraphs: ["The process begins with eligibility and accuracy before moving to presentation, customer actions and maintenance."],
      groups: [
        { heading: "1. Understand the Business", paragraphs: ["We confirm how the business operates, where it serves customers, its main services and the customer actions that matter."] },
        { heading: "2. Review Access and Eligibility", paragraphs: ["We check ownership, verification context and whether the location or service-area setup reflects the real business."] },
        { heading: "3. Audit the Existing Profile", paragraphs: ["We review information, categories, services, photos, reviews, links and available performance data."] },
        { heading: "4. Correct and Complete the Profile", paragraphs: ["We prioritise inaccurate or missing details and prepare suitable changes based on the business and platform guidelines."] },
        { heading: "5. Improve Presentation and Actions", paragraphs: ["We strengthen useful customer-facing information, genuine visual content and the routes customers can use to take the next step."] },
        { heading: "6. Build a Maintenance Routine", paragraphs: ["We define practical review, update and measurement actions so the profile does not become outdated again."] },
      ],
    },
    {
      presentation: "list",
      heading: "What Clients Can Realistically Expect",
      groups: [
        { heading: "Business Information Customers Can Rely On", paragraphs: ["Important profile details can be reviewed, corrected and organised so customers receive clearer information."] },
        { heading: "Clearer Services and Contact Paths", paragraphs: ["Relevant services, photos, updates and supported actions can help customers evaluate the business and choose a next step."] },
        { heading: "Genuine Review Practices", paragraphs: ["The business can request real customer feedback and respond consistently without buying, inventing or incentivising reviews."] },
        { heading: "Profile Activity That Can Be Reviewed", paragraphs: ["Available profile and website information can be used to understand customer activity and decide what needs attention next."] },
        { heading: "Rankings and Enquiries Are Not Guaranteed", paragraphs: ["DigiUdyam does not guarantee a particular Google Maps position, number of calls or enquiry volume. Local results can also depend on relevance, distance, prominence, competition and customer demand."] },
        { heading: "Google May Review Profile Changes", paragraphs: ["Google controls verification, feature availability and the acceptance of edits. Some changes may take time, require additional evidence or be rejected by the platform."] },
      ],
    },
    {
      presentation: "audit",
      heading: "What Happens During the Free Profile Audit?",
      paragraphs: ["The audit identifies the most useful corrections and improvements before a service scope is recommended."],
      groups: [
        { heading: "Accuracy Check", paragraphs: ["We review the visible business name, contact details, hours, location or service area and other important information."] },
        { heading: "Profile Setup Review", paragraphs: ["We examine categories, services, business description, supported attributes, links and verification context."] },
        { heading: "Presentation and Customer Actions", paragraphs: ["We review photos, reviews, updates and the paths customers can use to call, visit, find directions or book where supported."] },
        { heading: "Priority Recommendations", paragraphs: ["We organise findings into clear actions: what should be corrected first, what can be improved next and what needs ongoing maintenance."] },
      ],
    },
    {
      presentation: "list",
      heading: "Why Work With DigiUdyam",
      groups: [
        { heading: "Business Information Before Shortcuts", paragraphs: ["We start with the real business, its eligible location or service area and the information customers actually need."] },
        { heading: "Customer Actions Before Vanity Metrics", paragraphs: ["The profile is planned around useful actions such as calls, website visits, directions and supported bookings—not a single ranking screenshot."] },
        { heading: "Policy-Aware Guidance", paragraphs: ["We avoid keyword-stuffed business names, fake locations, duplicate profiles and review manipulation that can create customer confusion or platform problems."] },
        { heading: "Clear Scope and Communication", paragraphs: ["We explain what can be changed, what requires business input and what remains under Google’s control."] },
        { heading: "Profile Work Connected With Wider Visibility", paragraphs: [["When the business needs wider visibility, the profile can connect with ", { text: "Local SEO", href: "/services/local-seo" }, ", a stronger website and other digital growth services."]] },
      ],
    },
  ],
  faqs: [
    { q: "What is Google Business Profile optimization?", a: "Google Business Profile optimization is the process of reviewing and improving the information, categories, services, photos, customer actions, reviews and supported features on an eligible business profile. It also includes creating a practical routine for accuracy and maintenance." },
    { q: "Is Google Business Profile the same as Google My Business?", a: "Google Business Profile is the current name for the platform previously known as Google My Business. Business owners can use it to manage how eligible business information appears across Google Search and Maps." },
    { q: "How is Google Business Profile optimization different from Local SEO?", a: "Google Business Profile optimization focuses on one platform and its customer-facing features. Local SEO is broader: it connects the profile with the website, location pages, listings, reviews, local relevance, authority and measurement." },
    { q: "Can you guarantee a top Google Maps ranking?", a: "No. Google controls local results, and factors such as customer distance, relevance, prominence, competition and demand cannot be controlled by an agency. DigiUdyam focuses on accurate implementation, useful profile information and transparent measurement." },
    { q: "Does my business qualify for a Google Business Profile?", a: "A business generally needs to serve customers at a real location or travel to customers within a genuine service area. Online-only businesses and virtual offices may not be eligible. The business type and current platform guidelines should be reviewed before setup." },
    { q: "Can you optimize a service-area business profile?", a: "Yes, when the business is eligible and genuinely travels to or delivers to customers. The service area and address visibility must represent how the business actually operates. A residential address should not be displayed when customers are not served there." },
    { q: "What access is needed to optimize the profile?", a: "The business should retain ownership and provide DigiUdyam with appropriate manager access when implementation support is required. Login passwords should not be shared. The exact access depends on the current ownership and verification status." },
    { q: "How long do profile updates take?", a: "Some edits may appear quickly, while others can require Google review, renewed verification or supporting information. Timing depends on the type of edit and the profile condition, so a fixed publication time cannot be guaranteed." },
    { q: "Do you provide ongoing Google Business Profile management?", a: "Yes. DigiUdyam can provide ongoing support for agreed profile updates, monitoring, review-response guidance, performance review and improvement recommendations. Ongoing management is optional; businesses can also choose one-time optimization and maintain the profile internally after handover." },
    { q: "How should business categories be selected?", a: "The primary category should describe the core business as specifically and accurately as possible. Additional categories should represent other genuine parts of the business rather than being added only as keywords." },
    { q: "Can you help us get more Google reviews?", a: "DigiUdyam can help create a simple process for requesting genuine feedback and responding to reviews. Reviews should reflect real customer experiences. Buying reviews or offering incentives for positive ratings can violate Google policies." },
    { q: "Can a negative review be removed?", a: "A business cannot remove a review only because it is critical. Content that appears to violate Google policies can be reported for review. Otherwise, a clear and professional response may help customers understand the business’s perspective." },
    { q: "Can one business have profiles for multiple locations?", a: "A genuine eligible location may have its own profile when it is separately represented and operated according to Google guidelines. Duplicate profiles, virtual offices or invented locations should not be created to target more areas." },
    { q: "How much does Google Business Profile optimization cost in India?", a: "Cost depends on the profile condition, number of genuine locations, ownership or verification issues, required corrections, content needs and ongoing maintenance. DigiUdyam reviews the current profile before defining the scope and quotation." },
    { q: "What information is needed for a free profile audit?", a: "Useful inputs include:", items: ["Business name", "Google Business Profile link", "Website URL, if available", "Phone number", "Business category", "Physical location or genuine service area", "Opening hours", "Main services or products", "Number of locations", "Current ownership or verification status", "Primary customer action"] },
  ],
  finalCta: {
    eyebrow: "Google Business Profile audit",
    heading: "Make Your Google Business Profile More Useful to Customers",
    paragraphs: [
      "You do not need to guess which profile field, photo or update should come first.",
      "Share your current profile with DigiUdyam. We can review its accuracy, presentation and customer actions, then explain the practical priorities.",
    ],
    subheading: "Share Your Business Profile Details",
    fields: ["Your name", "Business name", "Phone number", "Email address", "City or service area", "Google Business Profile link", "Website, if available", "Business category", "Number of locations", "Main profile concern"],
    primaryCta: { label: "Get a Free Profile Audit", href: "/free-audit" },
    secondaryCta: { label: "Discuss Profile Optimization", href: "/contact" },
    contactText: ["You can also ", { text: "contact DigiUdyam", href: "/contact" }, " to discuss your Google Business Profile requirements."],
  },
};

const digitalMarketing: ServiceMoneyPage = {
  metadata: {
    title: "Digital Marketing Services India for Small Businesses",
    description: "Digital marketing services for Indian MSMEs and small businesses. Build a connected strategy across campaigns, landing pages, content and measurement.",
    ogTitle: "Digital Marketing for Indian MSMEs and Small Businesses",
    ogDescription: "Plan customer acquisition around the right channels, clear campaigns, focused landing pages and useful measurement with DigiUdyam.",
    imageAlt: "Indian small business team reviewing digital marketing campaigns and customer acquisition data",
  },
  hero: {
    heading: "Digital Marketing Services in India for MSMEs and Small Businesses",
    paragraphs: [
      "Digital marketing should help your business reach suitable customers, communicate a clear offer and understand which activities create useful enquiries. Running disconnected ads or posting without a direction can consume time and budget without explaining what should happen next.",
      "DigiUdyam helps Indian MSMEs and small businesses build a connected customer acquisition system. We align marketing strategy, channel planning, campaigns, landing pages, content direction and measurement around the business goal instead of recommending every available channel.",
    ],
    primaryCta: { label: "Get a Free Marketing Audit", href: "/free-audit" },
    secondaryCta: { label: "See Our Marketing Approach", href: "#marketing-system" },
    needsHeading: "What needs improvement?",
    needs: [
      "Create a clear marketing direction",
      "Build a more consistent enquiry flow",
      "Connect campaigns and landing pages",
      "Improve conversion measurement",
    ],
  },
  sections: [
    {
      presentation: "list",
      heading: "Marketing Activity Without a System Is Difficult to Improve",
      paragraphs: [
        "Many small businesses are active online but cannot clearly explain which channel supports which goal, what happens after a customer clicks or how enquiries are being measured.",
        "Common problems include:",
      ],
      groups: [
        { heading: "Inconsistent Lead Flow", paragraphs: ["Enquiries may depend on occasional posts, referrals or short campaigns with no repeatable acquisition plan."] },
        { heading: "Unclear Marketing Direction", paragraphs: ["The business may be using several channels without a defined audience, offer, priority or next action."] },
        { heading: "Poor Conversion Tracking", paragraphs: ["Clicks and reach are reported, but calls, forms, bookings or qualified opportunities are not measured reliably."] },
        { heading: "Disconnected Campaigns", paragraphs: ["Ads, social content, landing pages, WhatsApp and sales follow-up may operate separately, creating gaps in the customer journey."] },
        { heading: "Weak Landing Experience", paragraphs: ["Campaign traffic may reach a generic page that does not match the message or help the visitor take a clear next step."] },
      ],
    },
    {
      id: "marketing-system",
      heading: "A Digital Marketing System Built Around Customer Acquisition",
      paragraphs: ["The right scope depends on the business model, customer decision process, current assets, budget and the channels that can support the goal."],
      groups: [
        {
          heading: "Marketing Strategy",
          paragraphs: ["Define the audience, business objective, offer, enquiry action and role of each selected channel before campaign execution begins."],
        },
        {
          heading: "Channel Planning",
          paragraphs: ["Choose channels based on customer behaviour and intent rather than using every platform. The plan may involve search, paid media, social content, email or other relevant touchpoints."],
        },
        {
          heading: "Paid Campaign Support",
          paragraphs: [["When paid acquisition is suitable, the scope can include campaign planning, setup and improvement. Businesses needing focused paid-search support can also explore ", { text: "Google Ads services", href: "/services/google-ads" }, "."]],
        },
        {
          heading: "Landing Page Optimization",
          paragraphs: ["Connect campaign messages with a relevant page, clear information, useful trust signals and an enquiry path that works on mobile devices."],
        },
        {
          heading: "Content Direction",
          paragraphs: ["Plan topics, messages and formats around customer questions, business priorities and the role of each channel instead of publishing without a purpose."],
        },
        {
          heading: "Analytics and Measurement",
          paragraphs: ["Define meaningful actions, review tracking quality and connect available campaign and website data with the enquiries the business values."],
        },
      ],
    },
    {
      heading: "Digital Marketing Deliverables",
      paragraphs: ["The deliverables are selected after the current marketing setup and business objective are understood. An agreed scope may include:"],
      items: [
        "Business and marketing discovery",
        "Current channel and campaign audit",
        "Audience and offer clarification",
        "Channel role and priority plan",
        "Campaign structure and execution support where relevant",
        "Landing page review and recommendations",
        "Content themes and campaign direction",
        "Conversion action and tracking review",
        "Reporting framework for agreed business signals",
        "Improvement priorities based on available evidence",
      ],
      groups: [{ heading: "", paragraphs: ["Not every business needs every deliverable. DigiUdyam recommends a focused scope so time and budget are not spread across channels that do not support the current goal."] }],
      cta: { label: "Request a Digital Marketing Audit", href: "/free-audit" },
    },
    {
      presentation: "list",
      heading: "How Digital Marketing Differs From Local Visibility Services",
      paragraphs: ["These services can work together, but each has a different primary role."],
      groups: [
        { heading: "Digital Marketing", paragraphs: ["A broader customer acquisition and growth system covering strategy, campaigns, selected channels, landing experiences, content direction, measurement and ongoing improvement."] },
        { heading: "Local SEO", paragraphs: [["A local visibility system that helps nearby customers discover a business through the website, location information, listings, reviews and local authority. Explore ", { text: "Local SEO services", href: "/services/local-seo" }, "."]] },
        { heading: "Google Business Profile Optimization", paragraphs: [["Focused optimization and management of the Google Business Profile platform, its information, presentation and supported customer actions. Explore ", { text: "Google Business Profile optimization", href: "/services/google-business-profile" }, "."]] },
      ],
    },
    {
      presentation: "comparison",
      heading: "Digital Marketing and Google Ads Are Not the Same Service",
      paragraphs: ["Google Ads can be part of a digital marketing plan, but it is one paid acquisition channel rather than the complete marketing system."],
      groups: [
        {
          heading: "Google Ads",
          paragraphs: [["Google Ads is a paid channel used to reach people through suitable Google advertising placements. The work can include campaign setup, targeting, ads, budgets, landing-page alignment and conversion measurement. Explore DigiUdyam’s ", { text: "Google Ads services", href: "/services/google-ads" }, "."]],
          items: ["One paid acquisition channel", "Campaign and targeting decisions", "Advertising media budget", "Ad and landing-page connection", "Paid campaign measurement"],
        },
        {
          heading: "Digital Marketing",
          paragraphs: ["Digital Marketing is the broader strategy that decides which channels should be used and connects campaigns with content, landing pages, customer actions, measurement and improvement."],
          items: ["Business and audience strategy", "Channel selection", "Paid and non-paid activity where relevant", "Landing pages and content direction", "Measurement across the selected marketing system"],
        },
      ],
    },
    {
      presentation: "list",
      heading: "Who Digital Marketing Support Is For",
      paragraphs: ["DigiUdyam works with businesses that need a clearer way to reach, convert and understand potential customers online."],
      groups: [
        { heading: "Indian MSMEs", paragraphs: ["Build a focused marketing plan that reflects available resources, sales capacity and the next stage of business growth."] },
        { heading: "Clinics and Healthcare Practices", paragraphs: ["A patient sees a relevant service message, reaches a clear clinic page, checks the location and treatment information, then calls or submits an appointment enquiry. Campaign wording and claims must remain appropriate for the business category."] },
        { heading: "Restaurants and Food Businesses", paragraphs: ["A nearby customer discovers a menu, offer or dining experience, checks practical details and then calls, requests a reservation or asks for directions."] },
        { heading: "Salons and Wellness Businesses", paragraphs: ["Plan visual discovery and service campaigns around enquiries, appointments and repeat customer communication."] },
        { heading: "Retail Businesses", paragraphs: ["A customer discovers a relevant product or store campaign, reviews the product or offer details and then visits the shop, sends an enquiry or completes an online purchase where supported."] },
        { heading: "Professional Services", paragraphs: ["A potential client finds a useful explanation or focused campaign, reviews the firm’s expertise and service fit, then requests a consultation with enough context for follow-up."] },
        { heading: "Local Entrepreneurs", paragraphs: ["Choose a practical starting point instead of investing in multiple channels before the offer, website and follow-up process are ready."] },
      ],
    },
    {
      presentation: "timeline",
      heading: "Our Digital Marketing Process",
      paragraphs: ["The process connects the business goal with the campaign work so each activity has a clear purpose."],
      groups: [
        { heading: "1. Understand the Business Goal", paragraphs: ["We clarify the offer, audience, customer journey, enquiry value, current sales process and the outcome the marketing activity should support."] },
        { heading: "2. Audit the Current Foundation", paragraphs: ["We review the website, landing pages, active channels, campaigns, tracking and available performance information."] },
        { heading: "3. Prioritise Channels and Actions", paragraphs: ["We define which channels have a clear role now, which need preparation and which can be left out of the initial scope."] },
        { heading: "4. Prepare the Campaign Journey", paragraphs: ["We align the message, creative direction, audience, destination and enquiry action before or alongside campaign execution."] },
        { heading: "5. Launch and Check the Data", paragraphs: ["Where campaigns are included, we check that they are running and that important actions are being recorded before judging early results."] },
        { heading: "6. Review and Improve", paragraphs: ["We examine agreed signals, identify friction and recommend changes to targeting, messages, landing pages, tracking or follow-up."] },
      ],
    },
    {
      heading: "How Marketing Decisions Are Made",
      paragraphs: ["Decisions should follow the business goal and reliable information, not a fixed checklist or whichever platform is currently popular."],
      table: {
        headings: ["Decision question", "What we examine"],
        rows: [
          ["Who should the campaign reach?", "Customer need, location, buying context and whether the audience can be defined responsibly."],
          ["Which channel should be used?", "Search intent, discovery behaviour, offer type, budget, available content and expected customer journey."],
          ["Where should traffic go?", "Message relevance, mobile usability, service information, trust signals and a clear enquiry action."],
          ["What should be measured?", "Calls, forms, bookings, purchases or qualified opportunities that matter to the business—not reach alone."],
          ["What should change next?", "Whether tracking works, whether enough useful activity has occurred, campaign quality, landing-page problems and feedback from the sales team."],
        ],
      },
    },
    {
      presentation: "list",
      heading: "Scope, Responsibilities and Separate Costs",
      paragraphs: ["The proposal should make it clear what DigiUdyam will handle, what the business must provide and which costs sit outside the agreed service fee."],
      groups: [
        {
          heading: "What DigiUdyam Handles",
          paragraphs: ["Within the agreed scope, DigiUdyam can handle marketing strategy, channel planning, campaign structure, landing-page recommendations and measurement or reporting setup. Any implementation work included in the proposal is listed clearly before work begins."],
        },
        {
          heading: "What the Client Provides",
          paragraphs: ["The client supplies accurate business and service information, appropriate account access, budgets and brand materials. The client also provides timely approvals and feedback about enquiry quality, customer conversations and sales outcomes."],
        },
        {
          heading: "Costs Quoted Separately",
          paragraphs: ["Advertising media spend, third-party software or tools, and major creative, website or development work outside the agreed scope are separate costs. These should be confirmed before the related activity begins."],
        },
      ],
    },
    {
      presentation: "list",
      heading: "What Businesses Can Realistically Expect",
      groups: [
        { heading: "A Clearer Marketing Direction", paragraphs: ["The business can understand the purpose of each selected channel and the customer action it should support."] },
        { heading: "More Connected Campaign Journeys", paragraphs: ["Campaign messages, landing pages, enquiry capture and follow-up can be planned as one sequence rather than separate tasks."] },
        { heading: "More Useful Measurement", paragraphs: ["Available tracking can be organised around agreed actions so decisions are not based only on impressions, followers or clicks."] },
        { heading: "Changes Based on Real Activity", paragraphs: ["Campaign and website changes can be prioritised after checking whether tracking works, how customers respond and what the sales team learns from enquiries."] },
        { heading: "No Guaranteed Lead Volume or ROI", paragraphs: ["DigiUdyam does not guarantee a specific number of leads, customers, revenue or return on investment. Results can depend on the offer, market, budget, competition, sales response and other factors outside campaign management."] },
        { heading: "Testing Requires Time and Budget", paragraphs: ["Some decisions need enough genuine campaign activity before a useful conclusion can be made. Early changes in clicks or enquiries should not be treated as proof of long-term performance."] },
      ],
    },
    {
      presentation: "audit",
      heading: "What Happens During the Free Digital Marketing Audit?",
      paragraphs: ["The audit identifies immediate gaps and helps determine whether strategy, campaign, landing-page or measurement work should come first."],
      groups: [
        { heading: "Business and Goal Review", paragraphs: ["We clarify the offer, audience, main enquiry action, current lead sources and what the business wants marketing to support."] },
        { heading: "Channel and Campaign Check", paragraphs: ["We review the available channel activity, campaign structure and whether each channel has a defined role."] },
        { heading: "Landing Page and Tracking Check", paragraphs: ["We examine the destination experience, enquiry path and whether important actions can be measured reliably."] },
        { heading: "Priority Recommendations", paragraphs: ["We organise findings into a focused starting plan and explain what should be fixed, tested or measured before additional activity is added."] },
      ],
    },
    {
      presentation: "list",
      heading: "Why Businesses Work With DigiUdyam",
      groups: [
        { heading: "Strategy Before Channel Activity", paragraphs: ["We define the business objective and customer journey before recommending campaigns or ongoing channel work."] },
        { heading: "Campaigns Connected With the Website", paragraphs: [["Traffic needs a suitable destination. DigiUdyam can connect campaign planning with landing-page improvements or broader ", { text: "website development", href: "/services/website-development" }, "."]] },
        { heading: "Measurement Connected With Enquiries", paragraphs: ["We prioritise meaningful actions and tracking quality instead of presenting reach or clicks as business growth."] },
        { heading: "Clear Limitations and Expectations", paragraphs: ["We explain what the marketing work can influence, what requires client input and what depends on market or sales conditions."] },
        { heading: "A Connected Growth Partner", paragraphs: [["When appropriate, marketing enquiries can be organised through ", { text: "CRM solutions", href: "/services/crm-solutions" }, " and supported by automation instead of remaining scattered across inboxes."]] },
      ],
    },
  ],
  faqs: [
    { q: "What do digital marketing services include?", a: "Digital marketing services can include strategy, channel planning, campaigns, landing-page optimization, content direction, conversion measurement and ongoing improvement. The right scope depends on the business objective and should not automatically include every channel." },
    { q: "Is digital marketing suitable for a small business?", a: "It can be suitable when the business has a clear offer, realistic budget, a workable enquiry or sales process and a customer audience that can be reached online. DigiUdyam reviews the foundation before recommending a scope." },
    { q: "How is digital marketing different from Local SEO?", a: "Local SEO focuses on nearby customer discovery through local search, the website, location information, listings, reviews and local authority. Digital marketing is broader and can include strategy, paid campaigns, content, landing pages, measurement and non-local acquisition channels." },
    { q: "Is Google Business Profile management part of digital marketing?", a: "Google Business Profile can support a wider marketing system, but focused profile optimization and management is a distinct service. It deals with the profile’s information, presentation, reviews and supported customer actions." },
    { q: "Which digital marketing channels should my business use?", a: "The answer depends on how customers discover and evaluate the business, the offer, location, available content, budget and sales process. A focused combination is usually more practical than opening every channel without a defined role." },
    { q: "Do you provide paid advertising support?", a: "Paid campaign support can be included where it matches the business objective, budget and customer journey. The scope may involve planning, setup, landing-page alignment, conversion measurement and improvement. Media spend is separate from service fees unless explicitly stated in a proposal." },
    { q: "Do I need a landing page for digital marketing campaigns?", a: "A focused landing page can help when a campaign promotes one service, offer or action. The page should match the campaign message, work well on mobile devices and make the next step clear. Some campaigns may use an existing website page if it already meets those needs." },
    { q: "How do you measure digital marketing performance?", a: "Measurement begins with the actions that matter to the business, such as calls, forms, bookings, purchases or qualified opportunities. Available platform, website and CRM data can then be reviewed with appropriate context and tracking limitations." },
    { q: "Can you guarantee leads or return on investment?", a: "No. DigiUdyam does not guarantee lead volume, customers, revenue or ROI. Marketing performance can be influenced by the offer, market demand, competition, budget, website experience, tracking quality and the business’s sales response." },
    { q: "How long does digital marketing take to work?", a: "Timelines vary by channel, starting position, campaign objective, budget, market and customer decision cycle. Setup and tracking issues can be addressed early, while reliable improvement decisions may require sufficient relevant activity over time." },
    { q: "What does DigiUdyam need from the business?", a: "Useful inputs include accurate service information, audience context, campaign access where relevant, approved brand materials, realistic budgets, timely approvals and feedback about enquiry quality or sales outcomes." },
    { q: "Can digital marketing connect with our CRM?", a: "Yes, when the tools and scope support it. Connecting forms or campaign enquiries with a CRM can help organise lead sources, ownership and follow-up. It does not replace the need for a clear sales process." },
    { q: "How much do digital marketing services cost in India?", a: "Cost depends on the channels, campaign volume, creative and landing-page requirements, tracking work, reporting needs and level of ongoing support. Advertising media budgets are also considered separately. DigiUdyam reviews the requirement before proposing a scope." },
    { q: "What information is needed for a free marketing audit?", a: "Useful inputs include:", items: ["Business name and website", "Main products or services", "Target customers and locations", "Current marketing channels", "Active campaign access or summaries, if available", "Approximate media budget, if relevant", "Primary enquiry or sales action", "Current landing pages", "Available analytics or tracking", "Main marketing concern"] },
  ],
  finalCta: {
    eyebrow: "Digital marketing audit",
    heading: "Build a Clearer Customer Acquisition System",
    paragraphs: [
      "You do not need to invest in every channel to start improving your marketing.",
      "Share your current website, campaigns and main growth goal with DigiUdyam. We can review the journey and explain which strategy, channel, landing-page or measurement priorities should come first.",
      "After the audit, you receive a prioritised action plan covering recommended channels, landing-page priorities and the measurement steps needed before further improvement decisions are made.",
    ],
    subheading: "Share Your Marketing Context",
    fields: ["Your name", "Business name", "Phone number", "Email address", "City or customer market", "Website, if available", "Current marketing channels", "Main product or service", "Primary enquiry goal", "Main marketing concern"],
    primaryCta: { label: "Get a Free Marketing Audit", href: "/free-audit" },
    secondaryCta: { label: "Discuss Digital Marketing", href: "/contact" },
    contactText: ["You can also ", { text: "contact DigiUdyam", href: "/contact" }, " to discuss your digital marketing requirements."],
  },
};

const crmSolutions: ServiceMoneyPage = {
  metadata: {
    title: "CRM Solutions India for Small Business Lead Management",
    description: "CRM solutions for Indian MSMEs and small businesses. Organize leads, ownership, follow-ups, customer records and sales pipeline visibility.",
    ogTitle: "CRM Solutions for Indian MSMEs and Small Businesses",
    ogDescription: "Create a clearer lead-management and follow-up process with practical CRM setup, sales stages, ownership and integrations from DigiUdyam.",
    imageAlt: "Indian small business sales team reviewing leads, follow-ups and pipeline stages in a CRM",
  },
  hero: {
    heading: "CRM Solutions for Indian MSMEs and Small Businesses",
    paragraphs: [
      "A CRM should help your team know where each enquiry came from, who owns the next step and when follow-up is due. When leads remain scattered across WhatsApp chats, calls, inboxes and spreadsheets, valuable context can be missed and managers cannot see what is happening in the sales process.",
      "DigiUdyam provides practical CRM solutions for Indian MSMEs and small businesses. We help organise lead capture, customer records, pipeline stages, task ownership, follow-up and sales visibility using a suitable CRM platform. DigiUdyam is an implementation and digital growth partner—not a proprietary CRM software vendor.",
    ],
    primaryCta: { label: "Get a Free CRM Process Audit", href: "/free-audit" },
    secondaryCta: { label: "See What CRM Can Organize", href: "#crm-management" },
    needsHeading: "What needs to be organized?",
    needs: [
      "Bring leads into one process",
      "Stop missed follow-ups",
      "Assign clear lead ownership",
      "See the sales pipeline clearly",
    ],
  },
  sections: [
    {
      presentation: "list",
      heading: "Scattered Leads Make Sales Follow-Up Hard to Manage",
      paragraphs: [
        "Many growing businesses receive enquiries from several places but rely on individual memory, personal WhatsApp chats or separate spreadsheets to continue the conversation.",
        "Common problems include:",
      ],
      groups: [
        { heading: "Leads Across Different Channels", paragraphs: ["Website forms, calls, WhatsApp messages, advertising leads, referrals and walk-ins may be stored in different places."] },
        { heading: "Missed Follow-Ups", paragraphs: ["The team may not have a reliable reminder or task process, so interested prospects receive late or inconsistent responses."] },
        { heading: "No Clear Ownership", paragraphs: ["Team members may assume someone else is handling an enquiry, while managers cannot see who is responsible for the next action."] },
        { heading: "Limited Pipeline Visibility", paragraphs: ["The business cannot easily see which leads are new, contacted, qualified, waiting for a decision or no longer active."] },
        { heading: "Inconsistent Customer Communication", paragraphs: ["Important notes, requirements and previous conversations may not be available to the person continuing the follow-up."] },
      ],
    },
    {
      id: "crm-management",
      heading: "What CRM Helps a Small Business Manage",
      paragraphs: ["The goal is not to add more software. It is to give the team one clear process for managing enquiries and customer conversations."],
      groups: [
        { heading: "Lead Capture", paragraphs: ["Bring agreed enquiry sources into a consistent lead-record process instead of leaving new opportunities in separate inboxes."] },
        { heading: "Customer Records", paragraphs: ["Keep useful contact details, service interest, source, notes and communication history together where the team can access them appropriately."] },
        { heading: "Sales Pipeline", paragraphs: ["Use simple stages that reflect how the business actually moves from a new enquiry to qualification, proposal, decision and closure."] },
        { heading: "Follow-Up Work", paragraphs: ["Create tasks, due dates and reminders so the next call, message, meeting or proposal action is visible."] },
        { heading: "Lead Ownership", paragraphs: ["Assign a responsible team member and make handovers clear when another person needs to continue the conversation."] },
        { heading: "Sales Visibility", paragraphs: ["Review lead sources, stage movement, overdue actions and outcomes using the information the team keeps updated."] },
      ],
    },
    {
      heading: "CRM Solution Deliverables",
      paragraphs: ["The scope depends on the sales process, team size, enquiry sources, existing tools and the CRM platform selected. Deliverables may include:"],
      items: [
        "Current lead and follow-up process audit",
        "CRM requirement and platform-fit review",
        "Lead fields and customer record structure",
        "Sales pipeline and stage configuration",
        "Lead source and ownership setup",
        "Task, reminder and follow-up workflow setup",
        "Website form or campaign lead connection where supported",
        "Relevant CRM integrations",
        "Dashboard and sales visibility configuration",
        "User access and permission setup",
        "Team handover and process guidance",
        "Post-launch review priorities",
      ],
      groups: [{ heading: "", paragraphs: ["Software subscriptions, paid integrations and work outside the agreed implementation scope are confirmed separately. Features and connection options depend on the selected tools and account plans."] }],
      cta: { label: "Request a CRM Process Audit", href: "/free-audit" },
    },
    {
      presentation: "list",
      heading: "Who CRM Solutions Are For",
      paragraphs: ["CRM support is useful when the business receives enough enquiries or involves enough people that memory and disconnected records are no longer reliable."],
      groups: [
        { heading: "Owner-Led Small Businesses", paragraphs: ["Keep enquiries and follow-ups organised without depending on personal chats, notebooks and separate reminders."] },
        { heading: "Growing Sales Teams", paragraphs: ["Define ownership, shared stages and daily follow-up tasks as more team members become involved in sales."] },
        { heading: "Clinics and Appointment Businesses", paragraphs: ["Track service enquiries, consultation or appointment interest and the next customer communication without storing medical records in the sales CRM."] },
        { heading: "Real Estate Businesses", paragraphs: ["Organise property or project interest, lead requirements, assigned sales owners, site-visit actions and ongoing follow-up."] },
        { heading: "Education and Coaching Businesses", paragraphs: ["Manage course enquiries, counselling conversations, admission stages and follow-up responsibilities."] },
        { heading: "Professional Service Firms", paragraphs: ["Record consultation enquiries, service requirements, proposal stages and relationship history for suitable team access."] },
        { heading: "Businesses Running Marketing Campaigns", paragraphs: ["Connect campaign enquiries with lead source, assignment and follow-up so marketing activity does not end at the form submission."] },
      ],
    },
    {
      presentation: "timeline",
      heading: "Our CRM Implementation Process",
      paragraphs: ["The implementation begins with the sales process. The software is configured only after the team understands how leads should move and who is responsible at each stage."],
      groups: [
        { heading: "1. Map the Current Lead Process", paragraphs: ["We review where enquiries arrive, what information is collected, how leads are assigned and how follow-up currently happens."] },
        { heading: "2. Define the Required Sales Stages", paragraphs: ["We create a simple pipeline that matches the real business process instead of copying a generic software template."] },
        { heading: "3. Confirm the Platform and Scope", paragraphs: ["We review the selected or existing CRM, required users, access, integrations, subscription limits and implementation priorities."] },
        { heading: "4. Configure Records, Ownership and Tasks", paragraphs: ["We set up agreed fields, stages, lead sources, team ownership, follow-up tasks and permissions."] },
        { heading: "5. Connect Relevant Lead Sources", paragraphs: ["Where supported and included, we connect website forms, campaigns or other agreed sources and test how new enquiries enter the process."] },
        { heading: "6. Test, Handover and Improve", paragraphs: ["The team tests common scenarios, receives process guidance and identifies adjustments after using the system with real enquiries."] },
      ],
    },
    {
      presentation: "list",
      heading: "CRM Connects Marketing With Sales Follow-Up",
      paragraphs: ["A lead-management process becomes more useful when customer enquiries enter with enough context and reach the correct owner."],
      groups: [
        { heading: "Website to CRM", paragraphs: [["Website forms can create organised lead records with source and service context where the selected tools support the connection. Explore DigiUdyam’s ", { text: "website development services", href: "/services/website-development" }, "."]] },
        { heading: "Marketing to CRM", paragraphs: [["Campaign leads can be connected with source information, assignment and follow-up so the business can review what happened after the enquiry. Explore ", { text: "Digital Marketing services", href: "/services/digital-marketing" }, "."]] },
        { heading: "CRM to the Sales Team", paragraphs: ["New leads, due tasks and customer context can be made visible to the responsible person instead of remaining in a shared inbox."] },
        { heading: "Sales Feedback to Marketing", paragraphs: ["Lead quality and outcome notes can help the business understand which enquiry sources deserve attention, provided the team keeps records updated."] },
      ],
    },
    {
      presentation: "comparison",
      heading: "CRM Solutions and Business Automation Have Different Roles",
      paragraphs: ["The two services can work together, but CRM organisation should not be confused with automating every task."],
      groups: [
        {
          heading: "CRM Solutions",
          paragraphs: ["CRM Solutions organise and improve sales operations: lead records, pipeline stages, ownership, follow-up tasks, customer context and sales visibility."],
          items: ["Lead and customer records", "Sales stages", "Ownership and tasks", "Follow-up visibility", "Sales process reporting"],
        },
        {
          heading: "Business Automation",
          paragraphs: [["Business Automation reduces repetitive manual work through connected workflows and integrations. It may use CRM information, but its scope can extend beyond sales operations. Explore ", { text: "Business Automation", href: "/services/automation" }, "."]],
          items: ["Workflow triggers", "System integrations", "Automatic routing or notifications", "Repetitive process reduction", "Operational handovers"],
        },
      ],
    },
    {
      presentation: "list",
      heading: "How Automation Can Support the CRM Process",
      groups: [
        { heading: "Lead Routing", paragraphs: ["A new lead may be assigned or notified according to agreed rules when the selected tools support the workflow."] },
        { heading: "Task Creation", paragraphs: ["Follow-up tasks or reminders may be created when a lead enters a stage or reaches an agreed date."] },
        { heading: "Acknowledgement and Reminders", paragraphs: [["Approved customer messages may support the sales process without pretending that automation replaces a human conversation. Explore ", { text: "WhatsApp Automation", href: "/services/whatsapp-automation" }, "."]] },
        { heading: "Internal Notifications", paragraphs: ["Team members may receive alerts for new, reassigned or overdue leads when the workflow and permissions allow it."] },
        { heading: "Human Review Remains Important", paragraphs: ["Automation should not make sales decisions, send unsuitable messages or update important records without clear rules and oversight."] },
      ],
    },
    {
      presentation: "list",
      heading: "What Businesses Can Realistically Expect",
      groups: [
        { heading: "A Clearer Lead Process", paragraphs: ["The team can use agreed stages, ownership rules and follow-up tasks instead of relying only on memory."] },
        { heading: "Better Shared Visibility", paragraphs: ["Authorised users can review lead status, customer context and due work when records are kept updated."] },
        { heading: "More Consistent Handover", paragraphs: ["Lead notes and responsibilities can remain available when another team member needs to continue the conversation."] },
        { heading: "Useful Sales Reporting", paragraphs: ["The business can review lead sources, stage movement, overdue work and recorded outcomes within the limits of the available data."] },
        { heading: "No Guaranteed Revenue", paragraphs: ["A CRM cannot guarantee sales, customers, revenue or conversion rates. Outcomes also depend on lead quality, the offer, team response, customer decisions and how consistently the process is used."] },
        { heading: "Adoption Is Part of Implementation", paragraphs: ["A technically correct setup will not remain useful if the team does not update records, complete tasks or follow the agreed process."] },
      ],
    },
    {
      presentation: "audit",
      heading: "What Happens During the Free CRM Process Audit?",
      paragraphs: ["The audit identifies where leads, ownership and follow-up currently break down before a platform or implementation scope is recommended."],
      groups: [
        { heading: "Lead Source Review", paragraphs: ["We identify where enquiries arrive and how they are currently recorded, assigned and followed up."] },
        { heading: "Sales Process Review", paragraphs: ["We map the main stages, responsibilities, common delays and information needed during customer conversations."] },
        { heading: "Tools and Integration Check", paragraphs: ["We review the existing website, forms, CRM or spreadsheets and the connections that may be relevant to the proposed scope."] },
        { heading: "Priority Implementation Plan", paragraphs: ["We organise recommendations into the process, platform, setup and adoption actions that should come first."] },
      ],
    },
    {
      presentation: "list",
      heading: "Why Businesses Work With DigiUdyam for CRM",
      groups: [
        { heading: "Sales Process Before Software Features", paragraphs: ["We start with how the business receives, qualifies and follows up with leads before configuring the tool."] },
        { heading: "Practical Scope for Small Teams", paragraphs: ["We prioritise fields, stages and workflows the team can maintain instead of adding unnecessary complexity."] },
        { heading: "Connected Lead Sources", paragraphs: ["Where supported, the CRM can connect with the website, marketing activity and agreed communication workflows."] },
        { heading: "Clear Ownership and Permissions", paragraphs: ["The setup defines who is responsible for work and who should be allowed to access customer information."] },
        { heading: "Implementation Without Vendor Claims", paragraphs: ["DigiUdyam helps assess, configure and connect suitable CRM tools. We do not present ourselves as the owner of a proprietary CRM product."] },
      ],
    },
  ],
  faqs: [
    { q: "What is a CRM solution?", a: "A CRM solution combines a suitable customer relationship management tool with an agreed process for capturing leads, maintaining customer records, assigning ownership, managing pipeline stages, completing follow-ups and reviewing sales activity." },
    { q: "Is DigiUdyam a CRM software company?", a: "No. DigiUdyam is a digital growth and implementation partner. We help businesses understand requirements, select or work with suitable CRM tools, configure the sales process and connect relevant lead sources. Software is supplied by the selected platform provider." },
    { q: "How can CRM help a small business?", a: "CRM can give a small business one structured place to manage leads, customer context, ownership, follow-up tasks and pipeline stages. Its value depends on choosing a practical setup and using it consistently." },
    { q: "Can CRM capture leads from WhatsApp, calls and spreadsheets?", a: "The approach depends on the tools and access available. Website forms and supported campaign sources may connect directly. WhatsApp integrations may require approved services, while calls, walk-ins or spreadsheet records may need an agreed manual or import process. The connection is confirmed before implementation." },
    { q: "Can CRM connect with our website?", a: "Yes, when the website, form and selected CRM support the connection. A form can create a lead record with agreed information and source context. The setup should be tested so enquiries are not lost or duplicated." },
    { q: "Can CRM connect with digital marketing campaigns?", a: "Supported campaign forms or landing pages can pass enquiries into a CRM with source information. This helps the business organise follow-up and review recorded outcomes, but reliable reporting still depends on correct tracking and team updates." },
    { q: "What is a CRM sales pipeline?", a: "A CRM sales pipeline is a set of stages used to show where an enquiry or opportunity is in the sales process. The stages should match the real business workflow, such as new, contacted, qualified, proposal, decision, won or lost, rather than copying a generic template." },
    { q: "How is CRM different from Business Automation?", a: "CRM Solutions organise sales operations through lead records, stages, ownership, follow-up and visibility. Business Automation reduces repetitive manual work using workflows and integrations. Automation can support a CRM process, but it can also apply to work outside sales." },
    { q: "Can CRM automate follow-ups?", a: "Some CRM platforms and integrations can create reminders, tasks or approved messages based on agreed rules. Automation should be used carefully, respect platform and communication requirements and provide a clear path to human follow-up." },
    { q: "How long does CRM implementation take?", a: "The timeline depends on process complexity, number of users, data condition, integrations, platform access, testing and team availability. A simple setup may require fewer steps than a multi-team implementation. DigiUdyam confirms the scope before giving a timeline." },
    { q: "Do you migrate existing spreadsheet or CRM data?", a: "Data import or migration can be included after the source records, fields, duplicates, permissions and destination platform are reviewed. It is not assumed in every setup because poor-quality or sensitive data may require preparation and approval." },
    { q: "Who owns the CRM account and customer data?", a: "The business should retain ownership of its CRM account and control user access. DigiUdyam should receive only the access required for the agreed implementation. Data handling and platform terms should be reviewed before sensitive information is imported." },
    { q: "Can CRM guarantee more sales or revenue?", a: "No. A CRM can support organisation, follow-up and visibility, but it cannot guarantee sales, revenue or conversion rates. Results also depend on lead quality, the offer, team response, customer decisions and consistent use." },
    { q: "How much does CRM setup cost in India?", a: "Cost depends on the CRM platform, number of users, pipelines, integrations, data migration, automation, training and post-launch support. Software subscriptions and third-party fees are normally separate unless an agreed proposal states otherwise." },
    { q: "What information is needed for a free CRM audit?", a: "Useful inputs include:", items: ["Business name and website", "Main enquiry sources", "Approximate team size", "Current lead tracking method", "Existing CRM or spreadsheet, if any", "Typical sales stages", "Follow-up responsibilities", "Required website or campaign connections", "Data migration needs", "Main lead-management problem"] },
  ],
  finalCta: {
    eyebrow: "CRM process audit",
    heading: "Give Every Lead a Clear Next Step",
    paragraphs: [
      "You do not need to choose complicated software before understanding the sales process your team needs.",
      "Share your current lead sources, follow-up method and team responsibilities with DigiUdyam. We can identify the gaps and explain which process, CRM setup and integration priorities should come first.",
      "After the audit, you receive a prioritised CRM implementation plan covering lead capture, pipeline stages, ownership, follow-up and relevant connections.",
    ],
    subheading: "Share Your Lead Process",
    fields: ["Your name", "Business name", "Phone number", "Email address", "Website, if available", "Main lead sources", "Sales team size", "Current tracking method", "Existing CRM, if any", "Main follow-up problem"],
    primaryCta: { label: "Get a Free CRM Process Audit", href: "/free-audit" },
    secondaryCta: { label: "Discuss CRM Solutions", href: "/contact" },
    contactText: ["You can also ", { text: "contact DigiUdyam", href: "/contact" }, " to discuss your lead-management and CRM requirements."],
  },
};

const businessAutomation: ServiceMoneyPage = {
  metadata: {
    title: "Business Automation Services India for Small Businesses",
    description: "Business automation services for Indian MSMEs and small businesses. Improve repeatable workflows, notifications, integrations and operational handovers.",
    ogTitle: "Business Automation for Indian MSMEs and Small Businesses",
    ogDescription: "Reduce repetitive manual work with practical workflows, notifications, system connections and human-controlled automation from DigiUdyam.",
    imageAlt: "Indian small business team reviewing connected workflows, notifications and operational tasks",
  },
  hero: {
    heading: "Business Automation Services for Indian MSMEs and Small Businesses",
    paragraphs: [
      "Business automation helps repeatable work move through a clear sequence. A form submission can create an internal task, a due date can trigger a reminder, or information from one approved tool can be passed to another without a team member entering it again.",
      "DigiUdyam helps Indian MSMEs and small businesses improve workflows, notifications, integrations and operational handovers. Automation is used to support people with consistent processes—not to replace employees, remove judgement or automate work that still needs human review.",
    ],
    primaryCta: { label: "Get a Free Automation Audit", href: "/free-audit" },
    secondaryCta: { label: "See What Can Be Automated", href: "#automation-opportunities" },
    needsHeading: "What is slowing the workflow?",
    needs: [
      "Reduce repetitive manual steps",
      "Improve reminders and notifications",
      "Connect information between tools",
      "Make internal handovers more consistent",
    ],
  },
  sections: [
    {
      presentation: "list",
      heading: "Repeated Manual Work Creates Avoidable Gaps",
      paragraphs: [
        "A process may work when one person remembers every step. As enquiries, customers or team members increase, the same process can become slow and inconsistent.",
        "Common problems include:",
      ],
      groups: [
        { heading: "Repetitive Manual Tasks", paragraphs: ["Team members may copy the same information, create the same task or send the same operational update many times."] },
        { heading: "Missed Reminders", paragraphs: ["Follow-ups, appointments, approvals or internal deadlines may depend on personal memory and separate calendars."] },
        { heading: "Information Across Different Tools", paragraphs: ["Forms, spreadsheets, CRM records, inboxes and messaging tools may hold different parts of the same process."] },
        { heading: "Slow Internal Handovers", paragraphs: ["The next person may not receive the right context, notification or task when work moves between teams."] },
        { heading: "Inconsistent Processes", paragraphs: ["The same customer or operational request may be handled differently depending on who notices it first."] },
      ],
    },
    {
      id: "automation-opportunities",
      heading: "What Business Automation Can Help With",
      paragraphs: ["A useful automation has a clear starting event, agreed rules, defined actions and an owner who can review exceptions."],
      groups: [
        { heading: "Workflow Automation", paragraphs: ["Move a repeatable process through agreed steps when a form, status, date or approved system event starts the workflow."] },
        { heading: "Notifications and Reminders", paragraphs: ["Notify the responsible person about new work, due actions, approvals, exceptions or status changes through supported channels."] },
        { heading: "Lead Routing", paragraphs: ["Send an enquiry to the correct owner, team or pipeline based on clear information and rules where the connected tools allow it."] },
        { heading: "Follow-Up Support", paragraphs: ["Create tasks, reminders or approved customer acknowledgements without removing the need for a real conversation when judgement is required."] },
        { heading: "Form and Process Integrations", paragraphs: ["Pass agreed information from website forms or internal forms into a CRM, spreadsheet, task system or notification workflow."] },
        { heading: "CRM-Connected Workflows", paragraphs: ["Use lead stages, ownership or dates to support internal tasks and communication while keeping the CRM as the sales record."] },
        { heading: "Operational Improvements", paragraphs: ["Standardise repeatable handovers, approvals and status updates that currently depend on manual copying or personal memory."] },
      ],
    },
    {
      presentation: "list",
      heading: "Realistic Automation Examples",
      paragraphs: ["The exact workflow depends on the tools, permissions, business rules and communication requirements. Practical examples may include:"],
      groups: [
        { heading: "New Website Enquiry", paragraphs: ["A submitted form creates a lead or task, records the source and notifies the responsible person. The sales team still reviews and responds to the enquiry."] },
        { heading: "Appointment Reminder", paragraphs: ["An upcoming appointment creates an internal reminder or sends an approved customer notification through a supported channel, with a process for changes or cancellations."] },
        { heading: "Lead Assignment", paragraphs: ["A new lead is routed using agreed criteria such as service, location or team responsibility, while unclear cases are sent for human review."] },
        { heading: "Sales-to-Onboarding Handover", paragraphs: ["When an authorised user marks a deal ready, the workflow creates onboarding tasks and notifies the delivery owner with agreed customer context."] },
        { heading: "Approval Workflow", paragraphs: ["A request is sent to the correct reviewer and the next action occurs only after an approval or rejection is recorded."] },
        { heading: "Internal Status Notification", paragraphs: ["A team member is notified when a task becomes overdue, an integration fails or an important status changes."] },
      ],
    },
    {
      heading: "Business Automation Deliverables",
      paragraphs: ["The deliverables depend on the process, connected tools, data sensitivity and level of custom work required. An agreed scope may include:"],
      items: [
        "Current workflow and bottleneck audit",
        "Automation opportunity and risk review",
        "Trigger, rule, action and owner definition",
        "Workflow diagram or implementation plan",
        "Notification and reminder setup",
        "Lead routing or task assignment configuration",
        "Form, CRM or supported tool integrations",
        "Approval or human-review steps where required",
        "Field mapping and data-movement rules",
        "Error alerts and exception handling",
        "Testing with agreed scenarios",
        "Handover documentation and team guidance",
        "Post-launch monitoring priorities",
      ],
      groups: [{ heading: "", paragraphs: ["Not every workflow should be automated. DigiUdyam may recommend simplifying the manual process first, keeping a human approval step or leaving high-risk decisions outside the automation."] }],
      cta: { label: "Request a Business Automation Audit", href: "/free-audit" },
    },
    {
      presentation: "list",
      heading: "Who Business Automation Is For",
      paragraphs: ["Automation may be useful when a repeatable process has clear rules, happens often enough to justify setup and has an owner who can monitor it."],
      groups: [
        { heading: "Owner-Led Small Businesses", paragraphs: ["Reduce repeated admin steps without losing visibility or control over customer and operational decisions."] },
        { heading: "Growing Teams", paragraphs: ["Create more consistent assignments, notifications and handovers as work moves between people or departments."] },
        { heading: "Clinics and Appointment Businesses", paragraphs: ["Support appointment acknowledgements, reminders and internal tasks without automating medical decisions or storing sensitive information in unsuitable tools."] },
        { heading: "Real Estate Businesses", paragraphs: ["Route project enquiries, create site-visit tasks and support agreed follow-up reminders while salespeople manage the customer conversation."] },
        { heading: "Education and Coaching Businesses", paragraphs: ["Connect enquiry forms, counselling tasks, session reminders and admission handovers using approved customer information."] },
        { heading: "Professional Services", paragraphs: ["Route consultation requests, request internal approvals and create delivery handover tasks while keeping professional judgement with the team."] },
        { heading: "Businesses Using Several Tools", paragraphs: ["Reduce approved data re-entry and missed updates where the existing systems provide suitable integration options."] },
      ],
    },
    {
      presentation: "timeline",
      heading: "Our Business Automation Implementation Process",
      paragraphs: ["Automation begins with understanding the manual process. Tools are connected only after the trigger, rules, actions, exceptions and responsible people are clear."],
      groups: [
        { heading: "1. Map the Current Workflow", paragraphs: ["We document how work starts, which information is used, who makes decisions and where delays or repeated steps occur."] },
        { heading: "2. Select a Suitable Automation Opportunity", paragraphs: ["We prioritise repeatable, rule-based work and identify steps that still require approval, judgement or direct customer communication."] },
        { heading: "3. Confirm Tools, Access and Costs", paragraphs: ["We review existing systems, available integrations, permissions, account plans, data requirements and any third-party costs."] },
        { heading: "4. Design the Workflow and Exceptions", paragraphs: ["We define the starting event, conditions, actions, notifications, ownership and what should happen when information is missing or a step fails."] },
        { heading: "5. Build and Test", paragraphs: ["We configure the agreed workflow and test normal, incorrect and incomplete scenarios before relying on it for live work."] },
        { heading: "6. Launch, Monitor and Adjust", paragraphs: ["The team receives handover guidance, checks early workflow runs and adjusts rules when real use reveals a valid process change."] },
      ],
    },
    {
      presentation: "comparison",
      heading: "CRM Solutions and Business Automation Have Different Roles",
      paragraphs: ["A CRM can be part of an automation workflow, but organising sales records is different from automating repeatable work across systems."],
      groups: [
        {
          heading: "CRM Solutions",
          paragraphs: [["CRM Solutions organise leads, customer records, ownership, follow-up tasks, pipeline stages and sales visibility. Explore DigiUdyam’s ", { text: "CRM Solutions", href: "/services/crm-solutions" }, "."]],
          items: ["Lead and customer organisation", "Sales pipeline", "Ownership and follow-up", "Customer conversation context", "Sales visibility"],
        },
        {
          heading: "Business Automation",
          paragraphs: ["Business Automation uses triggers, rules, actions, notifications and integrations to move repeatable work between people and tools more consistently."],
          items: ["Repeatable workflow steps", "Notifications and reminders", "Data movement", "System integrations", "Operational handovers and approvals"],
        },
      ],
    },
    {
      presentation: "list",
      heading: "People Remain Responsible for the Process",
      groups: [
        { heading: "Automation Supports the Team", paragraphs: ["The purpose is to reduce repeated admin work and improve consistency so people can focus on conversations, decisions and exceptions."] },
        { heading: "Approvals Stay With People", paragraphs: ["Financial, legal, medical, contractual or other sensitive actions should retain suitable human approval and professional oversight."] },
        { heading: "Customer Communication Needs Boundaries", paragraphs: [["Acknowledgements and reminders should use approved wording, permitted channels and a clear route to a person. Businesses needing a focused messaging setup can explore ", { text: "WhatsApp Automation", href: "/services/whatsapp-automation" }, "."]] },
        { heading: "Errors Need an Owner", paragraphs: ["A workflow should identify who monitors failures, missing information, expired access and unexpected results."] },
        { heading: "Processes Still Change", paragraphs: ["When the business changes a service, team responsibility or system, the workflow may need to be reviewed rather than left running without supervision."] },
      ],
    },
    {
      presentation: "list",
      heading: "Client Responsibilities and Separate Tool Costs",
      groups: [
        { heading: "Accurate Process Information", paragraphs: ["The client explains the real workflow, business rules, exceptions, owners and approvals so the automation does not reproduce an unclear process."] },
        { heading: "Access and Permissions", paragraphs: ["The client provides appropriate access to agreed tools and approves which information may move between systems. Account ownership should remain with the business."] },
        { heading: "Testing and Approval", paragraphs: ["The client tests realistic scenarios, confirms outputs and approves the workflow before it becomes part of live operations."] },
        { heading: "Ongoing Monitoring", paragraphs: ["The business assigns an owner to review alerts, process changes and important workflow outcomes after launch."] },
        { heading: "Costs Confirmed Separately", paragraphs: ["Software subscriptions, messaging charges, paid connectors, API usage and major custom development outside the agreed scope are separate costs unless the proposal states otherwise."] },
      ],
    },
    {
      presentation: "list",
      heading: "What Businesses Can Realistically Expect",
      groups: [
        { heading: "A More Consistent Workflow", paragraphs: ["Repeatable steps can follow agreed rules when the required information and connected tools are available."] },
        { heading: "Clearer Notifications and Ownership", paragraphs: ["The right person can receive an agreed task or alert when a known workflow event occurs."] },
        { heading: "Less Approved Data Re-Entry", paragraphs: ["Supported tools can pass agreed information between systems, reducing some manual copying without assuming every record is error-free."] },
        { heading: "Better Exception Visibility", paragraphs: ["Error alerts and human-review steps can make failed or unclear workflow cases easier to identify."] },
        { heading: "No Guaranteed Savings", paragraphs: ["DigiUdyam does not guarantee a specific number of hours, cost reduction, revenue increase or productivity result. Outcomes depend on workflow volume, process quality, tool reliability and team adoption."] },
        { heading: "Automation Requires Maintenance", paragraphs: ["Passwords, permissions, APIs, platform features and business rules can change. Important workflows need an owner and periodic review."] },
      ],
    },
    {
      presentation: "audit",
      heading: "What Happens During the Free Automation Audit?",
      paragraphs: ["The audit identifies one or more realistic workflow opportunities before tools or integrations are recommended."],
      groups: [
        { heading: "Workflow Review", paragraphs: ["We examine the repeated task, starting event, information used, people involved, current tools and common delays."] },
        { heading: "Automation Suitability Check", paragraphs: ["We separate rule-based steps from decisions, approvals and customer conversations that still require people."] },
        { heading: "Tool and Risk Check", paragraphs: ["We review available connections, access, data movement, potential failure points and likely software or messaging costs."] },
        { heading: "Priority Automation Plan", paragraphs: ["We explain what can be simplified, connected or automated first, what should remain manual and what needs testing or approval."] },
      ],
    },
    {
      presentation: "list",
      heading: "Why Businesses Work With DigiUdyam for Automation",
      groups: [
        { heading: "Process Before Tools", paragraphs: ["We understand the workflow and responsibility before selecting automation software or integrations."] },
        { heading: "Practical Workflows for Small Teams", paragraphs: ["We focus on repeatable work that solves a clear operational problem rather than adding technology without a useful purpose."] },
        { heading: "Human-Controlled Automation", paragraphs: ["We include approvals, ownership and escalation where a person should remain responsible for the decision."] },
        { heading: "Connected Digital Systems", paragraphs: [["Automation can connect the business website, forms, CRM and agreed communication tools. Explore how a ", { text: "business website", href: "/services/website-development" }, " can support structured enquiry capture."]] },
        { heading: "Clear Scope and Limitations", paragraphs: ["We explain tool dependencies, separate costs, failure risks and maintenance requirements before the workflow becomes operational."] },
      ],
    },
  ],
  faqs: [
    { q: "What is business automation?", a: "Business automation uses agreed triggers, rules, actions and system connections to support repeatable work such as creating tasks, routing information, sending notifications or moving approved data between tools." },
    { q: "Is business automation suitable for a small business?", a: "It can be suitable when a process is repeated frequently, follows clear rules and has an owner who can review exceptions. A small business should automate a useful workflow rather than buying a complex system before the process is understood." },
    { q: "Will automation replace our employees?", a: "No. DigiUdyam positions automation as support for repetitive administrative steps, notifications and data movement. People remain responsible for customer relationships, judgement, approvals, exceptions and sensitive decisions." },
    { q: "What business tasks can be automated?", a: "Possible tasks include form routing, internal notifications, task creation, reminders, approved acknowledgements, status updates, data transfer and approval requests. Suitability depends on the tools, process, information and risks involved." },
    { q: "How is Business Automation different from CRM Solutions?", a: "CRM Solutions organise leads, customer records, ownership, follow-up and sales stages. Business Automation moves repeatable work through triggers, actions, notifications and integrations. A CRM can start or receive automation workflows, but the services have different primary roles." },
    { q: "Can automation connect with our CRM?", a: "Yes, when the CRM and other tools provide suitable integrations or APIs. A workflow may create tasks, route leads, send internal alerts or move approved information based on CRM events. The available connection depends on platform plans and permissions." },
    { q: "Can you automate WhatsApp follow-ups?", a: "Approved WhatsApp workflows may be possible through appropriate business messaging tools and permissions. The scope can include acknowledgements, reminders or routing, but should follow platform requirements, customer communication rules and human-handover boundaries." },
    { q: "Can website forms start an automation?", a: "Yes, when the website form and connected tools support it. A submission may create a record, task or notification and pass agreed information to the responsible system. Testing should confirm that incomplete, duplicate and failed submissions are handled appropriately." },
    { q: "Do automation workflows need human approval?", a: "Some do. Sensitive, financial, legal, medical, contractual or high-impact actions should retain appropriate human review. Approval steps may also be useful when information is incomplete or a workflow reaches an exception." },
    { q: "What happens when an automation fails?", a: "A responsible workflow should provide error alerts, logs or an exception path where the selected tools support them. The business also needs an owner who can investigate failures and complete important work manually when required." },
    { q: "How long does automation implementation take?", a: "The timeline depends on process complexity, number of systems, available integrations, permissions, data mapping, testing and approval requirements. DigiUdyam confirms the workflow and dependencies before providing a timeline." },
    { q: "Does business automation require new software?", a: "Not always. Existing tools may already support useful workflows, while other requirements may need a connector, messaging service, upgraded plan or custom integration. Options and costs should be reviewed before implementation." },
    { q: "Who owns the automation accounts and data?", a: "The business should retain ownership of its software accounts and control permissions. DigiUdyam should receive only the access required for the agreed work. The client approves what data may move between tools." },
    { q: "Can automation guarantee time or cost savings?", a: "No. DigiUdyam does not guarantee a specific number of hours, cost reduction, productivity result or revenue outcome. Results depend on process volume, workflow design, tool reliability, team adoption and ongoing maintenance." },
    { q: "How much do business automation services cost in India?", a: "Cost depends on the number of workflows, connected systems, tool plans, messaging usage, custom development, testing and ongoing support. Software subscriptions, paid connectors, API usage and messaging charges are normally separate unless stated in the proposal." },
    { q: "What information is needed for a free automation audit?", a: "Useful inputs include:", items: ["Business name and website", "The repeated task or process", "How often it occurs", "People and teams involved", "Current tools or spreadsheets", "Information moved between steps", "Required notifications or approvals", "Common delays or errors", "Sensitive data involved", "Desired operational outcome"] },
  ],
  finalCta: {
    eyebrow: "Business automation audit",
    heading: "Start With One Useful Workflow",
    paragraphs: [
      "You do not need to automate the entire business at once.",
      "Share one repeated task, missed handover or disconnected process with DigiUdyam. We can review the steps, tools, risks and human responsibilities before recommending an automation.",
      "After the audit, you receive a prioritised workflow plan explaining what can be automated, what should remain manual, which tools may be required and how the workflow should be tested and monitored.",
    ],
    subheading: "Share Your Workflow",
    fields: ["Your name", "Business name", "Phone number", "Email address", "Website, if available", "Repeated task or process", "Current tools", "People involved", "Main delay or error", "Desired workflow outcome"],
    primaryCta: { label: "Get a Free Automation Audit", href: "/free-audit" },
    secondaryCta: { label: "Discuss Business Automation", href: "/contact" },
    contactText: ["You can also ", { text: "contact DigiUdyam", href: "/contact" }, " to discuss your workflow and integration requirements."],
  },
};

export const serviceMoneyPageMap: Record<string, ServiceMoneyPage> = {
  "web-development": websiteDevelopment,
  "local-seo": localSeo,
  "google-business-profile": googleBusinessProfile,
  "digital-marketing": digitalMarketing,
  crm: crmSolutions,
  automation: businessAutomation,
};
