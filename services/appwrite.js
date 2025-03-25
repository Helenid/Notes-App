import  {  Client, Databases, Account } from 'react-native-appwrite';
import { Platform } from 'react-native';

// const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
// const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
// const db = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
// const noteCol = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTE_ID;
const bundleId = process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID;
const packageName = process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME;

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    col: {
        note: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTE_ID,
    }
};

// if (!endpoint || !projectId || !db || !noteCol) {
//     throw new Error('Appwrite configuration missing. Ensure all EXPO_PUBLIC_APPWRITE_* variables are set.');
// }

const client = new Client()
.setEndpoint (config.endpoint)
.setProject(config.projectId);


console.log('Appwrite Endpoint:', config.endpoint);
console.log('Appwrite Project ID:', config.projectId);

switch (Platform.OS) {
    case 'ios':
        if (bundleId) {
            client.setPlatform(bundleId);
            // console.log('Appwrite Platform (iOS):', bundleId);
        }else {
            // console.warn('EXPO_PUBLIC_APPWRITE_BUNDLE_ID not set.');
            }
        break;
    case 'android':
        if (packageName) {
            client.setPlatform(packageName);
            // console.log('Appwrite Platform (Android):', packageName);
        } else {
            // console.warn('EXPO_PUBLIC_APPWRITE_PACKAGE_NAME not set.');
        }
        break;
        default:
            // console.warn('Platform not recognized. Appwrite platform not set')

}
const database = new Databases(client);
const account = new Account(client);

export { database, config, client, account };


// import  {  Client, Databases, Account } from 'react-native-appwrite';

// import { Platform } from 'react-native';



// const config = {
//  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,

//  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,

//  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,

//  col: {

//  note: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTE_ID,

//  }

// };



// const client = new Client()

// .setEndpoint (config.endpoint)

// .setProject(config.projectId);







// switch (Platform.OS) {

//     case 'ios':

//         client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);

//         break;

//     case 'android':

//         client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);

//         break;



// }

// const database = new Databases(client);

// const account = new Account(client);

// export { database, config, client, account };