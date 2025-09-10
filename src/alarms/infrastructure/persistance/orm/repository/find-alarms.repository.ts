import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAlarmRepository } from '../../../../application/ports/find-alarms.repository';
import { AlarmReadModel } from '../../../../domain/read-models/alarm-read-model';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmFindAllAlarmRepository implements FindAlarmRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}
  async findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find();
  }
}
