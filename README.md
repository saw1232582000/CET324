# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## Project Demo
- https://cet-324.vercel.app (Test CET324 project demo by clicking this link)


## Requirements
__Software Requirements:__

Node.js (version 18.17 or later): Next.js is a framework built on top of Node.js, so you'll need it installed on your development machine.  
You can download the latest version from the official Node.js website [download Node.Js here ->(https://nodejs.org/)].  
Package manager (npm or yarn): Node.js comes bundled with npm (Node Package Manager). You can also use yarn, a popular alternative package manager.

__Optional Requirements:__

Code editor or IDE: While not strictly required, using a code editor or IDE with Next.js support can significantly improve your   development experience. Popular options include Visual Studio Code with official Next.js extensions, WebStorm, or Sublime Text   with plugins.  
Basic understanding of web development: Having a grasp of HTML, CSS, and JavaScript will be beneficial when working with Next.js.  

## Setting CET324 Project

Run following command in project directory

-run __'npm install'__ (install necessary packages)  
-create a file called '.env' in the project root directory  
-copy environment variables from '.env.example' and paste them in '.env'  
-environment varibales values should be replaced with your own value such as database URL  
-run __'npx prisma migrate dev'__ (run migration script to database)  
-run __'npm run dev'__ (start running app)  

## Disclaimer

This prototype is intended for educational purposes and demonstrates security best practices. It's recommended to conduct further security assessments before deploying in a production environment.  

