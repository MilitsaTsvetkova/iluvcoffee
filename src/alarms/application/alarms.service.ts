import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createAlarmDto: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmDto);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}
