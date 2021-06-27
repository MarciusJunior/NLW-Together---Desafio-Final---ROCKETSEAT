import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
      name: string;
      email: string;
      admin?: boolean;
      password: string
}

class CreateUserService{

      async execute({name, email, admin = false, password} : IUserRequest){
            const usersRepository = getCustomRepository(UsersRepositories);
            
            //Caso a pessoa não tenha colocado o email corretamente.
            if(!email){
              throw new Error("Email incorrect");
            }

            const userAlreadyExists = await usersRepository
            .findOne({email});

            //Caso já exista um usuário com este e-mail.
            if(userAlreadyExists){
                    throw new Error("Users already exists with this Email.")
            }

            const passwordHash = await hash(password, 8);

            const user = usersRepository.create({
              name,
              email,
              admin,
              password: passwordHash,
            });

            //Salvar os dados do Usuário.
            await usersRepository.save(user);

            return user;

      }

}

export { CreateUserService }