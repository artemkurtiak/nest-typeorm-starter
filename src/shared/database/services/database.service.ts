import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { databaseTables } from '../constants';
import { DatabaseRepository } from '../repositories/database.repository';
import type { DatabaseRepositories } from '../types';

export class DatabaseService implements OnApplicationBootstrap {
  @Inject(DataSource)
  dataSource: DataSource;
  protected db: DatabaseRepositories;

  onApplicationBootstrap() {
    const db = Object.entries(databaseTables).reduce((acc, [key, name]) => {
      const entityMetadata = this.dataSource.entityMetadatas.find(
        (item) => item.tableName === name,
      );

      if (entityMetadata) {
        acc[key] = new DatabaseRepository(this.dataSource.getRepository(entityMetadata.name));
      }

      return acc;
    }, {} as DatabaseRepositories);

    this.db = db;
  }
}
