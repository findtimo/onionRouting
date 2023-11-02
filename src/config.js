// const config = {
//   apiKey: 'AIzaSyCydxBW9ZBs-l_EX5v2hAD4-e1TkVQIf2o',
//   authDomain: 'firedatatest-b55b1.firebaseapp.com',
//   databaseURL: 'https://firedatatest-b55b1.firebaseio.com',
//   projectId: 'firedatatest-b55b1',
//   storageBucket: 'firedatatest-b55b1.appspot.com',
//   messagingSenderId: '515900348614',
//   appId: '1:515900348614:web:f769f8ea581a0cbffe9fc7'
// }

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export default config
