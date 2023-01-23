package orms;

import java.sql.Connection;
import java.util.ArrayList;

import Util.DBManager;

public class ORM<T> {
    protected Connection connection;
    protected String tableName = null;

    public ORM() {
        connection = DBManager.getInstance().getConn();
    }

    public ArrayList<T> listAll() {
        return new ArrayList<>();
    }

    public T add(T t) {
        return t;
    }

    public boolean delete(int id) {
        return false;
    }

    public void update(T t) {
    }

    public ArrayList<T> rawQueryList(String query) {
        return new ArrayList<>();
    }
}
