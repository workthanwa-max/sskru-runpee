import { HealthCheckStatus, HealthIndicatorResult } from '@nestjs/terminus';

// Plain class without GraphQL decorators - used for internal health check typing only
export class HealthStatus {
  status: HealthCheckStatus;
  info?: HealthIndicatorResult;
  error?: HealthIndicatorResult;
  details: HealthIndicatorResult;
}
