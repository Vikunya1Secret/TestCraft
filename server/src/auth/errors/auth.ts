export class UserExistsError extends Error {
    constructor() {
      super('Пользователь с таким email уже существует');
      this.name = 'UserExistsError';
    }
  }
  
  export class UserNotFoundError extends Error {
    constructor() {
      super('Пользователь не найден');
      this.name = 'UserNotFoundError';
    }
  }
  
  export class InvalidPasswordError extends Error {
    constructor() {
      super('Неверный пароль');
      this.name = 'InvalidPasswordError';
    }
  }
  
  export class InvalidTokenError extends Error {
    constructor() {
      super('Недействительный токен');
      this.name = 'InvalidTokenError';
    }
  }