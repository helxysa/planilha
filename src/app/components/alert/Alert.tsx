export default function Alert({ message = "Item adicionado com sucesso!", type = "success" }) {
    return (
        <div className={`alert alert-${type} p-4 rounded-lg shadow-md fixed top-0 left-1/2 transform -translate-x-1/2 z-50 ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <p>{message}</p>
        </div>
    );
}