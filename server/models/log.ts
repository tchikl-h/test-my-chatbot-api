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

  import Chatbot from './chatbot';
  
  @Table({
    tableName: "log",
    paranoid: true,
    timestamps: true,
    underscored: true,
    charset: "utf8mb4"
  })
  export default class Log extends Model<Log> {
  
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    logs: string;

    @Column
    coverage: string;

    @ForeignKey(() => Chatbot)
    @Column
    chatbotId: number;

    @BelongsTo(() => Chatbot)
    chatbot: Chatbot;
    
    @CreatedAt
    created_at: Date;
  
    @UpdatedAt
    date_update: Date;
  
    @DeletedAt
    deleted_at: Date;
  }