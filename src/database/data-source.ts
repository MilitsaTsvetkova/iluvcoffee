import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { getConfig } from './config';

export default new DataSource({
  ...getConfig(new ConfigService()),
});
