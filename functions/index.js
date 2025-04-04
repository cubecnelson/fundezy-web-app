const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

// Initialize admin SDK
admin.initializeApp();

// Check admin status
exports.checkAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const email = req.query.email;
      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      const snapshot = await admin.firestore()
        .collection('admins')
        .where('email', '==', email)
        .get();

      res.json({ isAdmin: !snapshot.empty });
    } catch (error) {
      console.error('Error checking admin status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// List all users
exports.listUsers = functions.https.onCall(async (data, context) => {
  try {
    // Verify the request is from an admin
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const adminSnapshot = await admin.firestore()
      .collection('admins')
      .where('email', '==', context.auth.token.email)
      .get();

    if (adminSnapshot.empty) {
      throw new functions.https.HttpsError('permission-denied', 'User must be an admin');
    }

    // List all users
    const listUsersResult = await admin.auth().listUsers();
    
    // Return just the necessary user data
    return listUsersResult.users.map(user => ({
      email: user.email
    }));
  } catch (error) {
    console.error('Error listing users:', error);
    throw new functions.https.HttpsError('internal', 'Error listing users');
  }
});