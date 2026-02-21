import { type EmailJobDataDTO } from "@project/shared";
import type { Job } from "bullmq";
import { EmailTemplates } from "../../templates/email.templates";
import { resend } from "../../config/resend";
import { env } from "../../config/env";

export const emailProcessor = async(job:Job<EmailJobDataDTO>)=>{
    const {to,name,type,payload} = job.data

    console.log(`✉️ [PROCESSOR] Preparing to send ${type} to ${to}`);

    let template;
    switch(type) {
        case  "VERIFY_EMAIL":
       if (!payload.otp) throw new Error("OTP missing for verification email");
        template = EmailTemplates.VERIFY_EMAIL(name ?? "User",payload.otp.toString())
        break;

        case "PASSWORD_RESET":
            if(!payload.link) throw new Error("Reset link missing");
            template = EmailTemplates.PASSWORD_RESET(name??"User",payload.link)
            break;

        case "WELCOME_EMAIL":
            template = EmailTemplates.WELCOME_EMAIL(name ?? "User")
            break;

        default:
            throw new Error(`Unhandled email type: ${type}`)
    }


    await deliveredEmail(to, template!.subject, template.html);
    return {success:true, sentAt:new Date().toISOString()}

}

async function deliveredEmail(to: string, subject: string, html: string) {
    const {data,error} = await resend.emails.send({
        from:env.FROM_EMAIL,
        to,
        subject,
        html
    })
    if(error){
        console.error({error})
        throw new Error("Email does not send. Resend Fails!")
    }

    console.log({data})
}