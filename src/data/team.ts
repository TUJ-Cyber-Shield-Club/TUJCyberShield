import type { ImageMetadata } from 'astro';

// ─────────────────────────────────────────────────────────────────────────────
// EDIT ME: the club team shown on the "Meet the team" page.
//
// To update a member:
//   1. Drop a real square photo into  src/assets/team/  (e.g. ruoan-li.jpg).
//   2. Import it below and set it as that member's `avatar`.
//   3. Replace "Insert bio here" with a real bio. Add or remove members freely.
// The order here is the order they appear on the page.
// Current avatars are placeholder initials. Swap in real photos when ready.
// ─────────────────────────────────────────────────────────────────────────────

import carlMasters from '../assets/team/carl-masters.png';
import ruoanLi from '../assets/team/ruoan-li.png';
import uchidaTerence from '../assets/team/uchida-terence.png';
import bhushithGujjalaHari from '../assets/team/bhushith-gujjala-hari.png';

// A circular icon button under a member's bio. `type` picks the brand logo
// (see the ICONS map in src/components/SocialIcons.astro for supported types:
// email, github, linkedin, instagram, x, website). For email, use a
// mailto: href, e.g. "mailto:you@example.com".
export interface SocialLink {
  type: 'email' | 'github' | 'linkedin' | 'instagram' | 'x' | 'website';
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: ImageMetadata;
  links?: SocialLink[];
}

export const team: TeamMember[] = [
  {
    name: 'Carl Masters',
    role: 'Club President',
    bio: "Hello! I'm Carl Masters, a second-year cybersecurity major at TUJ and founder of the Cyber Shield club. I'm passionate about digital security, the responsible development of AI, and hackathons and tech events across Tokyo. Feel free to connect with me via email or LinkedIn, or check out my portfolio below!",
    avatar: carlMasters,
    links: [
      { type: 'email', href: 'mailto:carl.masters.professional@protonmail.com' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/carl-masters-724951297/' },
      { type: 'github', href: 'https://github.com/carlmasters02' },
      { type: 'website', href: 'https://carlmasters.com' },
    ],
  },
  {
    name: 'Ruoan Li',
    role: 'Vice President',
    bio: "I'm Ruoan, a second-year Computer Science major. I'm passionate about coding and understanding how secure systems work. Always down to chat about CS projects or collaborate on tech challenges!",
    avatar: ruoanLi,
    links: [
      { type: 'email', href: 'mailto:ruoanli.an@gmail.com' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/ruoan-li' },
      { type: 'github', href: 'https://github.com/RuoanLi' },
    ],
  },
  {
    name: 'Uchida Terence',
    role: 'Researcher',
    bio: "Hi, Terence here, a third year Computer Science major at TUJ. Currently, doing an intern at a HK startup and working part-time at Brandy Melville.",
    avatar: uchidaTerence,
    links: [
      { type: 'email', href: 'mailto:uchidaterence@gmail.com' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/terence-win-5b212b2b7/' },
    ],
  },
  {
    name: 'Bhushith Gujjala Hari',
    role: 'Writer',
    bio: "Hello, I'm a passionate computer science student who is interested in Machine Learning and Game Development. I am also the leader of the CS Society and help organize hackathons and other events. I am currently in my fourth year Computer Science major with experience from multiple solo projects, 2 research projects in Machine Learning, and two internships. Outside of work and University, I love to make pixel art and code games as a hobby.",
    avatar: bhushithGujjalaHari,
    links: [
      { type: 'linkedin', href: 'https://www.linkedin.com/in/bhushith-gujjala-hari-9a5876276' },
      { type: 'github', href: 'https://github.com/teddyboy999' },
    ],
  },
];
