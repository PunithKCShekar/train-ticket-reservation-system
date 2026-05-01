# Supabase (PostgreSQL) Database Setup

Follow these steps to set up your database in **Supabase**:

### 1. Create the Database and Tables
Copy and paste the following script into the **SQL Editor** in your Supabase dashboard and click **Run**.

```sql
-- 1. Drop existing tables to ensure a clean setup
DROP TABLE IF EXISTS HISTORY;
DROP TABLE IF EXISTS CUSTOMER;
DROP TABLE IF EXISTS ADMIN;
DROP TABLE IF EXISTS TRAIN;

-- 2. Create CUSTOMER Table
CREATE TABLE CUSTOMER (
    MAILID VARCHAR(40) PRIMARY KEY,
    PWORD VARCHAR(20) NOT NULL,
    FNAME VARCHAR(20) NOT NULL,
    LNAME VARCHAR(20),
    ADDR VARCHAR(100),
    PHNO BIGINT NOT NULL
);

-- 3. Create ADMIN Table
CREATE TABLE ADMIN (
    MAILID VARCHAR(40) PRIMARY KEY,
    PWORD VARCHAR(20) NOT NULL,
    FNAME VARCHAR(20) NOT NULL,
    LNAME VARCHAR(20),
    ADDR VARCHAR(100),
    PHNO BIGINT NOT NULL
);

-- 4. Create TRAIN Table
CREATE TABLE TRAIN (
    TR_NO BIGINT PRIMARY KEY,
    TR_NAME VARCHAR(70) NOT NULL,
    FROM_STN VARCHAR(20) NOT NULL,
    TO_STN VARCHAR(20) NOT NULL,
    SEATS INT NOT NULL,
    FARE DECIMAL(6,2) NOT NULL
);

-- 5. Create HISTORY Table
CREATE TABLE HISTORY (
    TRANSID VARCHAR(36) PRIMARY KEY,
    MAILID VARCHAR(40),
    TR_NO BIGINT,
    DATE DATE,
    FROM_STN VARCHAR(20) NOT NULL,
    TO_STN VARCHAR(20) NOT NULL,
    SEATS INT NOT NULL,
    AMOUNT DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (MAILID) REFERENCES CUSTOMER(MAILID)
);

-- 6. Insert Initial Data
INSERT INTO ADMIN (MAILID, PWORD, FNAME, LNAME, ADDR, PHNO) 
VALUES ('admin@demo.com', 'admin', 'System', 'Admin', 'Demo Address 123 colony', 9874561230);

INSERT INTO CUSTOMER (MAILID, PWORD, FNAME, LNAME, ADDR, PHNO) 
VALUES ('shashi@demo.com', 'shashi', 'Shashi', 'Raj', 'Kolkata, West Bengal', 954745222);

INSERT INTO TRAIN (TR_NO, TR_NAME, FROM_STN, TO_STN, SEATS, FARE) 
VALUES (10001, 'JODHPUR EXP', 'HOWRAH', 'JODHPUR', 152, 490.50);

INSERT INTO TRAIN (TR_NO, TR_NAME, FROM_STN, TO_STN, SEATS, FARE) 
VALUES (10002, 'YAMUNA EXP', 'GAYA', 'DELHI', 52, 550.50);

INSERT INTO TRAIN (TR_NO, TR_NAME, FROM_STN, TO_STN, SEATS, FARE) 
VALUES (10003, 'NILANCHAL EXP', 'GAYA', 'HOWRAH', 92, 451.00);

INSERT INTO TRAIN (TR_NO, TR_NAME, FROM_STN, TO_STN, SEATS, FARE) 
VALUES (10004, 'JAN SATABDI EXP', 'RANCHI', 'PATNA', 182, 550.00);

INSERT INTO TRAIN (TR_NO, TR_NAME, FROM_STN, TO_STN, SEATS, FARE) 
VALUES (10005, 'GANGE EXP', 'MUMBAI', 'KERALA', 12, 945.00);

INSERT INTO TRAIN (TR_NO, TR_NAME, FROM_STN, TO_STN, SEATS, FARE) 
VALUES (10006, 'GARIB RATH EXP', 'PATNA', 'DELHI', 1, 1450.75);
```

### 2. Configure Your Application
After running the SQL script, you need to update `src/application.properties` with your Supabase credentials.

1.  Go to your **Supabase Project Settings**.
2.  Click on **Database**.
3.  Under **Connection string**, select **JDBC**.
4.  Copy the connection string and paste it into `connectionString` in `src/application.properties`.
5.  Update the `username` and `password` with your Supabase database user and password.

> [!NOTE]
> Make sure to use the **Transaction Pooler** (port 5432 or 6543) if you are deploying to a serverless environment, but standard port 5432 should work fine for this application.
