import { User } from '../modules/user/user.entity';

declare global {
    namespace Express {
        interface Request {
            user?: Partial<User>;
        }
    }
}