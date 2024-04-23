import emailjs from "@emailjs/browser";

export class EmailJs {
  templateParam: any;
  serviceId: string;
  configOptions: any;
  templateId:string;
  constructor(
    configOptions: Record<string, any> = {},
    templateParam: Record<string, any> = {},
    serviceId: string= "",
    templateId:string=""
  ) {
    this.templateParam = templateParam;
    this.serviceId = serviceId;
    this.configOptions = configOptions;
    this.templateId=templateId;
    emailjs.init(this.configOptions);
  }
  init(): any {
    emailjs.init(this.configOptions);
  }
  async SendMail() {
    try {
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        this.templateParam,
      );
      
      return response;
    } catch (e: unknown) {
      return null;
    }
  }
}
