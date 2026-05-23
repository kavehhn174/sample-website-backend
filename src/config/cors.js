const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://sample-website-backend.kavehhn174.workers.dev",
];

function normalizeOrigin(origin) {
  return origin.replace(/\/$/, "");
}

function parseOrigins(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((o) => normalizeOrigin(o.trim()))
    .filter(Boolean);
}

const allowedOrigins = new Set([
  ...DEFAULT_ORIGINS.map(normalizeOrigin),
  ...parseOrigins(process.env.CORS_ORIGINS),
]);

if (process.env.CORS_ORIGIN) {
  parseOrigins(process.env.CORS_ORIGIN).forEach((o) => allowedOrigins.add(o));
}

function corsOptions() {
  return {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  };
}

module.exports = { corsOptions, allowedOrigins };
