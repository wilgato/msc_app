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

    // Endereço IP e porta
    let addr = ([127, 0, 0, 1], 8000); // Alterado para a porta 8000

    // Converter o endereço IP em uma string
    let ip_str = format!("{}.{}.{}.{}", addr.0[0], addr.0[1], addr.0[2], addr.0[3]);

    // Imprimir o endereço IP e a porta
    println!("Server started at http://{}:{}/", ip_str, addr.1);

    // Iniciar o servidor
    warp::serve(routes)
        .run(addr)
        .await;
}
