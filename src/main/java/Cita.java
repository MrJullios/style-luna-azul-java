import java.time.LocalDateTime;

public class Cita {

    private int id;
    private String cliente;
    private String servicio;
    private String barbero;
    private LocalDateTime fechaHora;
    private String estado;

    public Cita() {
    }

    public Cita(
            String cliente,
            String servicio,
            String barbero,
            LocalDateTime fechaHora,
            String estado) {

        this.cliente = cliente;
        this.servicio = servicio;
        this.barbero = barbero;
        this.fechaHora = fechaHora;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public String getBarbero() {
        return barbero;
    }

    public void setBarbero(String barbero) {
        this.barbero = barbero;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}