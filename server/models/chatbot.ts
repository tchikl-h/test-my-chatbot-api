import {
    AutoIncrement,
    Column,
    CreatedAt, DataType,
    DeletedAt, ForeignKey,
    Model,
    PrimaryKey,
    Table, Unique,
    UpdatedAt,
    BelongsTo,
    HasOne,
    HasMany
  } from 'sequelize-typescript';
  import Company from './company';
  import Test from './test';
  
  @Table({
    tableName: "chatbot",
    paranoid: true,
    timestamps: true,
    underscored: true,
    charset: "utf8mb4"
  })
  export default class Chatbot extends Model<Chatbot> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    project_name: string;

    @Column
    description: string;

    @Column
    response_url: string;

    @Column
    periodic_build: number;

    @Column
    webhook_url: string;

    @HasMany(() => Test)
    tests: Test[];

    @ForeignKey(() => Company)
    @Column
    companyId: number;

    @BelongsTo(() => Company)
    company: Company;

    @CreatedAt
    created_at: Date;
  
    @UpdatedAt
    date_update: Date;
  
    @DeletedAt
    deleted_at: Date;
  }