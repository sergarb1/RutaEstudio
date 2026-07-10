window.GC = window.GC || {};

GC.SVG = {
  brain: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
  brainAI: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>',
  academicCap: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></svg>',
  bookOpen: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>',
  lightbulb: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>',
  globeAlt: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>',
  rocketLaunch: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>',
  plus: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>',
  arrowDownTray: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>',
  arrowUpTray: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/></svg>',
  documentPlus: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"/></svg>',
  questionMarkCircle: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 5.25h.008v.008H12v-.008z"/></svg>',
  sparkles: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>',
  checkCircle: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  xCircle: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  exclamationTriangle: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>',
  chartBar: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>',
  chartLineUp: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>',
  fire: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 012 12 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/></svg>',
  clipboardDocument: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></svg>',
  map: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/></svg>',
  colorSwatch: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/></svg>',
  play: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>',
  tag: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg>',
  codeBracket: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>',
  trophy: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.022 6.022 0 01-2.77-.896"/></svg>',
  arrowRight: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>',
  globe: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>',
  scale: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 5.25v2.883M18.75 8.25h-5.25m-7.5-3v2.883M6.75 8.25h5.25"/></svg>',
  flag: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/></svg>',
  chartLine: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>',
  link: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg>',
  documentText: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
  check: '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>'
};

// Color-coded dots for levels (replaces emoji icons)
GC.levelDots = [
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#22c55e" opacity="0.7"/><circle cx="8" cy="8" r="4" fill="#22c55e"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#16a34a" opacity="0.7"/><circle cx="8" cy="8" r="4" fill="#16a34a"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#0ea5e9" opacity="0.7"/><circle cx="8" cy="8" r="4" fill="#0ea5e9"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#6366f1" opacity="0.7"/><circle cx="8" cy="8" r="4" fill="#6366f1"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#8b5cf6" opacity="0.7"/><circle cx="8" cy="8" r="4" fill="#8b5cf6"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#f59e0b"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#f97316"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><path d="M8 1L10 6L15 6L11 9L13 14L8 11L3 14L5 9L1 6L6 6Z" fill="#ef4444"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#eab308"/><circle cx="8" cy="8" r="2" fill="#fff"/></svg>',
  '<svg class="w-4 h-4 inline-block" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#a855f7"/></svg>'
];

GC.heatColor = function(score) {
  if (score >= 70) return '#22c55e';
  if (score >= 40) return '#eab308';
  return '#ef4444';
};

GC.heatBg = function(score) {
  if (score >= 70) return '#bbf7d0';
  if (score >= 40) return '#fef08a';
  return '#fecaca';
};

GC.heatLabel = function(score) {
  if (score >= 70) return 'Dominado';
  if (score >= 40) return 'En proceso';
  return 'No dominado';
};

GC.overallScore = function(results) {
  const vals = Object.values(results);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
};

GC.heatCount = function(results, type) {
  let count = 0;
  Object.values(results).forEach(v => {
    if (type === 'red' && v < 40) count++;
    else if (type === 'yellow' && v >= 40 && v < 70) count++;
    else if (type === 'green' && v >= 70) count++;
  });
  return count;
};

GC.conceptName = function(subjects, id) {
  for (const s of subjects) {
    const c = s.concepts.find(x => x.id === id);
    if (c) return c.name;
  }
  return '?';
};

GC.conceptSubject = function(subjects, id) {
  for (const s of subjects) {
    if (s.concepts.some(x => x.id === id)) return s;
  }
  return null;
};

GC.subjectColor = function(index) {
  const palette = [
    '#6366f1', '#ec4899', '#14b8a6', '#f97316',
    '#8b5cf6', '#06b6d4', '#84cc16', '#e11d48'
  ];
  return palette[index % palette.length];
};

GC.allConcepts = function(subjects) {
  const map = {};
  subjects.forEach(s => {
    s.concepts.forEach(c => {
      map[c.id] = { ...c, subjectId: s.id, subjectName: s.name };
    });
  });
  return Object.values(map);
};

GC.allRelations = function(subjects, crossRelations) {
  const rels = [];
  subjects.forEach(s => {
    s.relations.forEach(r => {
      rels.push({ ...r, fromSubject: s.id });
    });
  });
  if (crossRelations) {
    crossRelations.forEach(r => rels.push({ ...r }));
  }
  return rels;
};

// --- Walkthrough / Inspector ---

GC.walkthrough = function(subject, conceptId, results) {
  if (!subject || !conceptId) return null;
  const concept = subject.concepts.find(c => c.id === conceptId);
  if (!concept) return null;

  const mastery = results ? (results[conceptId] || 0) : 0;

  const findBlockers = (id, depth = 0, visited = new Set()) => {
    if (visited.has(id) || depth > 20) return [];
    visited.add(id);
    const blockers = [];
    const prereqs = subject.relations.filter(r => r.to === id && r.type === 'prerrequisito');
    for (const p of prereqs) {
      const pc = subject.concepts.find(c => c.id === p.from);
      if (!pc) continue;
      const pm = results ? (results[p.from] || 0) : 0;
      blockers.push({
        id: p.from, name: pc.name, mastery: pm, weight: pc.weight, depth,
        isBlocker: pm < 40, isWeak: pm >= 40 && pm < 70
      });
      if (pm < 70) {
        blockers.push(...findBlockers(p.from, depth + 1, visited));
      }
    }
    return blockers;
  };

  const findDependents = (id, depth = 0, visited = new Set()) => {
    if (visited.has(id) || depth > 10) return [];
    visited.add(id);
    const deps = [];
    const next = subject.relations.filter(r => r.from === id && r.type === 'prerrequisito');
    for (const n of next) {
      const nc = subject.concepts.find(c => c.id === n.to);
      if (!nc) continue;
      const nm = results ? (results[n.to] || 0) : 0;
      deps.push({ id: n.to, name: nc.name, mastery: nm, depth });
      deps.push(...findDependents(n.to, depth + 1, visited));
    }
    return deps;
  };

  const blockers = findBlockers(conceptId);
  const weakBlockers = blockers.filter(b => b.isBlocker);
  const midBlockers = blockers.filter(b => b.isWeak && !b.isBlocker);
  const chain = weakBlockers.map(b => b.name);
  const dependents = findDependents(conceptId);
  const uniqueDeps = [...new Map(dependents.map(d => [d.id, d])).values()];

  const isIsolated = subject.relations.filter(r => r.from === conceptId || r.to === conceptId).length === 0;

  let recommendation = '';
  if (mastery >= 70) {
    if (weakBlockers.length) {
      recommendation = `Dominas "${concept.name}" pero ${weakBlockers.length} prerreq. no. Ayuda a compa\u00f1eros con: ${weakBlockers.map(b => b.name).join(', ')}.`;
    } else if (uniqueDeps.length) {
      recommendation = `${concept.name} dominado (${mastery}%). Puedes avanzar a: ${uniqueDeps.slice(0, 3).map(d => d.name).join(', ')}.`;
    } else {
      recommendation = `"${concept.name}" dominado. No dependen m\u00e1s conceptos de \u00e9l.`;
    }
  } else if (mastery >= 40) {
    if (weakBlockers.length) {
      recommendation = `Para afianzar "${concept.name}", repasa primero: ${weakBlockers.slice(0, 3).map(b => b.name + ' (' + b.mastery + '%)').join(', ')}.`;
    } else if (midBlockers.length) {
      recommendation = `"${concept.name}" al ${mastery}%. Refuerza tambi\u00e9n: ${midBlockers.slice(0, 2).map(b => b.name).join(', ')}.`;
    } else {
      recommendation = `"${concept.name}" va bien (${mastery}%). Practica con ejercicios.`;
    }
  } else {
    if (weakBlockers.length) {
      recommendation = `${weakBlockers.length} prerreq. bloquean "${concept.name}". Empieza por: ${weakBlockers[0].name} (${weakBlockers[0].mastery}%).`;
    } else {
      recommendation = `Dedica tiempo a "${concept.name}". Haz ejercicios b\u00e1sicos.`;
    }
  }

  return {
    concept: { id: conceptId, name: concept.name, mastery, weight: concept.weight, description: concept.description },
    blockers: blockers.sort((a, b) => a.mastery - b.mastery),
    weakBlockers,
    chain,
    dependents: uniqueDeps,
    isIsolated,
    recommendation,
    resources: concept.resources || [],
    mastered: mastery >= 70,
    inProgress: mastery >= 40 && mastery < 70,
    failed: mastery < 40
  };
};

GC.unlockScore = function(subject, conceptId, results) {
  const visited = new Set();
  let count = 0;
  const countDependents = (id) => {
    if (visited.has(id)) return;
    visited.add(id);
    subject.relations.filter(r => r.from === id && r.type === 'prerrequisito').forEach(r => {
      count++;
      countDependents(r.to);
    });
  };
  countDependents(conceptId);
  const mastery = results ? (results[conceptId] || 0) : 0;
  const c = subject.concepts.find(x => x.id === conceptId);
  return count * (100 - mastery) * (c ? c.weight : 5);
};

GC.roadmap = function(subject, results) {
  if (!subject) return { ahora: [], siguiente: [], pronto: [] };
  const groups = { ahora: [], siguiente: [], pronto: [] };

  const inDegree = {};
  subject.concepts.forEach(c => { inDegree[c.id] = 0; });
  subject.relations.filter(r => r.type === 'prerrequisito').forEach(r => {
    inDegree[r.to] = (inDegree[r.to] || 0) + 1;
  });

  subject.concepts.forEach(c => {
    const m = results ? (results[c.id] || 0) : 0;
    const prereqs = subject.relations.filter(r => r.to === c.id && r.type === 'prerrequisito');
    const hasWeakPrereqs = prereqs.some(p => (results ? (results[p.from] || 0) : 0) < 40);
    const blockedBy = prereqs.filter(p => (results ? (results[p.from] || 0) : 0) < 40).map(p => GC.conceptName([subject], p.from));
    const unlocks = subject.relations.filter(r => r.from === c.id && r.type === 'prerrequisito').length;
    const unlockScore = GC.unlockScore(subject, c.id, results);

    const entry = {
      id: c.id, name: c.name, mastery: m, weight: c.weight,
      blockedBy, unlocks, unlockScore
    };

    if (m < 40 && hasWeakPrereqs) {
      groups.pronto.push(entry);
    } else if (m < 40) {
      groups.ahora.push(entry);
    } else if (m < 70) {
      if (unlocks > 0) {
        groups.ahora.push(entry);
      } else {
        groups.siguiente.push(entry);
      }
    } else {
      if (unlocks > 0) {
        groups.siguiente.push(entry);
      } else {
        groups.pronto.push(entry);
      }
    }
  });

  groups.ahora.sort((a, b) => b.unlockScore - a.unlockScore);
  groups.siguiente.sort((a, b) => b.unlockScore - a.unlockScore);
  groups.pronto.sort((a, b) => a.unlockScore - b.unlockScore);

  return groups;
};

GC.md = function(text) {
  if (!text) return '';
  let h = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 dark:text-indigo-400 hover:underline">$1</a>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // bullet lists
  h = h.replace(/^- (.+)$/gm, '<span class="block ml-2">• $1</span>');
  // newlines
  h = h.replace(/\n/g, '<br>');
  return h;
};
