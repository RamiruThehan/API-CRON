# API-CRON

**API-CRON** is an API developed using Node.js, Express and MongoDB.

## Key Features

 - Easy to use
 - CRON Functions
 - Open Source
 - Used MongoDB as the Database

## **How to Setup API-CRON**
**Configure API Sketch**

 1. Install [Node.js](https://nodejs.org/en/download) if you don’t have.
 2. Clone this repository by running the command: `https://github.com/RamiruThehan/API-CRON.git`
 3. Change the directory to the **/API**
 4. In your CLI hit command: `npm init -y`
 5. Next hit command: `npm install express mongoose body-parser node-cron`
 
 **Configuring MongoDB**
 
 1. Sign in to  [MongoDB Atlas](https://account.mongodb.com/account/login)  or create an account if you don’t have one.
 2. Create a Free Shared Cluster and configure your database credentials.
 3. Wait for the cluster to finish setting up.
 4. Click on **Connect**
 
![](https://miro.medium.com/v2/resize:fit:700/1*iZjB-yzPJdBiFLY5Du7wcg.png)

5. Choose **Connect your Application**

![](https://miro.medium.com/v2/resize:fit:700/1*DafkzA3Wh4AXtCZp0NUKuA.png)

6. Copy the connect String.

![](https://miro.medium.com/v2/resize:fit:700/1*mHyn8Yngc0IN9U8EUBjaTA.png)

7. Next go to **Collection** tab of your Cluster and click **Add my own data**

![](https://miro.medium.com/v2/resize:fit:700/1*x_hHXekAfkWezRghlP1CCw.png)

8. Next declare a New Database 
![](https://miro.medium.com/v2/resize:fit:700/1*KkYc7lNB0NCgVVblxe9Lww.png)

**Deploy the Server**
1. Open **index.js** file in your favorite code editor. Here I use Microsoft Visual Studio 2019
2. Replace your Connect String with `mongoose.connect('Replace with your Connect String'`
3. Also be aware to give your credentials of Database in the Connect String.
4. In your CLI hit command: `node index.js`

**Test the Server**
 1. Change the directory to the **/Sender**
 2. In your CLI hit command: `npm init -y`
 3. Next hit command: `npm install axios`
 4. Open **send.js** and change the transfer content as you like.
 5. Next hit command: `node send.js`
 6. Now go to Collection tab; select your database; You can see data streaming.
 7. After 2 days the database would be empty due to CRUD function.
