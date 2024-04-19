export class EmailService {
  service: any;

  constructor(service: any) {
    this.service = service;
  }

  InitService(): any {
    this.service.init();
  }
  async SendMail<T>(): Promise<T> {
    const response = await this.service.SendMail();
    return response;
  }
}
