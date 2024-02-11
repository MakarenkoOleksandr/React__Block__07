## Exercise 1 / Form Validation ( function )

-   Create a brand new React application with 'Create React App' by running "create-react-app ex01" in the terminal from 03_react/block07 folder.

-   Create a form that gets an email, a password and a password confirmation inputs + a button to submit the form.

-   Email input should have name="email", password input should have name="password" and confirm password input should have name="password2"

-   You should also create a message box as an `h2` that will change depending on the user input.

**If the email doesn't contain any @ or more than one @**

-   Background : red
-   Message: "Please, provide a valid email."

**If the password doesn't match the second password**

-   Background : red
-   Message: Passwords should match.

**If the password has less than 8 characters**

-   Background : red
-   Message: Password must have at least 8 characters.

**Otherwise**:

-   Background : green
-   Message: Successfully registered

## Requirements:

-   The message box should be originally not visible
-   The message should disappear after 2 seconds of being displayed

`Note: bear in mind that if you set type="email" on the input it will do the validation for you but you will not be able to create the customized message such as 'please provide a valid email'`
