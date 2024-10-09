import { createLogger, format, transports } from "winston";
// Apply the custom colors to winston
import winston from "winston";
const { combine, printf, colorize, timestamp } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  // Customize timestamp color
  const coloredTimestamp = `\x1b[35m[${timestamp}]\x1b[0m`; // pink color for the timestamp
  return `${coloredTimestamp} [${level}]: ${message}`; // Format the log message
});

const logger = createLogger({
  format: combine(
    colorize({ all: true }), // Add color to log levels (info, error, etc.)
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Include timestamp in the log
    customFormat // Custom format defined above
  ),
  transports: [
    new transports.Console(), // Output logs to the console
  ],
  level: "info", // Default log level
  level: "debug",
});
// Customize colors for specific levels
const levelColors = {
  error: "red", // Make error level red
  warn: "yellow", // Warn level yellow
  info: "green", // Info level green
  debug: "blue", // Debug level blue
  verbose: "cyan", // Verbose level cyan
  silly: "magenta", // Silly level magenta
  critical: "bgRed", // Critical level with red background
  notice: "blue", // Notice level blue
  alert: "yellow", // Alert level yellow
  trace: "white", // Trace level white
};

winston.addColors(levelColors);

export default logger;
