public class Main {

    public static void main(String[] args) {

        ClienteDAO dao = new ClienteDAO();

        Cliente clienteActualizado = new Cliente(
                1,
                "Julio Cesar Porras",
                "julio.actualizado@email.com",
                "3112223344",
                true
        );

        dao.actualizarCliente(clienteActualizado);

        dao.listarClientes();

        dao.eliminarCliente(1);

        dao.listarClientes();
    }
}