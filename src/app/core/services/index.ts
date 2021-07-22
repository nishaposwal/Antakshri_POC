import { AppService } from './app.service';
import { RestService } from './rest.service';
import { ExternalInterfaceService } from './external-interface.service';
import { EventEmitterService } from './event-emitter.service';
import { LoggerService } from './logger.service';
import { TrackerService } from './tracker.service';
import { ServerLogService } from './server-log.service';

export * from './app.service';
export * from './rest.service';
export * from './external-interface.service';
export * from './event-emitter.service';
export * from './logger.service';
export * from './tracker.service';
export * from './server-log.service';

export const services = [
    AppService,
    RestService,
    ExternalInterfaceService,
    EventEmitterService,
    LoggerService,
    TrackerService,
    ServerLogService
];