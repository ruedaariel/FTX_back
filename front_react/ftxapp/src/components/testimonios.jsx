import { Carousel } from "react-bootstrap";
import testimonio1 from "../assets/Recursos/Imagenes/FTX (13).jpg";
import testimonio2 from "../assets/Recursos/Imagenes/Imagen2.png";
import testimonio3 from "../assets/Recursos/Imagenes/testimonioLea.jpeg";

export default function Testimonios() {
  return (
    <section id="testimonios">
      <div class="container text-center">
        <h2>Testimonios</h2>
      </div>

      <Carousel interval={3000} indicators={false}>
        <Carousel.Item>
          <img src={testimonio1} alt="Cliente 1" className="autor-imagen" />

          <Carousel.Caption>
            <div>
              <q class="testimonial-text">
                Desde que empecé con <i>Santi</i>, mi energía ha aumentado y he
                visto resultados increíbles.
              </q>
            </div>
            <div>
              <span className="autor-nombre">Agustina</span>
              <span className="autor-titulo">Miembro Premium</span>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        {/*      <Carousel.Item>

                    <img src={testimonio2} alt="Cliente 1" className="autor-imagen" />

                    <Carousel.Caption>
                        <div className="text-center">
                            <q>
                                La flexibilidad de horarios fue clave para mí. Puedo entrenar sin
                                estrés y las rutinas son geniales.
                            </q>
                            <div>
                                
                            </div>
                        </div>

                        <div>
                                    <span>Agustina</span>
                                    <span>Miembro Premium</span>
                                </div>
                    </Carousel.Caption>
                </Carousel.Item>


                <Carousel.Item>

                    <img src={testimonio3} alt="Cliente 1" className="autor-imagen" />

                    <Carousel.Caption>
                        <div className="text-center">
                            <q>
                                Para mí es importante entrenar con mi entrenador. Conozco su
                                profesionalidad y logros.
                            </q>
                            <div>
                                <div>
                                    <span>Leandro</span>
                                    <span>Miembro Premium</span>
                                </div>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item> */}
      </Carousel>
    </section>
  );
}
