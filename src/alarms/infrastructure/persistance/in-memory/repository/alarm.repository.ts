import { CreateAlarmRepository } from '../../../../application/ports/create-alarm.repository';
import { FindAlarmRepository } from '../../../../application/ports/find-alarms.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmReadModel } from '../../../../domain/read-models/alarm-read-model';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

export class InMemoryAlarmRepository
  implements CreateAlarmRepository, FindAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();
  constructor() {}
  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      const existing = this.materializedAlarmViews.get(alarm.id);
      this.materializedAlarmViews.set(alarm.id, { ...existing, ...alarm });
    }
    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
