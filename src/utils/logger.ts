type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const runtimeEnv = (
  globalThis as {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env;

const configuredLevel = (runtimeEnv?.LOG_LEVEL || 'debug') as LogLevel;
const minimumLevel = levelPriority[configuredLevel] || levelPriority.debug;
const isDevelopment =
  typeof __DEV__ !== 'undefined'
    ? __DEV__
    : runtimeEnv?.NODE_ENV !== 'production';

export const devLog = (
  level: LogLevel,
  event: string,
  metadata: Record<string, unknown> = {},
) => {
  if (!isDevelopment || levelPriority[level] < minimumLevel) return;

  const message = JSON.stringify({ scope: 'app', event, ...metadata });

  if (level === 'error') console.error(message);
  else if (level === 'warn') console.warn(message);
  else if (level === 'info') console.info(message);
  else console.debug(message);
};
