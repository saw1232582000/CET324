


import { EmailService } from "./email-repository";
import { EmailJs } from "./emailJs";
import { generateTokenExpiredDate } from "~/lib/util/generateTokenExpireDate";



export async function sendMail(targetMail: string,token:string) {
  
  const configOption: Record<string, any> = {
    publicKey: "tnyAXG83K-uEGQSXW",
  };
  const templateId = "template_vo9o19u";
  const serviceId = "service_e6gjlig";
  const templateParams = {
    to_name: "Tester",
    from_name: "CET324 Assignment",
    userEmail: targetMail,
    message:
      `${process.env.BASE_URL}/server/resetPassword/${token}`,
  };
  const emailJsService = new EmailJs(
    configOption,
    templateParams,
    serviceId,
    templateId,
  );
  const emailService = new EmailService(emailJsService);
  
  const response = await emailService.SendMail();

  return response;
}
