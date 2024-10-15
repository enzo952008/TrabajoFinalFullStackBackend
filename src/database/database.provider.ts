import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'bxumyomcz1nedvihvfem-mysql.services.clever-cloud.com',
        port: 3306,
        username: 'uhu5qlsekpydjqsn',
        password: 'XLEdvbIVi9AEdHUmzrDV',
        database: 'bxumyomcz1nedvihvfem',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];