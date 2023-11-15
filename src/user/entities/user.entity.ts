import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @ApiProperty()
  @Column({
    field: 'id',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  })
  id: number;

  @ApiProperty()
  @Column({
    field: 'email',
  })
  email: string;

  @ApiProperty()
  @Column({
    field: 'password',
  })
  password: string;
}
