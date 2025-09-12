import { AggregateRoot } from '@nestjs/cqrs';
import { Version } from './value-objects/version';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }

  loadFromHistory(history: any[]): void {
    const domainEvens = history.map((event) => event.data);
    super.loadFromHistory(domainEvens);

    const lastEvent = history[history.length - 1];
    this.setVersion(new Version(lastEvent.position));
  }
}
