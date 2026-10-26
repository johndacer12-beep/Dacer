export const profile = {
  name: 'John Paul Dacer',
  tagline: 'I am a fourth year BSIT student who likes building websites.',
  location: 'Digos City, Davao del Sur, Philippines',
  email: 'johndacer12@gmail.com',
  github: 'https://github.com/johndacer12-beep',
  linkedin: 'https://www.linkedin.com/in/john-paul-dacer-5750b1447/',
  role: 'BSIT student',
  intro: 'I am building my skills as a front-end developer.',
  philosophy: 'I like to build websites that are clean, easy to use, and use animation to help people explore.',
  bio: [
    "I'm John Paul Dacer, a fourth year BSIT student. I like building websites with React and making them easy to use.",
    "I'm learning React and GSAP animations. I'm based in Digos City, Davao del Sur.",
  ],
}

// Replace repo/demo/shot with your real Q1 project links and screenshots.
// A link is only rendered when its value is filled in, so nothing breaks.
// Screenshots go in /public/screenshots (e.g. shot: '/screenshots/kuma.png').
export const projects = [
  {
    slug: 'kengo-kuma',
    title: 'Kengo Kuma study',
    description: 'An editorial concept for an architecture studio, built around slow scroll reveals and large type.',
    tech: ['React', 'GSAP', 'ScrollTrigger'],
    year: 2025,
    shot: '',
    repo: '',
    demo: '',
  },
  {
    slug: 'jacquemus',
    title: 'Jacquemus front-end study',
    description: 'A fashion landing page exploring image-led layouts and restrained page transitions.',
    tech: ['React', 'GSAP', 'CSS'],
    year: 2025,
    shot: '',
    repo: '',
    demo: '',
  },
  {
    slug: 'fyconic',
    title: 'Fyconic animation lab',
    description: 'An R&D playground testing text splitting, timelines and lightweight WebGL effects.',
    tech: ['React', 'GSAP', 'WebGL'],
    year: 2025,
    shot: '',
    repo: '',
    demo: '',
  },
]

export const expertise = [
  { id: 'A.01', title: 'React', text: "I'm learning to build websites with React." },
  { id: 'A.02', title: 'GSAP', text: "I'm learning to add helpful animations with GSAP." },
  { id: 'A.03', title: 'Responsive CSS', text: 'I use responsive CSS so websites work on different screens.' },
  { id: 'A.04', title: 'Clean components', text: "I'm learning to organize websites into clean components." },
]

export const categories = [
  { slug: 'myproject', title: 'MyProject', subtitle: 'Selected digital work', description: 'Three Figma prototypes I designed.', year: 2025, accent: '#4a9fb0', items: [
    { title: 'HomeFix', caption: 'A design for finding and booking home services.', image: '/homefix.png', link: 'https://www.figma.com/design/AKs3VXK9evVND92I2SF8qn/Venture?node-id=0-1&t=GKIS7Oc8fRBG7qd1-1' },
    { title: 'Login', caption: 'A simple sign-in screen for a digital product.', image: '/login.avif', link: 'https://www.figma.com/proto/AKs3VXK9evVND92I2SF8qn/Venture?node-id=2030-33&starting-point-node-id=2023%3A23&t=5XOhAM2kjGQpNIwV-1' },
    { title: 'Traveler', caption: 'A booking flow for people planning a trip.', image: '/traveler.jpg', link: 'https://www.figma.com/design/fggbsRpqyUsvtBv4xdTLlb/Untitled?node-id=0-1&t=8HZc8e1uQcVWGymQ-1' },
  ] },
  { slug: 'gallery', title: 'Gallery', subtitle: 'A visual collection', description: 'Experiments in composition, color and type, gathered from recent interface studies.', year: 2025, accent: '#8b5cf6', items: [
    { title: 'Afterglow', caption: 'Soft color fields meet a precise modular grid.', image: '/862976473_2236098727122303_4683395178389986682_n.jpg', imageAlt: 'John Paul Dacer standing with his arms crossed.' },
    { title: 'Concrete forms', caption: 'Architectural shapes reduced to light and shadow.', image: '/865409362_989179663679353_6028990939532276934_n.jpg', imageAlt: 'John Paul Dacer wearing glasses and standing with his arms crossed.' },
    { title: 'Violet hour', caption: 'A study of contrast and saturated color in dark interfaces.', image: '/865646873_2124789258126029_8493743998445125240_n.jpg', imageAlt: 'John Paul Dacer wearing glasses and standing with his arms crossed.' },
    { title: 'Quiet geometry', caption: 'Simple shapes arranged with generous negative space.', image: '/JpImage.jpg', imageAlt: 'John Paul Dacer resting his hand on his chin.', imagePosition: 'center 30%' },
  ] },
  { slug: 'certificates', title: 'Certificates', subtitle: 'Cisco Networking Academy', description: 'Five certificates from my cybersecurity and networking courses.', year: 2025, accent: '#22c55e', items: [
    { title: 'Cyber Threat Management', caption: 'Cisco Networking Academy certificate.', image: null, pdf: '/Cyber_Threat_Management_certificate_johndacer-g-cjc-edu-ph_cb9af58f-79bc-4c83-8f62-280b9ea8affc.pdf' },
    { title: 'Endpoint Security', caption: 'Cisco Networking Academy certificate.', image: null, pdf: '/Endpoint_Security_certificate_johndacer-g-cjc-edu-ph_79a58e40-e16d-489c-9a4c-68c8594d8f4b.pdf' },
    { title: 'Introduction to Cybersecurity', caption: 'Cisco Networking Academy certificate.', image: null, pdf: '/Introduction_to_Cybersecurity_certificate_johndacer-g-cjc-edu-ph_db74cc5d-9493-4bce-bf46-65ef878280dd.pdf' },
    { title: 'Networking Devices and Initial Configuration', caption: 'Cisco Networking Academy certificate.', image: null, pdf: '/Networking_Devices_and_Initial_Configuration_certificate_johndacer-g-cjc-edu-ph_5b5d2611-6933-48ed-94f9-74b11e1faa66.pdf' },
    { title: 'Network Defense', caption: 'Cisco Networking Academy certificate.', image: null, pdf: '/Network_Defense_certificate_johndacer-g-cjc-edu-ph_bb8d2427-1e66-45af-87c1-4c616aeecd88.pdf' },
  ] },
]
