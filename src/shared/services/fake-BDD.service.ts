import { readFile, writeFile } from 'fs';

import { Injectable } from '@nestjs/common';
import { join } from 'path';

const bddPath = join(process.cwd(), 'assets/bdd.json');

@Injectable()
export class FakeBDDService {
  private dataMap: Map<string, any>;

  constructor() {
    readFile(bddPath, 'utf8', (err, data) => {
      if (err) throw err;
      const entries = Object.entries(JSON.parse(data));

      this.dataMap = new Map(entries);
    });
  }

  add<T>(item: T): T & { id: string; creationDate: Date } {
    const id = this.dataMap.size.toString();
    const creationDate = new Date();
    const createdItem = { ...item, id, creationDate };

    writeFile(bddPath, JSON.stringify(Object.fromEntries(this.dataMap)), (v) => {
      this.dataMap.set(id, createdItem);
      console.log(v)
      console.log(this.dataMap)
    });

    return createdItem;
  }

  getById<T>(id: string): T {
    return this.dataMap.get(id);
  }

  getAll<T>(skip: number, take: number): Array<T> {
    const data = Array.from(this.dataMap.values());

    return data.slice(skip, skip + take);
  }
}
