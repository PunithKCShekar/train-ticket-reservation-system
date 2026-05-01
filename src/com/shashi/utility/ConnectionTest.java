package com.shashi.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ResourceBundle;

/**
 * A simple utility to test your MySQL connection settings from application.properties
 */
public class ConnectionTest {
    public static void main(String[] args) {
        try {
            // Load properties from src/application.properties
            ResourceBundle rb = ResourceBundle.getBundle("application");
            
            String driver = rb.getString("driverName");
            String url = rb.getString("connectionString");
            String user = rb.getString("username");
            String pass = rb.getString("password");

            System.out.println("Attempting to connect to: " + url);
            System.out.println("Using driver: " + driver);
            
            // 1. Load Driver
            Class.forName(driver);
            
            // 2. Try Connection
            Connection con = DriverManager.getConnection(url, user, pass);
            
            if (con != null) {
                System.out.println("---------------------------------------");
                System.out.println("SUCCESS! Connected to MySQL successfully.");
                System.out.println("---------------------------------------");
                con.close();
            }
        } catch (Exception e) {
            System.out.println("---------------------------------------");
            System.out.println("CONNECTION FAILED!");
            System.out.println("Error: " + e.getMessage());
            System.out.println("---------------------------------------");
            e.printStackTrace();
        }
    }
}
