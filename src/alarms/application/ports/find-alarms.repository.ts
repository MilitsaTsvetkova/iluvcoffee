import { AlarmReadModel } from '../../domain/read-models/alarm-read-model';

export abstract class FindAlarmRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}
