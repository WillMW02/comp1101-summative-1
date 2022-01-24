# COMP1101 Summative 1 - William Maltby-Wehner

## Description
A simple Review system, allows posting of reviews with a rating between 1 and 5 :star: 

## Contributing
- Please follow commit messages outlined under the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard

## License
The code in this repository is protected by the [Creative Commons Zero v1.0 Universal]() License

--- 

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
- [ ] Get Specified User By ID
- [ ] Get All Users
- [ ] Create User
- [ ] Delete User Specified By ID and all related Reviews
### Frontend
#### Reviews
- [ ] Post New Review
- [ ] Read All Existing Reviews
#### Users
- [ ] Register New User
- [ ] Add Avatar To A User Specified By Username (Case Insensitive)
- [ ] "Log In" to existing user to post reviews under that user

---

##### Contact
William Maltby Wehner | <ww@byteania.com>