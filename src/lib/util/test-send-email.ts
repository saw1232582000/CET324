import { EmailService } from "./email-repository";
import { EmailJs } from "./emailJs";


const configOption: Record<string, any> = {
  publicKey: "tnyAXG83K-uEGQSXW",
};
const templateId = "template_vo9o19u";
const serviceId = "service_e6gjlig";
const templateParams = {
  to_name: "Saw",
  from_name: "Doom",
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

export async function sendTestMail() {
  const response = await emailService.SendMail();

  return response;
}
