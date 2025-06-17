# Tracking API

Express API with Prisma and PostgreSQL (NeonDB) for tracking sessions.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Update the `.env` file with your NeonDB PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@db.neon.tech:5432/dbname?sslmode=require"
   PORT=3000
   ```

3. Generate Prisma client:
   ```
   npx prisma generate
   ```

4. Apply database migrations:
   ```
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```
   npm start
   ```
   Or for development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

### Start Session
- **URL**: `/sessions/start`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "digiPin": "ABC12345"
  }
  ```
- **Response**:
  ```json
  {
    "sessionId": "session_unique_id_123",
    "timestamp": 1688454609000
  }
  ```

### Tracking Data
- **URL**: `/tracking/data`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "sessionId": "session_unique_id_123",
    "digiPin": "ABC12345",
    "timestamp": 1688454639000
  }
  ```
- **Response**:
  ```json
  {
    "success": true
  }
  ```

### End Session
- **URL**: `/sessions/end`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "sessionId": "session_unique_id_123",
    "endTimestamp": 1688458209000
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "sessionSummary": {
      "sessionId": "session_unique_id_123",
      "startTime": 1688454609000,
      "endTime": 1688458209000,
      "duration": 3600000,
      "dataPointsCount": 120
    }
  }
  ```
