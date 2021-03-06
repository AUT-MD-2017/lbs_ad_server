# Location-based Server
## Installation & Setup Environment
### 1. Fork the repository to your Github
Everyone should use his own repository to develop a new feature, and then make a `pull request` (PR) for requesting merging the code into master branch. So, first of all, you should click the `Fork` button which is at the top-left of the Github to make a new copy of the repository to your own.
[Screenshot](https://drive.google.com/open?id=0B7nEHGVPFeE9dG5tc1VQdmJKbkk)

### 2. Clone the code into your local environment
Use `Git clone` to clone a mirror copy of code to your dist (Run the command on your terminal):
```shell
git clone https://github.com/[YOUR USERNAME]/lbs_ad_server.git
```

### 3. Install dependencies
> cd lbs_ad_server<br>
> npm install<br>
> `- or - (if using yarn)`<br>
> yarn

### 4. Run the server
> cd lbs_ad_server<br>
> npm run dev-server
Note that, if there is error about missing `dist/manifest.json` , you should run `npm run dev` for the first time.

Then, you can visit http://127.0.0.1:3000/api/locations to fetch locations data.

### 5. Use local configuration
Sometimes we use local configurations to make some personal customizing. For example, to use fake api for local development. In this case, you should add your own `local_config.js` file in root directory. The content of local_config follow the same structure of config.js, but it will overwrite the same `key-value` in config file. A example of using mock data may like this:
```javascript
module.exports = {
  useFakeApi: true,
};
```

### 6. Enable auto-compile the assets while development
`npm run dev`
More useful scripts can be achieved at package.json.

### 7. At least, the code should pass lint scripts & CI before making a PR
Switch on Travis CI for you local branch: https://travis-ci.org/profile


## Syncing your local branch with the master
### 1. Configuring the upstream
Following this tutorial: https://help.github.com/articles/configuring-a-remote-for-a-fork/

### 2. Syncing the local branch
```shell
git checkout master
git fetch --all
git rebase upstream/master
git push
```

Note that, each time when you develop a future, you should use a separated branch.
```shell
git checkout -b [the new branche nanme]
```


## Tech Stacks
1. [Express.js](https://expressjs.com/)
2. [Faker.js](https://github.com/marak/Faker.js/)
___
May be used in future:

3. [Sequelize](http://docs.sequelizejs.com/)
4. [Passport.js](http://passportjs.org/)
