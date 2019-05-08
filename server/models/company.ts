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
  HasMany
} from 'sequelize-typescript';
import ChatbotModel from './chatbot';
import UserModel from './user';

@Table({
  tableName: "company",
  paranoid: true,
  timestamps: false,
  underscored: true,
  charset: "utf8mb4"
})
export default class CompanyModel extends Model<CompanyModel> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @HasMany(() => ChatbotModel)
  chatbots: ChatbotModel[];

  @HasMany(() => UserModel)
  users: UserModel[];

  // @CreatedAt
  // created_at: Date;

  @UpdatedAt
  date_update: Date;

  // @DeletedAt
  // deleted_at: Date;
}