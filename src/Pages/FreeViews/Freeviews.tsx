import { useState } from "react";
import Header from "../../Components/Header";
import { Dialog } from "primereact/dialog";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

export const Freeviews = () => {
    const [displayAuthForm, setDisplayAuthForm] = useState(false);
    const [displayLoginForm, setDisplayLoginForm] = useState(true);

    const onClickLoginButton = () => {
        setDisplayAuthForm(true);
    };

    const car1 = (
        <img alt="Card" src="https://www.perurentacar.com/wp-content/uploads/CarRentalGallery/big_thumb_1599615237_nissan-versa.jpg"/>
    );
    const car2 = (
        <img alt="Card" src="https://www.perurentacar.com/wp-content/uploads/CarRentalGallery/big_thumb_1599608804_corolla-2019.jpg"/>
    );
    const car3 = (
        <img alt="Card" src="https://www.perurentacar.com/wp-content/uploads/CarRentalGallery/big_thumb_1599614364_sportage.jpg"/>
    );
    const car4 = (
        <img alt="Card" src="https://www.perurentacar.com/wp-content/uploads/CarRentalGallery/big_thumb_1599616690_toyota-yaris-2020.jpg"/>
    );

    return (
        <div >
            <Header authenticated={false} onClickLoginButton={onClickLoginButton} />
            <h1>Freeviews</h1>
            <Dialog visible={displayAuthForm} onHide={() => setDisplayAuthForm(false)}>
                {displayLoginForm ? (
                    <LoginForm
                        displayAuthForm={displayAuthForm}
                        setDisplayAuthForm={setDisplayAuthForm}
                        setDisplayLoginForm={setDisplayLoginForm}
                    />
                ) : (
                    <RegisterForm
                        displayAuthForm={displayAuthForm}
                        setDisplayAuthForm={setDisplayAuthForm}
                        setDisplayLoginForm={setDisplayLoginForm}
                    />
                )}
            </Dialog>
            <br></br><br></br>
            <div className="cars">
                <p className="text-4xl xl:font-bold">Este año recorre todo el Perú</p>
            </div>
            <div>
                <div className="button">
                    <div className="flex flex-row-reverse flex-wrap card-container white-container">
                        <Button label="Ver todos" className="p-button-outlined p-button-info" />
                    </div>
                </div>

                <br></br><br></br>
                <div className="cars">
                    <div className="flex flex-wrap justify-content-center card-container blue-container gap-3">
                        <Card  className="border-round w-12rem h-6rem" title="NISSAN VERSA" subTitle=" " style={{ width: '16em' }}  header={car1}>
                            <p className="m-0" style={{lineHeight: '0.8'}}>$45.00</p>
                        </Card>
                        <Card  className="border-round w-12rem h-6rem" title="TOYOTA COROLLA" subTitle=" " style={{ width: '16em' }}  header={car2}>
                            <p className="m-0" style={{lineHeight: '0.8'}}>$55.00</p>
                        </Card>

                        <Card  className="border-round w-12rem h-6rem" title="KIA SPORTAGE" subTitle=" " style={{ width: '16em' }}  header={car3}>
                            <p className="m-0" style={{lineHeight: '0.8'}}>$68.00</p>
                        </Card>

                        <Card  className="border-round w-12rem h-6rem" title="TOYOTA YARIS" subTitle=" " style={{ width: '16em' }}  header={car4}>
                            <p className="m-0" style={{lineHeight: '0.8'}}>$45.00</p>
                        </Card>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <div className="cars">
                <p className="text-3xl xl:font-bold" >Estas son las razones porque las personas elijen eRentCar</p>
            </div>

            <div className="cars">
                <div className="flex flex-wrap justify-content-center card-container blue-container gap-3">

                    <Card style={{ width: '14em' }}>
                        <div>
                            <p className="text-lg xl:font-bold">Seguridad Sanitaria</p>
                        </div>
                        <i className="pi pi-car mr-2"></i>
                        <p className="m-0" style={{lineHeight: '0.8'}}>
                            Podrás solicitar el servicio de limpieza completa y
                            desinfección antes de recibir el auto.
                        </p>
                    </Card>

                    <Card style={{ width: '14em' }} >
                        <div>
                            <p className="text-lg xl:font-bold">Facilidad de alquiler</p>
                        </div>
                        <i className="pi pi-home mr-2"></i>
                        <p className="m-0" style={{lineHeight: '0.8'}}>
                            Para tu comodidad, podrás solicitar el servicio de
                            entrega y recojo en casa.
                        </p>
                    </Card>
                    <Card style={{ width: '14em' }} >
                        <div>
                            <p className="text-lg xl:font-bold">Genera Ganancias</p>
                        </div>
                        <i className="pi pi-dollar mr-2"></i>
                        <p className="m-0" style={{lineHeight: '0.8'}}>
                            Podrás obtener ganancias desde la comodidad de tu casa,
                            si publicas un auto en nuestra plataformas.
                        </p>
                    </Card>
                    <Card style={{ width: '14em' }} >
                        <div>
                            <p className="text-lg xl:font-bold">Estadísticas</p>
                        </div>
                        <i className="pi pi-chart-line mr-2"></i>
                        <p className="m-0" style={{lineHeight: '0.8'}}>
                            Podrás acceder a estadisticas de tu auto y su alquiler,
                            si te suscribes a nuestras versión premiunm.
                        </p>
                    </Card>
                </div>
            </div>


        </div>


    );
};

export default Freeviews;
