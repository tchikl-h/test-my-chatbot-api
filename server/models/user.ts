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
  
  @Table({
    tableName: "user",
    paranoid: true,
    timestamps: false,
    underscored: true,
    charset: "utf8mb4"
  })
  export default class User extends Model<User> {
  
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    name: string;

    @Column(DataType.ARRAY(DataType.INTEGER))
    chatbotIds: number[];

    @ForeignKey(() => Company)
    @Column
    companyId: number;

    @BelongsTo(() => Company)
    company: Company;
    
    // @CreatedAt
    // created_at: Date;
  
    @UpdatedAt
    date_update: Date;
  
    // @DeletedAt
    // deleted_at: Date;
  }