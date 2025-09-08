import { Module } from '@nestjs/common';
import { OrmPersistenceModule } from './persistance/orm/orm-persistence.module';
import { InMemoryPersistenceModule } from './persistance/in-memory/in-memory-persistence.module';

@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm' ? OrmPersistenceModule : InMemoryPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
