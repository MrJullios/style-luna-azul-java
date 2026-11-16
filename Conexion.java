import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {

    private static final String URL =
            "jdbc:mysql://localhost:3306/style_luna_azul";

    private static final String USUARIO = "luna_app";

   private static final String CONTRASENA =
        System.getenv("DB_PASSWORD");

    public static Connection conectar() {

        try {

            Connection conexion =
                    DriverManager.getConnection(
                            URL,
                            USUARIO,
                            CONTRASENA
                    );

            System.out.println("Conexión exitosa a MySQL.");

            return conexion;

        } catch (SQLException e) {

            System.out.println(
                    "Error de conexión: " + e.getMessage()
            );

            return null;
        }
    }
}