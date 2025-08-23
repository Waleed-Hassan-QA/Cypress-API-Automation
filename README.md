# REST API Automation with Cypress

![Cypress](https://img.shields.io/badge/Tested%20With-Cypress-04C38E?logo=cypress&logoColor=white)  
![Mocha](https://img.shields.io/badge/Framework-Mocha%20%26%20Chai-yellow?logo=mocha&logoColor=white)  
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub%20Actions-blue?logo=githubactions&logoColor=white)  
![Report](https://img.shields.io/badge/Report-Mocha%20Awesome-orange)

This project automates **CRUD operations of REST APIs** using **Cypress** along with **Assertions**.  
It includes both **positive and negative test cases** for the following API operations:

- **GET**  
- **POST**  
- **PUT**  
- **DELETE**



## 🔹 Test Coverage

### 1) GET API
- Get all user records  
- Get single user  
- Invalid endpoint validation  
- Invalid user ID validation  

### 2) POST API
- Create new user  
- Create new user & verify from GET API  
- Create duplicate users  
- Validation checks with wrong inputs  
- Invalid endpoint validation  

### 3) PUT API
- Update user data  
- Invalid user ID validation  
- Validation checks with wrong inputs  
- Invalid endpoint validation  
- Invalid token validation  

### 4) DELETE API
- Create & delete user  
- Invalid user ID validation  



## 🔹 Test Data
- Test data is stored in **fixtures** and reused across **POST** and **PUT** API calls.



## 🔹 Reporting
- Integrated with **Mocha Awesome Reports**.  
- A detailed HTML report is generated automatically after test execution.  



## 🔹 CI/CD Integration
- This project is integrated with **GitHub Actions**.  
- Tests run automatically on every code push.  



## ✅ Key Highlights

Covers positive & negative test cases

Validations for endpoints, IDs, inputs, and tokens

Reusable test data from fixtures

Automated reports for better visibility

CI/CD enabled for continuous testing



## 👨‍💻 Author
### Waleed Hassan | Senior QA Engineer 


