export const REM_SCORE_HREF = "/real-estate-media/score";

export const REM_HERO_JOBS = [
  {
    id: "maple",
    address: "124 Maple Ave",
    package: "Photo + drone + reel + floor plan",
    status: "Shoot tomorrow · 48h window",
    flag: "No photographer assigned",
    tone: "warn",
    hoursLeft: 41,
  },
  {
    id: "pine",
    address: "87 Pine Street",
    package: "Field complete · add-on slipped in",
    status: "Drone upload pending",
    flag: "Editor waiting",
    tone: "pressure",
    hoursLeft: 28,
  },
  {
    id: "harbor",
    address: "19 Harbor Lane",
    package: "Photo + 3D + twilight",
    status: "Agent asked twice today",
    flag: null,
    tone: "neutral",
    hoursLeft: 19,
  },
];

export const REM_NOTIFICATIONS = [
  { from: "Alex (photo)", text: "Gate code for 124 Maple?" },
  { from: "Editor", text: "Drone clips still missing on 87 Pine" },
  { from: "CubiCasa", text: "Floor plan file never landed for Maple" },
  { from: "Agent, Harbor", text: "Was this photo only or full package?" },
  { from: "Crew lead", text: "Who has tomorrow's shoot?" },
];

export const REM_FRICTION_STAGES = [
  { id: "shoot", label: "Shoot", status: "Done · 124 Maple", broken: "Crew left early. Add-on not logged." },
  { id: "upload", label: "Upload", status: "Drone RAW missing", broken: "Files in Dropbox. Job record empty." },
  { id: "addons", label: "Add-ons", status: "Reel + floor plan unclear", broken: "Agent booked reel. CubiCasa still out." },
  { id: "edit", label: "Edit", status: "Not started", broken: "Editor pinging you. No single source." },
  { id: "agent", label: "Agent", status: "Asked twice · 48h clock", broken: "Text thread is the status board." },
];

export const REM_DEMO_JOBS = [
  {
    id: "maple-demo",
    address: "124 Maple Ave",
    services: ["Photo", "Drone", "Reel", "Floor plan"],
    window: "48h · 36h left",
    chaos: ["3 threads", "Add-on?", "No editor owner"],
    connected: ["Crew assigned", "Upload landed", "Edit queued"],
  },
  {
    id: "pine-demo",
    address: "87 Pine Street",
    services: ["Photo", "Twilight", "3D"],
    window: "48h · 22h left",
    chaos: ["Drone in texts", "Agent loop", "Status unknown"],
    connected: ["Field complete", "Files linked", "Agent muted"],
  },
];

export const REM_KEEP_TOOLS = ["Aryeo / HDPhotoHub booking", "Galleries", "Payments", "Rela / delivery"];
export const REM_CLEAN_UP = ["Crew dispatch", "File handoffs", "Editing queue", "Add-on clarity", "Agent status"];

export const REM_SCORE_CARDS = [
  { title: "Jobs", body: "How many shoots hit your 24–48h window each month." },
  { title: "People", body: "Who touches the work before the agent sees anything." },
  {
    title: "Services",
    body: "Photo, drone, video, reels, floor plans, 3D, twilight — often on one listing.",
  },
  { title: "Status", body: "Where crew, uploads, add-ons, or editing go quiet." },
  { title: "Tools", body: "Aryeo, CubiCasa, Matterport, Dropbox — where truth actually lives." },
  { title: "Owner drag", body: "What still pings you before delivery." },
];

export const REM_FIT_LINES = [
  "Founder-led studio, 2–10 people, multiple shooters or crew leads",
  "Photo + drone + video/reels + floor plans on the same job",
  "24–48h turnarounds with add-ons that slip in after booking",
  "Editors waiting on uploads while agents text for status",
  "Booking stack works. Crew and handoffs still scatter.",
];

export const REM_PROOF_ITEMS = [
  "Who has tomorrow's shoot",
  "Did the upload actually land",
  "Did floor plan / 3D make it to the job",
  "Has editing started",
  "Were the photos sent",
];

export const REM_CATEGORY_ITEMS = [
  "shoots",
  "crew",
  "uploads",
  "add-ons",
  "floor plans",
  "editing",
  "agent loops",
  "48h windows",
];

export const REM_COPY = {
  hero: {
    eyebrow: "Real estate media · founder-led studios",
    headline: "Booking's handled. You're still the dispatch layer for everything after.",
    body: [
      "Aryeo or HDPhotoHub takes the order. Crew goes out. Drone, reels, floor plans, 3D — whatever got added last minute.",
      "Files land somewhere. Editor waits. Agent texts. 48-hour window keeps moving.",
      "Half the exceptions still route through your phone.",
    ],
    cta: "Get My Media Ops Score",
    ctaNote: "Three minutes. Mostly taps. Demo workspace after.",
    jobsLabel: "jobs waiting on you",
  },
  recognize: {
    headline: "Job's in the hub somewhere. Questions still hit your phone.",
    body: [
      "Photographer texting for the gate code on Maple tomorrow.",
      "Editor saying drone clips from Pine never showed.",
      "CubiCasa floor plan still missing on the same listing.",
      "Agent on Harbor asking if it was photo-only or the full package.",
      "Crew lead wondering who's even got tomorrow's schedule.",
      "Thirty seconds here. Forty-five there.",
      "You answer because digging through five tools is slower.",
      "Morning's half gone. Nothing that pays next month moved.",
    ],
    cta: "Run the Media Ops Score",
  },
  friction: {
    headline: "Shoot's done. Job's still wide open.",
    body: [
      "Photos captured. Listing page still has holes.",
      "Drone files need to reach the editor — not your inbox.",
      "Add-on slipped in after booking. Nobody updated the package.",
      "Floor plan still out. 48h clock doesn't care.",
      "When status lives in texts, gallery notes, and what you remember at 9pm, you're the only one who can answer straight.",
    ],
    simulatorLabel: "124 Maple Ave · open loops",
    connectCta: "Watch when it connects",
    connectedLabel: "Same job · connected",
  },
  tools: {
    headline: "Keep Aryeo, galleries, payments, CubiCasa, Matterport where they are.",
    body: [
      "Those stacks work. Agents already know them.",
      "StudioFlows sits around them for the part that still breaks after the order books:",
    ],
    bullets: [
      "Who has today's shoot",
      "Did upload / floor plan / 3D actually land on the job",
      "Did add-ons get logged",
      "Has editing started",
      "What changed since yesterday",
    ],
    close: "Back office stays quiet. Agents don't notice until delivery just moves.",
  },
  demo: {
    headline: "Step into a sample operation first.",
    body: [
      "After the score you walk a live demo — multi-service jobs already moving.",
      "Toggle chaos vs connected. Feel the density drop when status lives in one place.",
      "Crew marks field complete from the truck. Uploads land. Edits kick off without you in the group chat.",
    ],
    chaosMode: "Chaos mode",
    connectedMode: "Connected mode",
  },
  fieldflow: {
    headline: "Crew updates from the field. You see it on the job — not in texts.",
    body: [
      "Photographer marks field complete or upload pending on the record from their phone.",
      "Owner side updates without you chasing thread archaeology.",
    ],
    mobileLabel: "Field · mobile",
    ownerLabel: "Owner · same job",
  },
  score: {
    headline: "See what's still routing back to you.",
    body: [
      "Six questions. How jobs actually move in your shop. No org charts.",
      "Surfaces the drag most of us feel every week but don't say out loud.",
    ],
    cta: "Get My Media Ops Score",
  },
  voice: {
    headline: "One messy example usually says enough.",
    body: [
      "Rest of the score is taps.",
      "One question asks for a job that went sideways. Type or voice note. Doesn't have to be clean.",
    ],
    example:
      "Harbor Lane. Agent kept texting if photos were sent. Editor still waiting on drone. Floor plan never linked. I chased all three at 7:30.",
  },
  result: {
    headline: "Score shows what's actually stuck.",
    body: [
      "Four jobs still pulling you in for updates.",
      "Pine sitting on drone upload. Harbor waiting on edits. Maple add-ons still fuzzy.",
      "You feel it when the noise quiets — that small pocket where your brain isn't scanning for what's about to break.",
    ],
  },
  fit: {
    headline: "When this lands",
    lead: "Multiple people touching each listing before media reaches the agent — on a 24–48h clock.",
    close: "If any of that sounds like your week, the score will feel a little too real.",
  },
  pricing: {
    eyebrow: "Founding customer pricing",
    price: "$99 first month (then $199/mo locked)",
    body: [
      "One workspace for the crew. No per-seat math right away.",
      "Run the score. Walk the demo. Move forward when you see how much less pulls on you.",
    ],
  },
  proof: {
    headline: "The questions that still hit your phone",
    body: "Score shows the exact status checks still coming back to you before you pay for anything.",
  },
  final: {
    headline: "Start with the score. No call. No bullshit.",
    body: [
      "Three minutes. Mostly taps. Demo workspace right after.",
      "See the gaps. Notice what it feels like when some of that weight isn't on you.",
    ],
    cta: "Get My Media Ops Score",
  },
  category: {
    headline: "Everything that happens after the booking",
  },
};
