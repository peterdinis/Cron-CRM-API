import { MessageModule } from './messages/message.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './tasks/task.module';
import { NoteModule } from './notes/note.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MessageModule,
    NoteModule,
    UserModule,
    TaskModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
