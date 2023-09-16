use mysql::prelude::*;
use mysql::{Error, OptsBuilder};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct YourDataStruct {
    id: i32,
    temperatura: Option<f64>,
    umidade: Option<f64>,
    pressao: Option<f64>,
    paciente_id: String,
    postingTime: String,
}

pub struct Database {
    pool: mysql::Pool,
}

impl Database {
    pub fn new() -> Result<Self, Error> {
        let mysql_opts = OptsBuilder::new()
            .ip_or_hostname("localhost:3306") // Coloque o endereço do seu servidor MySQL aqui
            .user("root") // Coloque seu nome de usuário MySQL aqui
            .pass("shalon007") // Coloque sua senha MySQL aqui
            .db_name("energizz_pi5"); // Substitua pelo nome do seu banco de dados

        let pool = mysql::Pool::new(mysql_opts)?;

        Ok(Database { pool })
    }

    pub fn query_data(&self) -> Result<Vec<YourDataStruct>, Error> {
        let mut conn = self.pool.get_conn()?;
        let query = "SELECT * FROM dados_sensor1";
        let data = conn.query_map(query, |(id, temperatura, umidade, pressao, paciente_id, postingTime)| {
            YourDataStruct {
                id,
                temperatura,
                umidade,
                pressao,
                paciente_id,
                postingTime,
            }
        })?;

        Ok(data)
    }
}
