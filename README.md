# Steps for running this code on your local environment

### Prerequisites:
- PostgreSQL (at least v13)
- Java Development Kit (v21)
- Node (at least v18)

## Step 1:
Open a terminal window and clone this repository to your local device
```bash
git clone 'repo url'
```

## Step 2:
In the frontend folder, create a .env file and copy the content of .env.example into it

## Step 3:
Create a postgresql database (preferrably 'ccsdb'). If you choose another name, be sure to change it in frontend/.env (DATABASE_URL=postgresql://user:password@localhost:5432/dbname) and backend/src/main/resources/application.properties

## Step 4
Back to the terminal, CD into the created folder
```bash
cd ccs(for example)
```

## Step 5
CD into frontend folder and run npm install
```bash
cd frontend && npm install
```

## Step 6
At this point, the frontend repo should be ready, so run:
```bash
npm run dev
```

## Step 7
Create another terminal window at your repository folder

## Step 8
CD into the backend folder
``` bash
cd backend
```

## Step 9
Start the server by running this command in the terminal:
``` bash
./mvnw spring-boot:run
```
