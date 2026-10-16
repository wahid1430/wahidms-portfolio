# Wahid M S — AI/ML Developer Portfolio

A responsive static portfolio built with HTML, CSS, and vanilla JavaScript. The visual theme uses creamy white, warm orange, soft glass surfaces, and subtle holographic/3D details.

## Files
- `index.html` — portfolio content and interactive widgets
- `style.css` — responsive design, animations, cards, assistant and terminal styling
- `script.js` — typing hero, scroll navigation, 3D project cards, magnetic buttons, Maya demo assistant, and simulated developer terminal

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser. No build step or package installation is required.
3. For a local server, run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Before publishing
- Contact email is set to `wahidms001@gmail.com` in the contact button and Copy Email feature.
- To add your profile photo, put a JPG or PNG image named `profile.jpg` in the same folder as `index.html`, `style.css`, and `script.js`. The photo appears in the hero and sidebar. If the file is missing, the site shows the `WM` initials instead.
- Update the GitHub and LinkedIn links in the sidebar to your profiles.
- Replace project descriptions or add real repository links as needed.

## Interactions
- Animated role text and AI orb in the hero
- Responsive section navigation
- Hover tilt on project cards and magnetic buttons
- Maya Assistant with local, predefined portfolio answers (not connected to an external AI service)
- Developer terminal opened by the Terminal button or `Cmd/Ctrl + J`; supported commands include `help`, `about`, `projects`, `skills`, `services`, `contact`, `date`, `whoami`, and `clear`
- Copy-email button

The terminal is a safe simulated shell; it does not execute operating-system commands.


## Added interactive features

### Maya AI portfolio guide
- Use the floating **Maya AI** button or click the glowing hero orb to open the assistant.
- Ask about Wahid, featured projects, skills, services, or contact information.
- The current assistant uses local, rule-based portfolio replies in the browser; it does not require an API key and is not a cloud LLM. Voice or external AI integration can be added separately.

### 3D project holograms
- Project cards respond to pointer movement with a subtle 3D tilt.
- Click a card, or focus it and press Enter/Space, to open a project detail panel.
- The panel shows the project overview, focus, and technology tags. Select **Ask Maya about this project** to continue in the assistant.

## Run locally
1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Open `index.html` in a modern browser.
3. For a local web server, run `python3 -m http.server 8000` from the folder and visit `http://localhost:8000`.

The GitHub and LinkedIn sidebar links are placeholders; replace them with your real profile URLs before publishing.
