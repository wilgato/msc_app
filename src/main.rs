use warp::Filter;

#[tokio::main]
async fn main() {
    // Rota para servir arquivos estáticos a partir da pasta 'static'
    let static_files = warp::fs::dir("static");

    // Rota para servir 'index.html' da pasta 'static' quando a raiz for acessada
    let index_route = warp::path::end()
        .and(warp::fs::file("static/index.html"));

    // Rota para servir 'log.html' da pasta 'static' quando '/log' for acessada
    let log_route = warp::path("log")
        .and(warp::fs::file("static/log.html"));

    // Rota para servir 'inicio.html' da pasta 'static' quando '/inicio' for acessada
    let inicio_route = warp::path("inicio")
        .and(warp::fs::file("static/inicio.html"));

    // Combine as rotas, incluindo a rota para 'inicio.html'
    let routes = static_files
        .or(index_route)
        .or(log_route)
        .or(inicio_route);

    warp::serve(routes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
