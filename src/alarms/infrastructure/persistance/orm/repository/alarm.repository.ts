import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

export class OrmAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}
  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();
    return entities.map((entity) => AlarmMapper.toDomain(entity));
  }
}
