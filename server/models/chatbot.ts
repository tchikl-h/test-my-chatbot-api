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
    HasOne
  } from 'sequelize-typescript';
  import CompanyModel from './company';
  
  @Table({
    tableName: "chatbot",
    paranoid: true,
    timestamps: false, // TODO: Leo needs to add the other _at fields in db
    underscored: true,
    charset: "utf8mb4"
  })
  export default class ChatbotModel extends Model<ChatbotModel> {
  
    @PrimaryKey
    @AutoIncrement
    @ForeignKey(() => CompanyModel)
    @Column
    id: number;
  
    @Column
    project_name: string;

    @Column
    container_mode: string;

    @Column
    dialogflow_project_id: string;
    
    @Column
    dialogflow_client_email: string;

    @Column
    dialogflow_private_key: string;

    @HasOne(() => CompanyModel)
    company: CompanyModel;

    // @CreatedAt
    // created_at: Date;
  
    @UpdatedAt
    date_update: Date;
  
    // @DeletedAt
    // deleted_at: Date;
  }