import { CreateUserUsecase } from "../../application/usecase/users/createuser.usecase";
import { RefreshTokenUseCase } from "../../application/usecase/users/refreshtoken.usecase";
import { SignInUsecase } from "../../application/usecase/users/signin.usecase";
import { UserController } from "../../controller/user.controller";
import { UserRepositoryImp } from "../../infrastructure/repository/userRepo.imp";
import { SecurePasswordImp } from "../../infrastructure/services/securepassword.service";


const userRepository = new UserRepositoryImp();
const passwordSecure = new SecurePasswordImp();
const createUserUsecase = new CreateUserUsecase(userRepository, passwordSecure);
const signinUsecase = new SignInUsecase(userRepository, passwordSecure);
const refreshToken = new RefreshTokenUseCase(userRepository);
export const userControllerInterface = new UserController(createUserUsecase, signinUsecase, refreshToken);