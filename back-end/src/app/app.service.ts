import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi guys!';
  }

  getLogins() {
    return [
      {
        login: "login 1",
        password: "password 1"
      },
      {
        login: "login 2",
        password: "password 2"
      },
      {
        login: "login 3",
        password: "password 3"
      },

    ]
  }
}
