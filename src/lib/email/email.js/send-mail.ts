import { EmailService } from "./email-repository";
import { EmailJs } from "./emailJs";

export async function sendMail(targetMail: string) {
  const configOption: Record<string, any> = {
    publicKey: "tnyAXG83K-uEGQSXW",
  };
  const templateId = "template_vo9o19u";
  const serviceId = "service_e6gjlig";
  const templateParams = {
    to_name: "Saw",
    from_name: "Doom",
    userEmail: targetMail,
    message:
      "https://tollgate-upload.s3.ap-southeast-1.amazonaws.com/TollCaptureLic_1D479320240129111915485Pic.jpg",
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
