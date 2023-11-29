export class UserNotExists extends Error {
  constructor() {
    super('User does not exist.')
  }
}
