use warp::Filter;
use serde::{Serialize, Deserialize};
use warp::http::StatusCode;
use warp::Rejection;
use warp::Reply;
use std::convert::Infallible;

#[derive(Serialize, Deserialize)]
struct SensorData {
    temperatura: f64,
    umidade: f64,
    pressao: f64,
}

#[tokio::main]
async fn main() {
    let static_files = warp::fs::dir("static");

    // Defina a rota para buscar os dados do sensor
    let data_route = warp::path!("api" / "dados_sensor1")
        .map(|| {
            // Lógica para buscar os dados do sensor no banco de dados
            // Substitua este trecho pela lógica real para buscar os dados
            let data = SensorData {
                temperatura: 25.5,
                umidade: 50.0,
                pressao: 1013.25,
            };
            warp::reply::json(&data)
        });

    // Roteie todas as rotas, incluindo a rota dos dados do sensor
    let routes = warp::path("api")
        .and(data_route)
        .or(static_files);

    let addr = ([127, 0, 0, 1], 8000);
    let ip_str = format!("{}.{}.{}.{}", addr.0[0], addr.0[1], addr.0[2], addr.0[3]);
    println!("Server started at http://{}:{}/", ip_str, addr.1);

    warp::serve(routes)
        .run(addr)
        .await;
}
