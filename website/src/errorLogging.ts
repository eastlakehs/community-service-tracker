import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const initErrorLogging = () => {
  Sentry.init({
    // PUBLIC APP KEY (do not worry, can only be used to spam with garbage traces)
    dsn:
      "https://73f801849cd84b189900fc5de4a9dc42@o563335.ingest.sentry.io/5703209",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  // heart beat to know if sentry is working
  Sentry.captureException("[NOT AN ERROR] Client Loaded Site");
};
