// src/services/appwrite.js
import { Client, Storage, Account, Databases, AppwriteException, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite Cloud kullanıyorsan
  .setProject('67eff018000f1238c48a'); // Appwrite Console’dan aldığın Project ID

// Initialize the Account service
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);



export { client, account, databases, storage, ID, AppwriteException };
