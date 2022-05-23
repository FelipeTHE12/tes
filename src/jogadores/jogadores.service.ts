import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private players: Player[];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  public async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new Error('This e-mail is already in use.');
    }

    const newPlayer = new this.playerModel(createPlayerDto);

    await newPlayer.save();

    return;
  }

  protected async updatePlayer(
    playerId: string,
    createPlayerDto: CreatePlayerDto,
  ) {
    const existingPlayer = await this.playerModel.findById(playerId);

    if (!existingPlayer) {
      throw new NotFoundException('Not FOund');
    }

    existingPlayer.set({
      phoneNumber: createPlayerDto.phoneNumber,
      email: createPlayerDto.email,
      name: createPlayerDto.name,
    });

    await existingPlayer.save();
  }

  public async findAllPlayers(): Promise<Player[]> {
    const allPlayers = await this.playerModel.find().exec();

    return allPlayers;
  }

  protected async deletePlayer(playerId: string): Promise<void> {
    const playerToDelete = await this.playerModel.findById(playerId);

    if (!playerToDelete) {
      throw new NotFoundException('Not found');
    }

    await this.playerModel.remove;
  }
}
