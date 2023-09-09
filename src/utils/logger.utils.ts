import winston from 'winston'

class LoggerUtil {
  public log({
    serviceName,
    logLevel,
    message,
  }: {
    serviceName: string
    logLevel: string
    message: any
  }) {
    const logger = winston.createLogger({
      level: logLevel,
      format: winston.format.json(),
      defaultMeta: { service: serviceName },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    })

    logger.log(logLevel, message)
  }
}
export default new LoggerUtil()
