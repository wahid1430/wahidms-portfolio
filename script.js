(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  $('#year').textContent = new Date().getFullYear();

  // Hero typing animation
  const phrases = ['AI / ML DEVELOPER', 'COMPUTER VISION ENTHUSIAST', 'PYTHON DEVELOPER', 'PROBLEM SOLVER', 'TECH EXPLORER'];
  const typing = $('#typingText'); let phraseIndex = 0, charIndex = phrases[0].length, deleting = false;
  function typeLoop() {
    const phrase = phrases[phraseIndex];
    if (deleting) { charIndex--; typing.textContent = phrase.slice(0, charIndex); }
    else { charIndex++; typing.textContent = phrase.slice(0, charIndex); }
    let delay = deleting ? 32 : 65;
    if (!deleting && charIndex >= phrase.length) { deleting = true; delay = 1500; }
    else if (deleting && charIndex <= 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
    window.setTimeout(typeLoop, delay);
  }
  window.setTimeout(typeLoop, 1600);

  // Scroll-aware navigation
  const navLinks = $$('.nav-link');
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55% 0px' });
  $$('main section[id]').forEach(section => sectionObserver.observe(section));

  // Magnetic cursor and subtle 3D project cards
  const glow = $('.cursor-glow');
  window.addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, { passive: true });
  $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2; const y = e.clientY - r.top - r.height / 2; el.style.transform = `translate(${x * .08}px, ${y * .12}px)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  $$('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', e => { if (matchMedia('(prefers-reduced-motion: reduce)').matches || e.pointerType === 'touch') return; const r = card.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height; card.style.transform = `perspective(850px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-.5)*6}deg) translateY(-3px)`; });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
  const orb = $('#aiOrb');
  const activateOrb = () => { orb.animate([{transform:'scale(1)'},{transform:'scale(1.09)'},{transform:'scale(1)'}], {duration:500,easing:'ease-out'}); openMaya(); };
  orb.addEventListener('click', activateOrb); orb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateOrb(); } });

  // Toast helper
  let toastTimer;
  function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600); }

  // Maya assistant: client-side portfolio Q&A, no API key needed
  const panel = $('#mayaPanel'), launcher = $('#mayaLauncher'), messages = $('#mayaMessages'), mayaInput = $('#mayaInput');
  function openMaya() { panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); setTimeout(() => mayaInput.focus(), 50); }
  function closeMaya() { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
  launcher.addEventListener('click', () => panel.hidden ? openMaya() : closeMaya()); $('#mayaClose').addEventListener('click', closeMaya);
  function addMessage(text, who) { const div = document.createElement('div'); div.className = `maya-message ${who}`; div.textContent = text; messages.appendChild(div); messages.scrollTop = messages.scrollHeight; }
  function mayaReply(question) {
    const q = question.toLowerCase();
    if (/helmet|guard/.test(q)) return 'HelmetGuard AI is a computer-vision project concept using YOLO, Python, and OpenCV to detect riders with and without helmets and support safer roads.';
    if (/weapon/.test(q)) return 'Weapon Detection AI explores object detection and visual alert workflows using computer vision and AI.';
    if (/food|smartfood/.test(q)) return 'SmartFood AI is a food-intelligence concept focused on helpful recommendations and AI-assisted decisions.';
    if (/accident|safety/.test(q)) return 'Accident Detection AI explores video-based incident detection to improve awareness and support quicker response.';
    if (/astra|assistant|maya/.test(q)) return 'Astra AI explores a personal assistant experience with natural interactions and desktop automation. You can also try me, Maya, right here!';
    if (/skill|technology|tech stack|tools/.test(q)) return 'Wahid works with Python, machine learning, YOLO, OpenCV, JavaScript, React, Flask, MongoDB, HTML/CSS, Git, Vite, and computer vision.';
    if (/service|hire|work together|offer/.test(q)) return 'Wahid is interested in AI/ML, computer vision, web development, and backend development projects. Use the Contacts section to reach out.';
    if (/contact|email|reach|connect/.test(q)) return 'Scroll to the Contacts section to find the email link. Remember to replace the demo address hello@wahid.dev with your real contact email in index.html.';
    if (/who|about|wahid/.test(q)) return 'Wahid M S is an AI/ML developer interested in practical AI solutions, computer vision, Python, and thoughtful web experiences.';
    if (/project|work|portfolio/.test(q)) return 'Featured work: HelmetGuard AI, Weapon Detection AI, SmartFood AI, Accident Detection AI, Astra AI, and Creative Portfolio. Scroll to Selected Work to explore them.';
    if (/help|what can you/.test(q)) return 'Ask me about Wahid, projects, skills, services, or contact details. I can answer questions about the content on this portfolio.';
    return 'I can help with questions about Wahid’s portfolio, projects, skills, services, and contact details. Try asking “Tell me about HelmetGuard AI” or “What skills does Wahid have?”';
  }
  $('#mayaForm').addEventListener('submit', e => { e.preventDefault(); const q = mayaInput.value.trim(); if (!q) return; addMessage(q, 'user'); mayaInput.value = ''; setTimeout(() => addMessage(mayaReply(q), 'bot'), 250); });
  $$('.maya-suggestions button').forEach(btn => btn.addEventListener('click', () => { openMaya(); addMessage(btn.dataset.prompt, 'user'); setTimeout(() => addMessage(mayaReply(btn.dataset.prompt), 'bot'), 200); }));

  // Project holograms: click or keyboard-activate a card to reveal a detail panel.
  const projectDetails = [
    {title:'HelmetGuard AI',category:'COMPUTER VISION / 01',description:'An AI-powered helmet detection project designed to identify riders with and without helmets and support safer roads.',focus:'Explores object detection with YOLO, image processing with OpenCV, and a workflow for reviewing potential helmet violations. The overview describes the project concept; live detection requires the actual model and backend.',tags:['YOLO','Python','OpenCV','Flask','MongoDB']},
    {title:'Weapon Detection AI',category:'OBJECT DETECTION / 02',description:'A computer-vision project exploring visual object detection and real-time alert workflows.',focus:'Explores how a trained detection model can identify target objects in image or video frames and present findings in a clear monitoring interface. Deployment and accuracy depend on the trained model and dataset.',tags:['YOLO','Python','Computer Vision','OpenCV']},
    {title:'SmartFood AI',category:'FOOD INTELLIGENCE / 03',description:'A smart food experience concept focused on recommendations and AI-assisted decisions.',focus:'Explores a user-friendly flow for organizing food information and helping people discover relevant options. Recommendation quality depends on the connected data and model logic.',tags:['AI','JavaScript','Web UX','Recommendations']},
    {title:'Accident Detection AI',category:'SAFETY ANALYTICS / 04',description:'An AI concept exploring video-based incident detection to improve awareness and support quicker response.',focus:'Explores processing video frames, recognizing possible incident patterns, and surfacing an alert for human review. This concept is not a substitute for a certified emergency monitoring system.',tags:['Computer Vision','Python','Video Analytics','AI']},
    {title:'Astra AI',category:'PERSONAL AI / 05',description:'A personal AI assistant concept for natural interactions, useful actions, and a more intuitive desktop workflow.',focus:'Explores combining conversational interaction with desktop automation and useful everyday actions. Capabilities depend on the local model, permissions, and installed integrations.',tags:['Python','LLM','Automation','Voice']},
    {title:'Creative Portfolio',category:'WEB EXPERIENCE / 06',description:'A personal portfolio combining development work, visual storytelling, and interactive design details.',focus:'Explores responsive layout, motion, glass-inspired surfaces, and small interactions that make technical work easier to discover.',tags:['HTML','CSS','JavaScript','Responsive UI']}
  ];
  const projectModal = $('#projectModal');
  const projectModalTitle = $('#projectModalTitle');
  let lastProjectTrigger = null;
  function openProjectDetails(index, trigger) {
    const item = projectDetails[index]; if (!item) return;
    lastProjectTrigger = trigger;
    $('#projectModalKicker').textContent = item.category;
    projectModalTitle.textContent = item.title;
    $('#projectModalDescription').textContent = item.description;
    $('#projectModalFocus').textContent = item.focus;
    const tagHolder = $('#projectModalTags'); tagHolder.replaceChildren();
    item.tags.forEach(tag => { const chip = document.createElement('span'); chip.textContent = tag; tagHolder.appendChild(chip); });
    projectModal.hidden = false; document.body.style.overflow = 'hidden'; $('#projectModalClose').focus();
  }
  function closeProjectDetails() { projectModal.hidden = true; document.body.style.overflow = ''; if (lastProjectTrigger) lastProjectTrigger.focus(); }
  $$('.project-card').forEach((card, index) => {
    card.setAttribute('tabindex', '0'); card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Explore ${projectDetails[index]?.title || 'project'} details`);
    card.addEventListener('click', () => openProjectDetails(index, card));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectDetails(index, card); } });
  });
  $('#projectModalClose').addEventListener('click', closeProjectDetails);
  projectModal.addEventListener('click', e => { if (e.target === projectModal) closeProjectDetails(); });
  $('#askMayaAboutProject').addEventListener('click', () => { const title = projectModalTitle.textContent; closeProjectDetails(); openMaya(); mayaInput.value = `Tell me about ${title}`; $('#mayaForm').requestSubmit(); });

  // Developer terminal: safe, simulated commands only
  const backdrop = $('#terminalBackdrop'), terminalInput = $('#terminalInput'), output = $('#terminalOutput');
  const terminalHelp = '<b>Available commands</b><br> <span>help</span> — show commands<br> <span>about</span> — about Wahid<br> <span>projects</span> — list featured projects<br> <span>skills</span> — show toolkit<br> <span>services</span> — show services<br> <span>contact</span> — jump to contact section<br> <span>clear</span> — clear terminal<br> <span>date</span> — current local date';
  function openTerminal() { backdrop.hidden = false; terminalInput.focus(); }
  function closeTerminal() { backdrop.hidden = true; $('#terminalOpen').focus(); }
  $('#terminalOpen').addEventListener('click', openTerminal); $('#terminalClose').addEventListener('click', closeTerminal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeTerminal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!projectModal.hidden) closeProjectDetails(); else if (!backdrop.hidden) closeTerminal(); else if (!panel.hidden) closeMaya(); } if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') { e.preventDefault(); openTerminal(); } });
  function writeTerminal(html, className = '') { const p = document.createElement('p'); if (className) p.className = className; p.innerHTML = html; output.appendChild(p); output.scrollTop = output.scrollHeight; }
  const projectNames = ['HelmetGuard AI','Weapon Detection AI','SmartFood AI','Accident Detection AI','Astra AI','Creative Portfolio'];
  $('#terminalForm').addEventListener('submit', e => {
    e.preventDefault(); const cmd = terminalInput.value.trim().toLowerCase(); if (!cmd) return;
    writeTerminal(`<span class="command-line">visitor@wahid:~$ ${escapeHTML(cmd)}</span>`); terminalInput.value = '';
    switch (cmd) {
      case 'help': writeTerminal(terminalHelp); break;
      case 'about': writeTerminal('Wahid M S — AI/ML developer focused on computer vision, Python, and web development.'); break;
      case 'projects': writeTerminal(projectNames.map((p,i)=>`${String(i+1).padStart(2,'0')}. ${p}`).join('<br>')); break;
      case 'skills': writeTerminal('Python · Machine Learning · YOLO · OpenCV · JavaScript · React · Flask · MongoDB · HTML/CSS · Git'); break;
      case 'services': writeTerminal('AI & Machine Learning · Computer Vision · Web Development · Backend Development'); break;
      case 'contact': writeTerminal('Jumping to the Contacts section…'); closeTerminal(); document.querySelector('#contact').scrollIntoView({behavior:'smooth'}); break;
      case 'date': writeTerminal(new Date().toString()); break;
      case 'clear': output.innerHTML = ''; break;
      case 'whoami': writeTerminal('visitor — portfolio guest'); break;
      case 'sudo hire wahid': writeTerminal('Excellent choice. Please use the Contacts section to start a conversation.'); break;
      default: writeTerminal(`Command not found: ${escapeHTML(cmd)}. Type <b>help</b> to see available commands.`, 'error');
    }
  });
  function escapeHTML(value) { return value.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

  // Email copy helper
  $('#copyEmail').addEventListener('click', async () => {
    const email = $('#copyEmail').dataset.email;
    try { await navigator.clipboard.writeText(email); toast(`Copied ${email}`); }
    catch { toast(`Demo email: ${email}`); }
  });
})();
