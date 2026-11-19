import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import java.util.ArrayList;
import java.util.List;

public class CitaDAO {

    public boolean insertar(Cita cita) {

        String sql =
                "INSERT INTO citas "
                + "(cliente, servicio, barbero, fecha_hora, estado) "
                + "VALUES (?, ?, ?, ?, ?)";

        try (
                Connection conexion = Conexion.conectar();
                PreparedStatement statement =
                        conexion.prepareStatement(sql)
        ) {

            statement.setString(1, cita.getCliente());
            statement.setString(2, cita.getServicio());
            statement.setString(3, cita.getBarbero());

            statement.setTimestamp(
                    4,
                    Timestamp.valueOf(
                            cita.getFechaHora()
                    )
            );

            statement.setString(
                    5,
                    cita.getEstado()
            );

            return statement.executeUpdate() > 0;

        } catch (SQLException error) {

            System.out.println(
                    "Error al insertar cita: "
                    + error.getMessage()
            );

            return false;
        }
    }


    public List<Cita> listar() {

        List<Cita> citas =
                new ArrayList<>();

        String sql =
                "SELECT * FROM citas "
                + "ORDER BY fecha_hora ASC";

        try (
                Connection conexion = Conexion.conectar();
                PreparedStatement statement =
                        conexion.prepareStatement(sql);
                ResultSet resultado =
                        statement.executeQuery()
        ) {

            while (resultado.next()) {

                Cita cita =
                        new Cita();

                cita.setId(
                        resultado.getInt("id")
                );

                cita.setCliente(
                        resultado.getString("cliente")
                );

                cita.setServicio(
                        resultado.getString("servicio")
                );

                cita.setBarbero(
                        resultado.getString("barbero")
                );

                cita.setFechaHora(
                        resultado
                                .getTimestamp("fecha_hora")
                                .toLocalDateTime()
                );

                cita.setEstado(
                        resultado.getString("estado")
                );

                citas.add(cita);
            }

        } catch (SQLException error) {

            System.out.println(
                    "Error al listar citas: "
                    + error.getMessage()
            );
        }

        return citas;
    }
}