require('dotenv').config();
const admin = require('firebase-admin');

try {
    // Parseia as credenciais do Firebase a partir da variável de ambiente
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    console.log('Service Account:', serviceAccount); 
    // Exibe as credenciais logadas no terminal.

    // Inicialização do Firebase Admin
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });

    // Inicialização do Firestore
    const db = admin.firestore();
    module.exports = db;

} catch (error) {
    console.error('Erro ao inicializar o Firebase Admin:', error);
    // Captura erros
}