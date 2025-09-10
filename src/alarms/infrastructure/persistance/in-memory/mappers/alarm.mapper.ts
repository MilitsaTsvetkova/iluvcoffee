import { Alarm } from '../../../../domain/alarm';
import { AlarmItem } from '../../../../domain/alarm-item';
import { AlarmSeverity } from '../../../../domain/value-objects/alarm-severity';
import { AlarmItemInMemoryEntity } from '../entities/alarm-item.entity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
    );
    const alarmModel = new Alarm(alarmEntity.id);

    alarmModel.name = alarmEntity.name;
    alarmModel.severity = alarmSeverity;
    alarmModel.triggeredAt = alarmEntity.triggeredAt;
    alarmModel.isAcknowledged = alarmEntity.isAcknowledged;
    alarmModel.items = alarmEntity.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );
    return alarmModel;
  }

  static toPersistence(alarm: Alarm) {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.triggeredAt = alarm.triggeredAt;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.items = alarm.items.map((item) => {
      const alarmItemEntity = new AlarmItemInMemoryEntity();
      alarmItemEntity.id = item.id;
      alarmItemEntity.name = item.name;
      alarmItemEntity.type = item.type;
      return alarmItemEntity;
    });
    return entity;
  }
}
