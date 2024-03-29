# COMP1101 Summative 1 - William Maltby-Wehner

## :warning: Disclaimer :warning:
This software contains several vulnerabilities for XSS and SQL injection, These were not criteria for the assessment and due to time constraints were not implemented. Do not connect this to a public facing site or a database where sensitive data is accessible.

## Description
A simple Review system, allows posting of reviews with a rating between 1 and 5 :star: 

## Contributing
- Please follow commit messages outlined under the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard

## License
The code in this repository is protected by the [Creative Commons Zero v1.0 Universal]() License

--- 

## Important endpoints
- `/` - Web root
- `/api/` - Base route for all API endpoints
	- `/api/review/` - All review API endpoints
	- `/api/user/` - All user API endpoints
	- `/api/docs/` - Home of all API documentation
- `/test-coverage/` - Jest test coverage analysis

## Installation
1. Clone this repository using `git clone {REPO_URL}`
2. Install dependencies using `npm i`
3. Copy `.env.example` to `.env` 
4. Configure `.env` with relevant details including
	1. MariaDB database connection details
	2. API URL
	3. Desired application port
	4. Environment {`production`,`development`}
5. Run database migrations using `npm run migrate:up`
6. Build the latest CSS using `npm run build`
7. To run a production server, start it using either `npm start` or `npm run start`

---

## Features
### API
#### Reviews
- [x] ~~Get Specified Review By ID~~
- [x] ~~Get All Reviews~~
- [x] ~~Create Review~~
- [x] ~~Delete Review Specified by ID~~
#### Users
- [x] ~~Get Specified User By ID~~
- [x] ~~Get Specified User By Name~~
- [x] ~~Get All Users~~
- [x] ~~Create User~~
- [x] ~~Delete User Specified By ID and all related Reviews~~
### Frontend
#### Reviews
- [x] ~~Post New Review~~
- [x] ~~Read All Existing Reviews~~
#### Users
- [x] ~~Add Avatar To A User Specified By Username~~

---

##### Contact
William Maltby Wehner | <ww@byteania.com>