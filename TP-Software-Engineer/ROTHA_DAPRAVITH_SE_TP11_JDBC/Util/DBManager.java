package Util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import exceptions.DBException;

public class DBManager {
    private Connection conn;
    private static DBManager instance;
    private DBManager(String db, String user,
            String pass, int port, String host) {
        try {
            conn = DriverManager
                    .getConnection("jdbc:mysql://" + host + ":" + port + "/" + db,
                            user, pass);
        } catch (SQLException e) {
            throw new DBException(e);
        }
    }

    private DBManager(String db, String user, String pass, int port) {
        this(db, user, pass, port, "Localhost");
    }
    private DBManager(String db, String user, String pass) {
        this(db, user, pass, 3306);
    }
    private DBManager(String db, String user) {
        this(db, user, null);
    }
    private DBManager(String db) {
        this(db, "root");
    }
    private DBManager() {
        this("database_schema");
    }
    public static DBManager getInstance(){
        if(instance == null){
            instance = new DBManager();
        }
        return instance;
    }
    public Connection getConn(){return conn;}
    private String[] createTables={"""
            CREATE TABLE IF NOT EXISTS countries(
                id INT AUTO_INCREMENT PRIMARY KEY,
                country VARCHAR(50) NOT NULL
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS cities(
                id INT AUTO_INCREMENT PRIMARY KEY,
                city VARCHAR(50) NOT NULL,
                countryid INT REFERENCES countries(id),
                ucity VARCHAR(60) NOT NULL UNIQUE
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS hotels(
                id INT AUTO_INCREMENT PRIMARY KEY,
                hotel VARCHAR(100) NOT NULL,
                countryid INT REFERENCES countries(id),
                cityid INT REFERENCES cities(id),
                stars TINYINT NOT NULL DEFAULT 0,
                cost DOUBLE(10,2) NOT NULL DEFAULT 0,
                info TEXT
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS images(
                id INT AUTO_INCREMENT PRIMARY KEY,
                hotelid INT REFERENCES hotels(id),
                imagepath VARCHAR(256) NOT NULL
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS roles(
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(20) NOT NULL UNIQUE
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS users(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                pass VARCHAR(80) NOT NULL,
                email VARCHAR(128) NOT NULL,
                roleid INT REFERENCES roles(id),
                discount TINYINT NOT NULL DEFAULT 0,
                avatar VARCHAR(256)
            )
            """};
    private String[] dropTables = {
        "DROP TABLE IF EXISTS users",
        "DROP TABLE IF EXISTS roles",
        "DROP TABLE IF EXISTS images",
        "DROP TABLE IF EXISTS hotels",
        "DROP TABLE IF EXISTS cities",
        "DROP TABLE IF EXISTS countries",
    };
    public static void main(String[] args) throws SQLException {
        DBManager dbManager = new DBManager();
        for (String sql : dbManager.dropTables) {
            var stmt = dbManager.conn.createStatement();
            stmt.execute(sql);
        }
        for (String sql : dbManager.createTables) {
            var stmt = dbManager.conn.createStatement();
            stmt.execute(sql);
        }
        dbManager.conn.close();
    }
}
