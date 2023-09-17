use warp::{Filter, Rejection, Reply};
use serde::{Serialize, Deserialize};
use warp::http::StatusCode;

#[derive(Serialize, Deserialize)]
struct SensorData {
    temperatura: f64,
    umidade: f64,
    pressao: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct Patient {
    id: String,
    nome: String,
}


#[tokio::main]
async fn main() {
    let static_files = warp::fs::dir("static");
    let routes = warp::path("api")
        .and(warp::path("dados_sensor1"))
        .and_then(query_data_from_database)
        .or(static_files);

    // Defina a rota para buscar a lista de pacientes
    let _get_patients = warp::path("api")
        .and(warp::path("pacientes"))
        .map(get_patients_from_database); // Crie a função `get_patients_from_database` para buscar os pacientes

    let addr = ([127, 0, 0, 1], 8000);
    let ip_str = format!("{}.{}.{}.{}", addr.0[0], addr.0[1], addr.0[2], addr.0[3]);
    println!("Server started at http://{}:{}/", ip_str, addr.1);

    warp::serve(routes)
        .run(addr)
        .await;
}

async fn query_data_from_database() -> Result<impl Reply, Rejection> {
    // Simule a consulta ao banco de dados aqui
    let data = get_sensor_data_from_database().await;

    // Criar uma resposta JSON com um código de status personalizado
    let response = warp::reply::json(&data);
    let response_with_status = warp::reply::with_status(response, StatusCode::OK);

    Ok(response_with_status)
}

async fn get_sensor_data_from_database() -> SensorData {
    // Lógica para consultar o banco de dados e retornar os dados do sensor
    // Aqui você pode usar uma biblioteca como `mysql` para se conectar ao banco de dados e executar a consulta

    // Neste exemplo, estou apenas retornando dados simulados
    SensorData {
        temperatura: 25.5,
        umidade: 50.0,
        pressao: 1013.25,
    }
}

async fn get_patients_from_database() -> Result<impl warp::Reply, warp::Rejection> {
    // Consulta ao banco de dados aqui para buscar a lista de pacientes
    let patients = get_patients_from_database_function().await;

    // Converter a lista de pacientes em JSON
    let patients_json = warp::reply::json(&patients);

    Ok(patients_json)
}

// Substitua esta função por sua lógica de busca real no banco de dados
async fn get_patients_from_database_function() -> Vec<Patient> {
    // Exemplo de lista de pacientes simulados (substitua pelo código de consulta real)
    vec![
        Patient {
            id: "1".to_string(),
            nome: "Paciente 1".to_string(),
        },
        Patient {
            id: "2".to_string(),
            nome: "Paciente 2".to_string(),
        },
    ]
}