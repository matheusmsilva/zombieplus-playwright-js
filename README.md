![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 About

Repository for the automated testing project of the Zombie Plus system, built in the Playwright Zombie Edition course! Playwright is an open-source tool developed by Microsoft that revolutionizes web system test automation, offering an effective and highly reliable approach.

## 💻 Technologies
- Node.js
- Playwright
- JavaScript
- Faker
- PostgreSQL

## 🤖 How to run

1. Clone the repository and install dependencies for application on folder **application/web** and **application/api**
```
npm install
```

2. Start the application locally. It is necessary to run this for Backend and Frontend Layer
```
npm run dev
```

3. Install dependencies for playwright project on root folder
```
npm install
```

4. Run tests in Headless mode
```
npx playwright test 
```

5. View the test report
```
npx playwright show-report
```

## Project architecture

This project uses the AppActions design pattern, which involves creating classes based on your application's features. Each class is responsible for all methods related to its feature. 

<hr>
Course available at https://qaxperience.com
