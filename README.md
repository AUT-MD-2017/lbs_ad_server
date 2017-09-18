# Location-based APP
## Installation & Setup Environment
### 1. Fork the repository to your Github
Everyone should use his own repository to develop a new feature, and then make a `pull request` (PR) for requesting merging the code into master branch. So, first of all, you should click the `Fork` button which is at the top-left of the Github to make a new copy of the repository to your own.
[Screenshot](https://drive.google.com/open?id=0B7nEHGVPFeE9dG5tc1VQdmJKbkk)

### 2. Clone the code into your local environment
Use `Git clone` to clone a mirror copy of code to your dist (Run the command on your terminal):
`git clone https://github.com/[YOUR USERNAME]/lbs_ad_app.git`

### 3. Install dependencies
>
cd lbs_ad_server
npm install
`- or - (if using yarn)`
yarn

### 4. Run the server
>
cd lbs_ad_server<br>
npm run dev-server

Then, you can visit http://127.0.0.1:3000/api/locations to fetch locations data.

### 5. Enable auto-compile the assets while development
`npm run dev`
More useful scripts can be achieved at package.json.

### 6. At least, the code should pass lint scripts & CI before making a PR
Switch on Travis CI for you local branch: https://travis-ci.org/profile

## Tech Stacks
1. [Express.js](https://expressjs.com/)
2. [Faker.js](https://github.com/marak/Faker.js/)
___
May be used in future:
3. [Sequelize](http://docs.sequelizejs.com/)
4. [Passport.js](http://passportjs.org/)
