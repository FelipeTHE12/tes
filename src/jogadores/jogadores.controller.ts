import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { response, Response } from 'express';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  public async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
    @Res() response: Response,
  ): Promise<void> {
    const newPlayer = this.jogadoresService.createPlayer(createPlayerDto);
    response.status(HttpStatus.CREATED).json(newPlayer);
  }

  @Put()
  public async updatePlayer() {}

  @Get()
  public async findAllPlayers(@Res() response: Response): Promise<void> {
    const players = await this.jogadoresService.findAllPlayers();

    response.status(HttpStatus.OK).json(players);
  }
}
