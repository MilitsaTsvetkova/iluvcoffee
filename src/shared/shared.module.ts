import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infrasructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
