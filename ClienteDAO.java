import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ClienteDAO {

    public void insertarCliente(Cliente cliente) {

        String sql = "INSERT INTO clientes (nombre, correo, telefono, estado) VALUES (?, ?, ?, ?)";

        try {

            Connection conexion = Conexion.conectar();

            PreparedStatement statement = conexion.prepareStatement(sql);

            statement.setString(1, cliente.getNombre());
            statement.setString(2, cliente.getCorreo());
            statement.setString(3, cliente.getTelefono());
            statement.setBoolean(4, cliente.isEstado());

            statement.executeUpdate();

            System.out.println("Cliente registrado correctamente.");

            conexion.close();

        } catch (SQLException e) {

            System.out.println(
                    "Error al registrar cliente: " + e.getMessage()
            );
        }
    }

    public void listarClientes() {

        String sql = "SELECT * FROM clientes";

        try {

            Connection conexion = Conexion.conectar();

            PreparedStatement statement = conexion.prepareStatement(sql);

            ResultSet resultado = statement.executeQuery();

            while (resultado.next()) {

                System.out.println(
                        resultado.getInt("id") + " | " +
                        resultado.getString("nombre") + " | " +
                        resultado.getString("correo") + " | " +
                        resultado.getString("telefono") + " | " +
                        resultado.getBoolean("estado")
                );
            }

            conexion.close();

        } catch (SQLException e) {

            System.out.println(
                    "Error al consultar clientes: " + e.getMessage()
            );
        }
    }

    public void actualizarCliente(Cliente cliente) {

        String sql =
                "UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, estado = ? WHERE id = ?";

        try {

            Connection conexion = Conexion.conectar();

            PreparedStatement statement = conexion.prepareStatement(sql);

            statement.setString(1, cliente.getNombre());
            statement.setString(2, cliente.getCorreo());
            statement.setString(3, cliente.getTelefono());
            statement.setBoolean(4, cliente.isEstado());
            statement.setInt(5, cliente.getId());

            statement.executeUpdate();

            System.out.println("Cliente actualizado correctamente.");

            conexion.close();

        } catch (SQLException e) {

            System.out.println(
                    "Error al actualizar cliente: " + e.getMessage()
            );
        }
    }

    public void eliminarCliente(int id) {

        String sql = "DELETE FROM clientes WHERE id = ?";

        try {

            Connection conexion = Conexion.conectar();

            PreparedStatement statement = conexion.prepareStatement(sql);

            statement.setInt(1, id);

            statement.executeUpdate();

            System.out.println("Cliente eliminado correctamente.");

            conexion.close();

        } catch (SQLException e) {

            System.out.println(
                    "Error al eliminar cliente: " + e.getMessage()
            );
        }
    }
}