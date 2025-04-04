# Fundezy PropTrade Platform

## API Documentation

### MT5 Account Management

Base URL: `https://mt5accounts-6wrzc5r7aq-uc.a.run.app`

#### Endpoints

1. **Get MT5 Accounts by Email**
   ```
   GET /email/{email}
   ```
   Retrieves all MT5 accounts associated with the specified email address.

   Response:
   ```typescript
   interface MT5Account {
     id: string;
     server: string;
     login: string;
     password: string;
     email: string;
     status: string;
     createdAt: {
       _seconds: number;
       _nanoseconds: number;
     };
     updatedAt: {
       _seconds: number;
       _nanoseconds: number;
     };
   }
   ```

2. **Get MT5 Account by ID**
   ```
   GET /{accountId}
   ```
   Retrieves a specific MT5 account by its ID.

3. **Update MT5 Account**
   ```
   PUT /{accountId}
   ```
   Updates an existing MT5 account's details.

   Request Body:
   ```typescript
   {
     server: string;
     login: string;
     password: string;
     email: string;
     status: string;
     updatedAt: Date;
   }
   ```

### Demo Account Management

Base URL: `https://us-central1-fundezy-app.cloudfunctions.net/demoAccounts`

#### Endpoints

1. **Get Available Demo Account**
   ```
   GET /available
   ```
   Retrieves an available demo account for assignment.

   Response:
   ```typescript
   interface DemoAccount {
     id: string;
     login: string;
     password: string;
     readonly: string;
     server: string;
     email: string;
     assignedTo: string;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

2. **Assign Demo Account**
   ```
   POST /assign/{accountId}
   ```
   Assigns a demo account to a user.

   Request Body:
   ```typescript
   {
     mt5AccountId: string;
   }
   ```

3. **Link Users to Demo Account**
   ```
   POST /{demoAccountId}/link
   ```
   Links multiple users to a demo account.

   Request Body:
   ```typescript
   {
     emails: string[];
   }
   ```

### User Management

Base URL: `https://us-central1-fundezy-app.cloudfunctions.net/api`

#### Endpoints

1. **Check Admin Status**
   ```
   GET /checkAdmin?email={email}
   ```
   Checks if a user has admin privileges.

   Response:
   ```typescript
   {
     isAdmin: boolean;
   }
   ```

2. **Get All Users**
   ```
   GET /users
   ```
   Retrieves a list of all users in the system.

   Response:
   ```typescript
   {
     users: {
       email: string;
     }[];
   }
   ```

### Audit Logging

Base URL: `https://us-central1-fundezy-app.cloudfunctions.net/audit_logs`

#### Endpoints

1. **Create Audit Log**
   ```
   POST /
   ```
   Creates a new audit log entry.

   Request Body:
   ```typescript
   interface AuditLog {
     action: string;
     email: string;
     mt5AccountId: string;
     timestamp: Date;
     details: {
       server: string;
       login: string;
       previousStatus?: string;
       newStatus?: string;
       previousEmail?: string;
       newEmail?: string;
     };
   }
   ```

## Development

### Environment Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deployment

The project is configured for deployment to Netlify. Any push to the main branch will trigger an automatic deployment.