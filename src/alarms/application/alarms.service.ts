import { Injectable } from '@nestjs/common';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}
  create(createAlarmDto: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      createAlarmDto.name,
      createAlarmDto.severity,
    );
    return this.alarmRepository.save(alarm);
  }

  findAll() {
    return this.alarmRepository.findAll();
  }
}
