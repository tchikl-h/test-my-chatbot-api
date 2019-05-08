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
  import CompanyModel from './company';
  import ChatbotModel from './chatbot';
  
  @Table({
    tableName: "user",
    paranoid: true,
    timestamps: false, // TODO: Leo needs to add the other _at fields in db
    underscored: true,
    charset: "utf8mb4"
  })
  export default class UserModel extends Model<UserModel> {
  
    @PrimaryKey
    @AutoIncrement
    @ForeignKey(() => CompanyModel)
    @ForeignKey(() => ChatbotModel)
    @Column
    id: number;

    @Column
    user_id: string;
  
    @Column
    name: string;

    @HasOne(() => CompanyModel)
    company: CompanyModel;

    @HasMany(() => ChatbotModel)
    chatbots: ChatbotModel[];
    
    // @CreatedAt
    // created_at: Date;
  
    @UpdatedAt
    date_update: Date;
  
    // @DeletedAt
    // deleted_at: Date;
  }