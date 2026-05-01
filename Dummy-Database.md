# MySQL Database Setup for Train Ticket Reservation System

Follow these steps to set up your database using **MySQL Workbench**:

### 1. Create the Database and Tables
Copy and paste the following script into a new SQL Tab in MySQL Workbench and click the **Execute** (lightning bolt) icon. This script will clear any old structures and create the correct ones.

```sql
-- 1. Create and Use the Database
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

-- 2. Drop existing tables to ensure a clean setup
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS HISTORY;
DROP TABLE IF EXISTS CUSTOMER;
DROP TABLE IF EXISTS ADMIN;
DROP TABLE IF EXISTS TRAIN;
SET FOREIGN_KEY_CHECKS = 1;

-- 3. Create CUSTOMER Table
CREATE TABLE CUSTOMER (
    MAILID VARCHAR(40) PRIMARY KEY,
    PWORD VARCHAR(20) NOT NULL,
    FNAME VARCHAR(20) NOT NULL,
    LNAME VARCHAR(20),
    ADDR VARCHAR(100),
    PHNO BIGINT NOT NULL
);

-- 4. Create ADMIN Table
CREATE TABLE ADMIN (
    MAILID VARCHAR(40) PRIMARY KEY,
    PWORD VARCHAR(20) NOT NULL,
    FNAME VARCHAR(20) NOT NULL,
    LNAME VARCHAR(20),
    ADDR VARCHAR(100),
    PHNO BIGINT NOT NULL
);

-- 5. Create TRAIN Table
CREATE TABLE TRAIN (
    TR_NO BIGINT PRIMARY KEY,
    TR_NAME VARCHAR(70) NOT NULL,
    FROM_STN VARCHAR(20) NOT NULL,
    TO_STN VARCHAR(20) NOT NULL,
    SEATS INT NOT NULL,
    FARE DECIMAL(6,2) NOT NULL
);

-- 6. Create HISTORY Table
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

-- 7. Insert Initial Data
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

### 2. Verify Setup
Run these commands to ensure the data was inserted correctly:
```sql
SELECT * FROM ADMIN;
SELECT * FROM CUSTOMER;
SELECT * FROM TRAIN;
SELECT * FROM HISTORY;
```

### 3. Update Java Connection
After creating the database, ensure your `src/application.properties` matches your MySQL Workbench connection settings.
- **username**: root (or your MySQL user)
- **password**: (your password)
- **connectionString**: jdbc:mysql://localhost:3306/railway
