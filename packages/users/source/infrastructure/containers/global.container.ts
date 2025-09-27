import { UsersService } from '@payap/users/application/services/users.service.ts';
import { UsersRepository } from '@payap/users/infrastructure/repositories/users.repository.ts';
import { asClass, createContainer } from 'awilix';

type Cradle = {
  usersRepository: UsersRepository;
  usersService: UsersService;
};

export const globalContainer = createContainer<Cradle>();

globalContainer.register({
  usersRepository: asClass(UsersRepository).singleton(),
  usersService: asClass(UsersService).singleton(),
});
