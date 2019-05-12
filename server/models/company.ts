import {
  AutoIncrement,
  Column,
  CreatedAt, DataType,
  DeletedAt, ForeignKey,
  AllowNull,
  Model,
  PrimaryKey,
  Table, Unique,
  UpdatedAt,
  HasOne,
  HasMany,
  BelongsToMany,
  BelongsTo
} from 'sequelize-typescript';
import Chatbot from './chatbot';
import User from './user';

@Table({
  tableName: "company",
  paranoid: true,
  timestamps: false,
  underscored: true,
  charset: "utf8mb4"
})
export default class Company extends Model<Company> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Chatbot)
  chatbots: Chatbot[];

  @HasMany(() => User)
  users: User[];

  // @CreatedAt
  // created_at: Date;

  @UpdatedAt
  date_update: Date;

  // @DeletedAt
  // deleted_at: Date;
}