import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    firstName?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    lastName?: string;

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role!: 'user' | 'admin';

    @Column({ nullable: true })
    provider?: string; 

    @Column({ nullable: true })
    providerId?: string; 

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}