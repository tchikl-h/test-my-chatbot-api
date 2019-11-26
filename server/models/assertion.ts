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
  import Test from './test';
  
  @Table({
    tableName: "assertion",
    paranoid: true,
    timestamps: true,
    underscored: true,
    charset: "utf8mb4"
  })
  export default class Assertion extends Model<Assertion> {
  
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    order: number;
  
    @Column
    userInput: string;
  
    @Column
    chatbotResponse: string;
  
    @Column
    intent: string;
  
    @Column
    error: string;
  
    @ForeignKey(() => Test)
    @Column
    testId: number;
  
    @BelongsTo(() => Test)
    test: Test;
  
    @CreatedAt
    created_at: Date;
  
    @UpdatedAt
    date_update: Date;
  
    @DeletedAt
    deleted_at: Date;
  }