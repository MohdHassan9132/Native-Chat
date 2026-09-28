import {
  KajaAvatar,
  ImranAvatar,
  StellaAvatar,
  ShreeAvatar,
  JoyAvatar,
  RoseCarrAvatar,
  EttaMcDanielAvatar,
  LorettaRussellAvatar,
  AhmadSyarifAvatar,
  BettyPearsonAvatar,
} from "./avatars";

// "ring"/"check" colors map to existing brand tokens except "online", which
// reuses the same emerald-500/600 already established for presence dots on
// the Landing page (Hero.jsx) — see design-system skill: reuse existing
// patterns rather than inventing a new accent for the same meaning.
export const STORIES = [
  { id: "you", name: "You", self: true },
  { id: "kaja", name: "Kaja", ring: "coral", unread: 3, bg: "#FFE0BD", Avatar: KajaAvatar },
  { id: "imran", name: "Imran", ring: "cyan", unread: 6, bg: "#D7F5F5", Avatar: ImranAvatar },
  { id: "stella", name: "Stella", ring: "coral", unread: 1, bg: "#FFF1D6", Avatar: StellaAvatar },
  { id: "shree", name: "Shree", ring: "ink", bg: "#EAE8FE", Avatar: ShreeAvatar },
  { id: "joy", name: "Joy", ring: "cyan", bg: "#FFE5EE", Avatar: JoyAvatar },
];

export const FILTERS = ["All", "Favorites", "Work", "Groups", "Communities"];

export const CONVERSATIONS = [
  {
    id: "rose-carr",
    name: "Rose Carr",
    preview: "Project Dev mobile finished ...?",
    time: "06:32",
    check: "read",
    online: true,
    bg: "#FFEDE3",
    Avatar: RoseCarrAvatar,
  },
  {
    id: "etta-mcdaniel",
    name: "Etta McDaniel",
    preview: "I don't think I can join later in the afternoon there is an meeting",
    clamp: 2,
    time: "07:00",
    check: "sent",
    unread: 3,
    bg: "#DDF4F4",
    Avatar: EttaMcDanielAvatar,
  },
  {
    id: "loretta-russell",
    name: "Loretta Russell",
    preview: "Bro, will you be busy tonight?",
    time: "08:00",
    check: "sent",
    unread: 3,
    bg: "#FFE8E8",
    Avatar: LorettaRussellAvatar,
  },
  {
    id: "ahmad-syarif",
    name: "Ahmad Syarif",
    preview: "Wow, I don't know, sir, yesterday in the brief there's no info ..",
    clamp: 2,
    time: "Yesterday",
    check: "delivered",
    bg: "#FFF3DF",
    Avatar: AhmadSyarifAvatar,
  },
  {
    id: "betty-pearson",
    name: "Betty Pearson",
    preview: "Sir, I want a leave of absence next..",
    time: "12 Jun",
    check: "sent",
    online: true,
    bg: "#FFE7F0",
    Avatar: BettyPearsonAvatar,
  },
];
