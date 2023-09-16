use warp::{Filter, Rejection, Reply};
use serde::{Serialize, Deserialize};
use warp::http::StatusCode;

#[derive(Serialize, Deserialize)]
struct SensorData {
    temperatura: f64,
    umidade: f64,
    pressao: f64,
}

#[tokio::main]
async fn main() {
    let static_files = warp::fs::dir("static");
    let routes = warp::path("api")
        .and(warp::path("dados_sensor1"))
        .and_then(query_data_from_database)
        .or(static_files);

    let addr = ([127, 0, 0, 1], 8000);
    let ip_str = format!("{}.{}.{}.{}", addr.0[0], addr.0[1], addr.0[2], addr.0[3]);
    println!("Server started at http://{}:{}/", ip_str, addr.1);

    warp::serve(routes)
        .run(addr)
        .await;
}

async fn query_data_from_database() -> Result<impl Reply, Rejection> {
    // Simule a consulta ao banco de dados aqui
    let data = SensorData {
        temperatura: 25.5,
        umidade: 50.0,
        pressao: 1013.25,
    };

    // Criar uma resposta JSON com um código de status personalizado
    let response = warp::reply::json(&data);
    let response_with_status = warp::reply::with_status(response, StatusCode::OK);

    Ok(response_with_status)
}
