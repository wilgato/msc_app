use warp::{Filter, Reply};
use serde::{Serialize, Deserialize};

// Defina a estrutura dos dados do sensor
#[derive(Serialize, Deserialize)]
struct SensorData {
    temperatura: f64,
    umidade: f64,
    pressao: f64,
}

// Rota para buscar dados do sensor
pub fn sensor_data_route() -> impl Filter<Extract = impl Reply, Error = warp::Rejection> + Clone {
    warp::path!("api" / "dados_sensor1")
        .and(warp::get())
        .and_then(query_data_from_database)
}

// Função para simular a consulta ao banco de dados
async fn query_data_from_database() -> Result<impl Reply, warp::Rejection> {
    // Aqui você deve implementar a lógica real de consulta ao banco de dados
    // Neste exemplo, estamos simulando alguns dados estáticos
    let data = SensorData {
        temperatura: 25.5,
        umidade: 50.0,
        pressao: 1013.25,
    };

    Ok(warp::reply::json(&data))
}
