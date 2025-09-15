function Planes() {
    return (    

<section id="planes">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Mis Planes</h2>
                    <h3 className="section-subheading ">Encuentra el plan perfecto para ti.</h3>
                </div>

                {/* Contenido de Planes */}
                <div className="row justify-content-center">
                    {/* <!-- Plan Gratuito --> */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body text-center p-4">
                                <h5 className="card-title  text-uppercase">Básico</h5>
                                <h6 className="card-price display-4 fw-bold">$0<span className="period fs-6">/mes</span></h6>
                                <hr className="my-4"/>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Acceso a rutina básica</li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Seguimiento de progreso</li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Videos de entrenamiento</li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Consejos de nutrición</li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Soporte prioritario</li>
                                </ul>
                                <div className="d-grid">
                                    <a href="./loginregister/login_suscripcion.html?plan=gratis"
                                        className="btn mi-boton text-uppercase">Registrarse</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Plan Básico --> */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100 shadow  border-2 popular-plan">
                            <div className="card-body text-center p-4">

                                <h5 className="card-title  text-uppercase">Pro</h5>
                                <h6 className="card-price display-4 fw-bold">$25<span className="period fs-6">/mes</span></h6>
                                <hr className="my-4"/>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Acceso a rutinas
                                        personalizada</li>
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Seguimiento de progreso
                                    </li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Videos de entrenamiento
                                    </li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Consejos de nutrición</li>
                                    <li className="text-muted mb-2"><span className="fa-li"><i
                                                className="fas fa-times"></i></span>Soporte prioritario</li>
                                </ul>
                                <div className="d-grid">
                                    <a href="./loginregister/login_suscripcion.html?plan=basico"
                                        className="btn mi-boton text-uppercase">Registrarse</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Plan Pro */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body text-center p-4">
                                <h5 className="card-title text-uppercase">Premiun</h5>
                                <h6 className="card-price display-4 fw-bold">$50<span className="period fs-6">/mes</span></h6>
                                <hr className="my-4"/>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Acceso a rutinas
                                        personalizadas
                                    </li>
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Seguimiento de progreso
                                    </li>
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Videos de entrenamiento
                                    </li>
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Consejos de nutrición</li>
                                    <li className="mb-2"><span className="fa-li"><i
                                                className="fas fa-check text-success"></i></span>Soporte prioritario</li>
                                </ul>
                                <div className="d-grid">
                                    <a href="./loginregister/login_suscripcion.html?plan=pro"
                                        className="btn mi-boton">Registrarse</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Planes;  