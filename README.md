# YardSale

YardSale is a buy-and-sell app where users can search, view, and post items for sale or to give away.  When a user comments on an item, the owner receives an email notification, opening up lines of communication between the users if it is agreeable to the item owner.

### Stack

  - Ruby 2.6.5
  - Rails 5.2.4.3
  - React 16.8.0
  - PostgresSQL 12

### Set Up

Complete the following steps to create an instance of YardSale on your local machine.

Open your terminal and execute the following command to clone the GitHub repository.
Make sure you execute this command from the directory that you wish to keep this project.
If you do not have git configured on your machine you may refer to this guide: https://github.com/git-guides/install-git

  `$ git clone https://github.com/BenjaminFairbank/heroku-sudoku.git`

Once you have downloaded the repository to your local machine, navigate into the project directory.

  `$ cd yardsale`

Download required ruby gems by executing:

  `$ bundle install`

Download required yarn and node packages with:

  `$ yarn install`

Create the PostgresSQL database with the following commands:

  `$ rake db:create`
  `$ rake db:migrate`

Before running the app locally one must still configure a number of things.

### AWS S3

YardSale uses AWS S3 for cloud image storage.  You must sign up for an AWS account in order to configure the AWS Access Key ID and the AWS Secret Access Key needed to run the app.  After that, you will need to configure an s3 bucket for development, and also for production if you wish to deploy.  If you are unfamiliar with AWS, refer to the documentation here: https://aws.amazon.com/s3/getting-started/

Once you have completed the setup, you must provide the keys in .env file in the project's directory as such:

  `AWS_ACCESS_KEY_ID='Your-access-key-ID'`
  `AWS_SECRET_ACCESS_KEY='Your-secret-access-key'`
  `DEVELOPMENT_S3_BUCKET='The-name-of-your-development-bucket'`
  `PRODUCTION_S3_BUCKET='The-name-of-your-production-bucket'`

...replacing the values in single quotations with your own corresponding values.

### Open Weather API

YardSale also depends on weather data from a third-party API with a secret key.

Sign up for a free OpenWeatherAPI key here: https://openweathermap.org/appid

Once you've acquired a key configure it in the .env file as such:

  `OPEN_WEATHER_API_KEY='Your-open-weather-api-key'`

...replacing the value in single quotations with your own key.

### Gmail Notifications

Finally, YardSale utilizes email notifications which requires a gmail account.

Once you acquire an account, enter the credentials into the .env file as such:

  `GMAIL_ACCOUNT_LOGIN='Your-gmail-address'`
  `GMAIL_ACCOUNT_PASSWORD='Your-gmail-password'`

...once again, replacing the values in single quotations with your own information.

Important: You will need to configure your gmail account so that the app may access it.  Google's security measures prevent such access by default.  You must got to the Account Management settings and go to Security.  Scroll down to 'Less Secure App Access' and turn it to ON.  This is less secure so it's not recommended to use your personal email.  It's better to create a dedicated account.  Once you have updated your settings the app may still have trouble sending emails.  While logged into to the chosen account, visit: http://www.google.com/accounts/DisplayUnlockCaptcha and click 'Continue' and try again shortly after.

Note:  Your account will automatically switch 'Less Secure App Access' to OFF if the account is not being utilized often for security reasons.  These steps may need to be repeated if the apps email features are not used often.  YardSale uses account confirmation emails so setting up email notifications are crucial to app access.

If you wish not to use gmail, the config.action_mailer.smtp_settings can be changed in the config/environments/development.rb file and the config/environments/production.rb file.

If you cannot configure the email setup, you may use the rails console to manually confirm users to gain access to the site.  From the project directory execute:

  `$ rails c`
  `$ User.all.last.confirm`
  `$ exit`

...after which the last user to sign-up will be able to sign in.

### Development Environment

The application is now ready to be run in a development environment on your local machine.

To do so, execute the following from the project's directory:

  `$ rails s`

Then, in a separate terminal, within the same directory execute:

  `$ yarn start`

The project will then be viewable by visiting 'localhost:3000' in your browser.

### Testing

The test suite can be run by executing:

  `$ rspec`

Status:

[![Codeship Status for BenjaminFairbank/yardsale](https://app.codeship.com/projects/aaf9c140-811e-0138-f3d6-667c5ff10693/status?branch=master)](https://app.codeship.com/projects/397730)


## To Do

 - Image resizing
 - Image gallery for each item
 - Grid styling for admin page
 - Style all mailers
 - Chat abilities
 - Preferred exchange points and google maps
 - Refactor with materialUI
 - Refactor with Redux
...

## Inspiration

YardSale began as my final project (a.k.a. 'breakable-toy') while attending Launch Academy.  I continue to play with it, and break it, from time to time.  The application was inspired by my wife, who regularly buys and sells goods online, and who motivated me to start my journey into the field of web development to begin with.


### Please enjoy this application! Any regards can be directed to benfairbank26@gmail.com
