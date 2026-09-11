// @fesfut/ui — sistema de diseño compartido "cancha nocturna".
// El tema (tokens + clases) se importa aparte:  @import "@fesfut/ui/theme.css";

// Marca
export { FesfutBall, FesfutLockup } from "./brand/fesfut-mark";
export { TeamCrest } from "./brand/team-crest";
export { PlayerAvatar } from "./brand/player-avatar";
export {
  crestPalette,
  avatarColors,
  monogram,
  personInitials,
  normalizeKey,
  hashSeed,
  type CrestPalette,
} from "./brand/identicon";

// Chrome del sitio
export { PitchBackdrop } from "./site/pitch-backdrop";
export { LocaleSwitcher } from "./site/locale-switcher";
export {
  SiteHeader,
  isNavGroup,
  type NavLink,
  type NavChild,
  type NavSubLink,
  type NavGroup,
} from "./site/site-header";
export { SiteFooter } from "./site/site-footer";
export { SponsorsStrip, type SponsorItem } from "./site/sponsors-strip";
