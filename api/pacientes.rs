use serde::{Deserialize, Serialize};
use warp::{Filter, Rejection, Reply};

#[derive(Serialize, Deserialize)]
struct Patient {
    id: String,
    nome: String,
}

#[tokio::main]
async fn main() {
    // Defina um vetor de pacientes de exemplo
    let pacientes = vec![
        Patient {
            id: "1".to_string(),
            nome: "Paciente 1".to_string(),
        },
        Patient {
            id: "2".to_string(),
            nome: "Paciente 2".to_string(),
        },
    ];

    // Rota para listar todos os pacientes
    let listar_pacientes = warp::path!("api" / "pacientes")
        .map(move || warp::reply::json(&pacientes));

    warp::serve(listar_pacientes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
