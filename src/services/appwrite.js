// /src/services/appwrite.js
import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite Cloud kullanıyorsan
  .setProject('67eff018000f1238c48a'); // Appwrite Console’dan aldığın Project ID

const account = new Account(client);

export { client, account };