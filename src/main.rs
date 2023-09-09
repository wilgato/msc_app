use warp::Filter;

// Função assíncrona que inicia o servidor
async fn start_server() {
    // Rota para servir arquivos estáticos a partir da pasta 'static'
    let static_files = warp::fs::dir("static");

    // Rota para servir 'index.html' da pasta 'static' quando a raiz for acessada
    let index_route = warp::path::end()
        .and(warp::fs::file("static/index.html"));

    // Rota para servir 'log.html' da pasta 'static' quando '/log' for acessada
    let log_route = warp::path("log")
        .and(warp::fs::file("static/log.html"));

    // Combine as rotas
    let routes = static_files.or(index_route).or(log_route);

    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}

fn main() {
    tokio::runtime::Builder::new_multi_thread()
        .worker_threads(2)
        .enable_all()
        .build()
        .unwrap()
        .block_on(start_server());
}
