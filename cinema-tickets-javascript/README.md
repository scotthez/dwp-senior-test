# DWP Test

This NodeJS project is a test required for DWP.

## Prerequisites to start the app

- Create a `.env` file and copy contents (and update as necessary) from `.env-sample` file.

## Scripts

Install:
```
npm install
```
Run unit tests (Mocha/Chai):
```
npm test
```

Generate test coverage report:
```
npm run coverage
```

Generate linting report:
```
npm run lint
```

Start server:
```
npm start
```

Example API Request Body:
```
{
    "accountId": 1,
     "tickets": {
        "adults": 0,
        "childrens": 1,
        "infants": 19
     }
}
```

API Endpoint:
```
http://localhost:3000/purchase
```