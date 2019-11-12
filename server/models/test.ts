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
import Assertion from './assertion';

@Table({
  tableName: "test",
  paranoid: true,
  timestamps: true,
  underscored: true,
  charset: "utf8mb4"
})
export default class Test extends Model<Test> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Assertion)
  assertions: Assertion[];

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