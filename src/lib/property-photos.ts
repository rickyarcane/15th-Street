/**
 * Central photo manifest for all property imagery.
 *
 * TO SWAP IN THE ENHANCED LISTING PHOTOS:
 * 1. Drop the files into `public/images/art-house/` (Unit B_enhanced),
 *    `public/images/hill-east/` (Unit A Listing Photos (Enhanced)), and
 *    `public/images/great-room.jpg` (hero).
 * 2. Replace the URLs below with local paths, e.g. "/images/art-house/01.jpg".
 * Nothing else on the site needs to change — every page reads from this file.
 */

// Hero — replace with the Great Room photo ("/images/great-room.jpg") once uploaded.
export const HERO_IMAGE =
  "https://images.homes.com/listings/210/3167689394-010294422/406-15th-st-se-washington-dc-unit-b-primaryphoto.jpg";

// The Art House (Unit B) — replace with the Unit B_enhanced set once uploaded.
export const ART_HOUSE_PHOTOS = [
  "https://images.homes.com/listings/210/3167689394-010294422/406-15th-st-se-washington-dc-unit-b-primaryphoto.jpg",
  "https://images.homes.com/listings/214/4167689394-010294422/406-15th-st-se-washington-dc-unit-b-buildingphoto-2.jpg",
  "https://images.homes.com/listings/117/6167689394-010294422/406-15th-st-se-washington-dc-unit-b-buildingphoto-3.jpg",
  "https://images.homes.com/listings/117/8167689394-010294422/406-15th-st-se-washington-dc-unit-b-buildingphoto-4.jpg",
];
// NOTE: current Art House images are sourced from homes.com — confirm usage
// rights before launch, or swap in the enhanced set above.

// Hill East Hide Away (Unit A) — populate with the
// "Unit A Listing Photos (Enhanced)" set once uploaded, e.g.:
//   export const HILL_EAST_PHOTOS = [
//     "/images/hill-east/01.jpg",
//     "/images/hill-east/02.jpg",
//   ];
export const HILL_EAST_PHOTOS: string[] = [];

export const ART_HOUSE_COVER = ART_HOUSE_PHOTOS[0];
export const HILL_EAST_COVER: string | undefined = HILL_EAST_PHOTOS[0];
