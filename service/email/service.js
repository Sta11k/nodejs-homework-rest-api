import Mailgen from "mailgen";
class EmailService {
  constructor(env, sender) {
    this.sender = sender;

    switch (env) {
      case "development":
        this.link = "http://localhost:3000/";
        break;

      case "test":
        this.link = "http://localhost:4000/login";
        break;

      case "prodaction":
        this.link = "http://heroku";
        break;
      default:
        this.link = "http://localhost:3000/";
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "User Group 35",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Залітай на борт Welcome налітай на торт, бери вилку) .",
        action: {
          instructions: "To get started with our API, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/veryfy/${verifyToken}`,
          },
        },
        outro: "Якщо потрібна допомога, напишіть нам.",
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const msg = {
      to: email,
      subject: "Verify email",
      html: emailBody,
    };

    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default EmailService;
