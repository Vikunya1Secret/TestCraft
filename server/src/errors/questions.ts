export class TestNotFoundError extends Error {
    constructor() {
      super('Test not found');
      this.name = 'TestNotFoundError';
    }
  }