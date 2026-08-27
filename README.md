# Barakah Nikah Invitation

This repository contains the localized, customized, and recovered frontend assets for the Barakah Nikah Invitation website.

## Changes Made
- **Asset Recovery & Localization**: All HTML, CSS, JS, images, MP4, and MP3 files have been downloaded and rewritten to relative paths for local hosting. Google Fonts have been downloaded locally (`assets/fonts/*.woff2`) and imported into `styles.css`.
- **UI Cleanup**: The "Demo Version" badge, "Create Yours" CTA modal, and associated inline scripts have been completely removed.
- **Content Customization**: The couple's details, venue, and meta tags have been updated to reflect the new names (Zoya Khan & Shaikh Zaid) and event location (Noor Invites, Nagpur). Short names are handled intelligently to display without prefixes in specific areas.
- **Audio & Overlap Fixes**: The background music is configured to point to `./bismillah.mp3`. The background intro video (`.mp4`) explicitly ignores the unmuted property to avoid background music collision on mobile browsers.

## How to Deploy
1. Simply commit these files.
2. Ensure you have the `bismillah.mp3` placed in the root directory.
3. Push to your repository and link it to Vercel. Vercel will serve `index.html` seamlessly as a static site.
