import { UsersService } from '@payap/users/application/services/users.service.ts';
import type { AbstractUsersRepository } from '@payap/users/core/repositories/users.repository.ts';
import type { AbstractUsersService } from '@payap/users/core/services/users.service.ts';
import { UsersRepository } from '@payap/users/infrastructure/repositories/users.repository.ts';
import { asClass, createContainer } from 'awilix';

type Cradle = {
  usersRepository: AbstractUsersRepository;
  usersService: AbstractUsersService;
};

export const globalContainer = createContainer<Cradle>();

globalContainer.register({
  usersRepository: asClass(UsersRepository).singleton(),
  usersService: asClass(UsersService).singleton(),
});
