import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('real')
  comprimento: number;

  @Column('real')
  altura: number;

  @Column()
  cor: string;

  @Column('real')
  comprimentoVendido: number;

  @Column('integer')
  telas: number;

  @Column('integer')
  postes: number;

  @Column('integer')
  fixadores: number;

  @Column('integer')
  parafusos: number;

  @CreateDateColumn()
  dataConfirmacao: Date;
}
