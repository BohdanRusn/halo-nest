import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseMessage } from './BaseMessage';
import { Game } from './Game';
import { MessageAttachment } from './MessageAttachment';

@Entity({ name: 'messages' })
export class Message extends BaseMessage {
  @ManyToOne(() => Game, (game) => game.messages)
  game: Game;

  @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments: MessageAttachment[];
}
