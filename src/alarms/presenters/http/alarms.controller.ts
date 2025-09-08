import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: { name: string; severity: string }) {
    return this.alarmsService.create(
      new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity),
    );
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}
