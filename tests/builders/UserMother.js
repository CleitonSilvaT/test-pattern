import { User } from '../../src/domain/User.js';

export default class UserMother {
  static umUsuarioPadrao() {
    return new User('u1', 'João Silva', 'joao@example.com', 'PADRAO');
  }

  static umUsuarioPremium() {
    return new User('u2', 'Maria Premium', 'maria.premium@example.com', 'PREMIUM');
  }
}
