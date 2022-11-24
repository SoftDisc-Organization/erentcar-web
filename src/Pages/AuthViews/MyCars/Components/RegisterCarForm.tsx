import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import CarsService from "../../../../Services/Cars.service";
import CarModelsService from "../../../../Services/CarModelsService";
import CarModel from "../../../../Models/CarModel.model";
import { CarCategory } from "../../../../Models/CarCategory.enum";
import { MechanicConditions } from "../../../../Models/MechanicConditions.enum";

interface RegisterFormProps {
    displayAuthForm: boolean;
    setDisplayAuthForm: (value: boolean) => void;
    fetchCars: () => void;
    carData: any
}

type Inputs = {
    // --- CAR DATA ---
    id: number,
    address: string;
    imagePath1: string;
    imagePath2: string;
    imagePath3: string;
    active: boolean;
    carModelId: number;
    carValueInDollars: number;
    category: string;
    extraInformation: string;
    manual: boolean;
    mechanicCondition: string;
    mileage: number;
    rate: number;
    rentAmountDay: number;
    rentAmountKilometer: number;
    seating: number;
    year: number;
    clientId: number;
    licensePlate: string;
    insuranceType: string;
};

const schema = yup
    .object({
        address: yup.string().required("La dirección es requerida"),
        active: yup.bool().required("Seleccione el estado."),
        carModelId: yup.number().required("Seleccione el modelo de carro."),
        carValueInDollars: yup.number().min(0).max(999999999).required("Ingrese el valor del carro"),
        category: yup.string().required("Seleccione la categoria."),
        extraInformation: yup.string().required("Ingrese informacion adicional."),
        manual: yup.bool().required("Seleccione el tipo de cambio."),
        mechanicCondition: yup.string().required("Ingrese la condicion del carro."),
        mileage: yup.number().min(0).max(999999999).required("Ingrese el recorrido."),
        rate: yup.number().min(0).max(999999999).required("Ingrese el rate."),
        rentAmountDay: yup.number().min(0).max(999999999).required("Ingrese el monto de renta diaria."),
        rentAmountKilometer: yup.number().min(0).max(999999999).required("Ingrese el monto de renta por kilometro."),
        seating: yup.number().min(0).max(999999999).required("Ingrese el numero de asientos."),
        year: yup.number().min(0).max(999999999).required("Ingrese el año."),
        //licensePlate: yup.string().required("Ingrese la licencia."),
        //insuranceType: yup.string().required("Ingrese la aseguradora."),
    })
    .required();

export const RegisterCarForm = (props: RegisterFormProps) => {
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false);
    const [loadingCarModels, setLoadingCarModels] = useState(true)
    const [carModels, setCarmodels] = useState<CarModel[]>([])
    const [carCategory] = useState(CarCategory)
    const [mechanicCondition] = useState(MechanicConditions)
    const toastRegister = useRef<Toast>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const showToastInvalidForm = () => {
        toastRegister.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Formulario inválido",
            life: 3000,
        });
    };

    const showToastRegisterSucess = () => {
        toastRegister.current?.show({
            severity: "success",
            summary: "Registro",
            detail: "Registro de carro exitoso",
            life: 3000,
        });
    };

    const showToastRegisterError = () => {
        toastRegister.current?.show({
            severity: "error",
            summary: "Registro",
            detail: "Error al registrar carro",
            life: 3000,
        });
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let images = []
        if (data.imagePath1 !== "") images.push(data.imagePath1)
        if (data.imagePath2 !== "") images.push(data.imagePath2)
        if (data.imagePath3 !== "") images.push(data.imagePath3)

        let formData = {
            //"name": data.active
            "address": data.address,
            "imagePath": images,
            "active": data.active,
            "carModelId": data.carModelId,
            "carValueInDollars": data.carValueInDollars,
            "category": data.category,
            "extraInformation": data.extraInformation,
            "manual": data.manual,
            "mechanicCondition": data.mechanicCondition,
            "mileage": data.mileage,
            "rate": data.rate,
            "rentAmountDay": data.rentAmountDay,
            "rentAmountKilometer": data.rentAmountKilometer,
            "seating": data.seating,
            "year": data.year,
            "clientId": data.clientId,
            "licensePlate": data.licensePlate,
            "insuranceType": data.insuranceType,
        }

        setLoading(true);
        await CarsService.createCar(formData)
            .then((res) => {
                showToastRegisterSucess();
                props.fetchCars()
                props.setDisplayAuthForm(false)
            })
            .catch((err) => {
                console.log(err)
                showToastRegisterError();
            })
        setLoading(false);
    };

    const onUpdate: SubmitHandler<Inputs> = async (data) => {
        let images = []
        if (data.imagePath1 !== "") images.push(data.imagePath1)
        if (data.imagePath2 !== "") images.push(data.imagePath2)
        if (data.imagePath3 !== "") images.push(data.imagePath3)

        let formData = {
            //"name": data.active
            "address": data.address,
            "imagePath": images,
            "active": data.active,
            "carModelId": data.carModelId,
            "carValueInDollars": data.carValueInDollars,
            "category": data.category,
            "extraInformation": data.extraInformation,
            "manual": data.manual,
            "mechanicCondition": data.mechanicCondition,
            "mileage": data.mileage,
            "rate": data.rate,
            "rentAmountDay": data.rentAmountDay,
            "rentAmountKilometer": data.rentAmountKilometer,
            "seating": data.seating,
            "year": data.year,
            "clientId": data.clientId,
            "licensePlate": data.licensePlate,
            "insuranceType": data.insuranceType,
        }
        setLoading(true)
        await CarsService.updateCar(formData, props.carData.id)
            .then((res) => {
                showToastRegisterSucess();
                props.fetchCars()
                props.setDisplayAuthForm(false)
            })
            .catch((err) => {
                console.log(err)
                showToastRegisterError();
            })
        setLoading(false)
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            showToastInvalidForm();
        }
    }, [errors]);

    const fetchCarModels = async () => {
        await CarModelsService.getAllCarModels()
            .then((res) => {
                setCarmodels(res.data.content)
            })
            .catch((err) => {
                console.log(err)
            })
        setLoadingCarModels(false)
    }

    useEffect(() => {
        if (props.carData.id) {
            setUpdate(true)
        }
        fetchCarModels()
        register("clientId", { value: JSON.parse(localStorage.getItem("USER") || "").id })
        //console.log(props.carData.imagePath[1])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Toast ref={toastRegister} position="bottom-right" />

            <h1 className="text-[32px] font-bold text-center mb-4">Añadir nuevo auto</h1>
            <form className="p-fluid w-[320px] sm:w-[480px] lg:w-[846px]" onSubmit={(e) => e.preventDefault()} >
                <div className="block lg:flex sm:px-8">

                    <div className="w-[330px] sm:w-full lg:w-[352px] mt-[13px] lg:mr-[70px]">
                        {!loadingCarModels && <div className="">
                            <label htmlFor="carModelId" >Modelo de carro</label>
                            <select id="carModelId" defaultValue={!props.carData.id ? 1 : props.carData.carModel.id} {...register("carModelId")} className="w-full border-[1px] border-gray-300 h-[50px] rounded-md px-2">
                                {carModels.map((element) =>
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                )}
                            </select>
                        </div>}

                        <div className="mt-[12px]">
                            <label htmlFor="category">Categoria</label>
                            <select id="category" defaultValue={!props.carData.id ? carCategory.LARGE : props.carData.category} {...register("category")} className="w-full border-[1px] border-gray-300 h-[50px] rounded-md px-2">
                                {Object.keys(carCategory).map((element) =>
                                    <option key={element} value={element}>{element}</option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="mechanicCondition" className="block mt-3">
                                Condicion Mecanica
                            </label>
                            <select id="mechanicCondition" defaultValue={!props.carData.id ? mechanicCondition.EXCELLENT : props.carData.mechanicConditions} {...register("mechanicCondition")} className="w-full border-[1px] border-gray-300 h-[50px] rounded-md px-2">
                                {Object.keys(mechanicCondition).map((element) =>
                                    <option key={element} value={element}>{element}</option>)}
                            </select>
                        </div>

                        <div className="mt-[12px]">
                            <label htmlFor="manual">Manual</label>
                            <select id="manual" defaultValue={`${!props.carData.id ? "true" : `${props.carData.manual}`}`} {...register("manual", { setValueAs: (value) => value === "true" ? true : false })} className="w-full border-[1px] border-gray-300 h-[50px] rounded-md px-2">
                                <option value={"true"} >True</option>
                                <option value={"false"} >False</option>
                            </select>
                        </div>

                        <div className="mt-[12px]">
                            <label htmlFor="active" >Estado</label>
                            <select id="active" defaultValue={`${!props.carData.id ? "true" : `${props.carData.active}`}`} {...register("active", { setValueAs: (value) => value === "true" ? true : false })} className="w-full border-[1px] border-gray-300 h-[50px] rounded-md px-2">
                                <option value={"true"} >True</option>
                                <option value={"false"} >False</option>
                            </select>
                        </div>

                        {!update && <div className="mt-[12px]">
                            <label htmlFor="insuranceType">
                                Tipo de Seguro
                            </label>
                            <select id="insuranceType" defaultValue={"PACIFICO"} {...register("insuranceType")} className="w-full border-[1px] border-gray-300 h-[50px] rounded-md px-2">
                                <option value="RIMAC">RIMAC</option>
                                <option value="PACIFICO">PACIFICO</option>
                            </select>
                        </div>}

                        <div>
                            <label htmlFor="seating" className="block mt-3">
                                Asientos
                            </label>
                            <InputText
                                id="seating"
                                placeholder="Ingrese Numero de Asientos"
                                disabled={loading}
                                className={errors.seating && "p-invalid"}
                                {...register("seating")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.seating}
                            />
                            {errors.seating && (
                                <small id="seating-help" className="p-error block">
                                    {errors.seating?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="address" className="block mt-3">
                                Dirección
                            </label>
                            <InputText
                                id="address"
                                placeholder="Ingrese su dirección"
                                disabled={loading}
                                defaultValue={!props.carData.id ? "" : props.carData.address}
                                className={errors.address && "p-invalid"}
                                {...register("address")}
                            />
                            {errors.address && (
                                <small id="address-help" className="p-error block">
                                    {errors.address?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="year" className="block mt-3">
                                Año
                            </label>
                            <InputText
                                id="year"
                                placeholder="Ingrese Año del Carro"
                                disabled={loading}
                                className={errors.year && "p-invalid"}
                                {...register("year")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.year}
                            />
                            {errors.year && (
                                <small id="year-help" className="p-error block">
                                    {errors.year?.message}
                                </small>
                            )}
                        </div>

                        {!update && <div>
                            <label htmlFor="licensePlate" className="block mt-3">
                                Placa
                            </label>
                            <InputText
                                id="licensePlate"
                                placeholder="Ingrese su dirección"
                                disabled={loading}
                                className={errors.licensePlate && "p-invalid"}
                                defaultValue={!props.carData.id ? "" : props.carData.licensePlate}
                                {...register("licensePlate")}
                            />
                            {errors.licensePlate && (
                                <small id="licensePlate-help" className="p-error block">
                                    {errors.licensePlate?.message}
                                </small>
                            )}
                        </div>}
                    </div>

                    <div className="w-[330px] sm:w-full lg:w-[352px] lg:ml-3">
                        <div>
                            <label htmlFor="imagePath1" className="block mt-3">
                                URL de primera imagen del Carro
                            </label>
                            <InputText
                                id="imagePath1"
                                placeholder="Ingrese la URL de su imagen del Carro"
                                disabled={loading}
                                className={errors.imagePath1 && "p-invalid"}
                                defaultValue={!props.carData.id ? "" : props.carData.imagePath[0]}
                                {...register("imagePath1")}
                            />
                            {errors.imagePath1 && (
                                <small id="imagePath-help" className="p-error block">
                                    {errors.imagePath1?.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label htmlFor="imagePath2" className="block mt-3">
                                URL de segunda imagen del Carro
                            </label>
                            <InputText
                                id="imagePath2"
                                placeholder="Ingrese la URL de su imagen del Carro"
                                disabled={loading}
                                className={errors.imagePath2 && "p-invalid"}
                                defaultValue={!props.carData.id ? "" : props.carData.imagePath[1]}
                                {...register("imagePath2")}
                            />
                            {errors.imagePath2 && (
                                <small id="imagePath-help" className="p-error block">
                                    {errors.imagePath2?.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label htmlFor="imagePath3" className="block mt-3">
                                URL de tercera imagen del Carro
                            </label>
                            <InputText
                                id="imagePath3"
                                placeholder="Ingrese la URL de su imagen del Carro"
                                disabled={loading}
                                className={errors.imagePath3 && "p-invalid"}
                                defaultValue={!props.carData.id ? "" : props.carData.imagePath[2]}
                                {...register("imagePath3")}
                            />
                            {errors.imagePath3 && (
                                <small id="imagePath-help" className="p-error block">
                                    {errors.imagePath3?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="carValueInDollars" className="block mt-3">
                                Valor del Carro en Dolares
                            </label>
                            <InputText
                                id="carValueInDollars"
                                placeholder="Ingrese el Valor del Carro en Dolares"
                                disabled={loading}
                                className={errors.carValueInDollars && "p-invalid"}
                                {...register("carValueInDollars")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.carValueInDollars}
                            />
                            {errors.carValueInDollars && (
                                <small id="carValueInDollars-help" className="p-error block">
                                    {errors.carValueInDollars?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="extraInformation" className="block mt-3">
                                Informacion Extra
                            </label>
                            <InputText
                                id="extraInformation"
                                placeholder="Ingrese Informacion Extra"
                                disabled={loading}
                                className={errors.extraInformation && "p-invalid"}
                                {...register("extraInformation")}
                                defaultValue={!props.carData.id ? "" : props.carData.extraInformation}
                            />
                            {errors.extraInformation && (
                                <small id="extraInformation-help" className="p-error block">
                                    {errors.extraInformation?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="mileage" className="block mt-3">
                                Kilometraje
                            </label>
                            <InputText
                                id="mileage"
                                placeholder="Ingrese el Kilometraje"
                                disabled={loading}
                                className={errors.mileage && "p-invalid"}
                                {...register("mileage")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.mileage}
                            />
                            {errors.mileage && (
                                <small id="mileage-help" className="p-error block">
                                    {errors.mileage?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="rate" className="block mt-3">
                                Velocidad
                            </label>
                            <InputText
                                id="rate"
                                placeholder="Ingrese la Velocidad"
                                disabled={loading}
                                className={errors.rate && "p-invalid"}
                                {...register("rate")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.rate}
                            />
                            {errors.rate && (
                                <small id="rate-help" className="p-error block">
                                    {errors.rate?.message}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="rentAmountDay" className="block mt-3">
                                Costo de Renta Diaria
                            </label>
                            <InputText
                                id="rentAmountDay"
                                placeholder="Ingrese el Costo de Renta Diaria"
                                disabled={loading}
                                className={errors.rentAmountDay && "p-invalid"}
                                {...register("rentAmountDay")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.rentAmountDay}
                            />
                            {errors.rentAmountDay && (
                                <small id="rentAmountDay-help" className="p-error block">
                                    {errors.rentAmountDay?.message}
                                </small>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="rentAmountKilometer" className="block mt-3">
                                Costo de Renta por kilometro
                            </label>
                            <InputText
                                id="rentAmountKilometer"
                                placeholder="Ingrese el Costo de Renta por kilometro"
                                disabled={loading}
                                className={errors.rentAmountKilometer && "p-invalid"}
                                {...register("rentAmountKilometer")}
                                type="number"
                                min={0}
                                max={999999999}
                                defaultValue={!props.carData.id ? 0 : props.carData.rentAmountKilometer}
                            />
                            {errors.rentAmountKilometer && (
                                <small id="rentAmountKilometer-help" className="p-error block">
                                    {errors.rentAmountKilometer?.message}
                                </small>
                            )}
                        </div>
                    </div>

                </div>
                {loading ? (
                    <div className="flex">
                        <ProgressSpinner
                            style={{ width: "50px", height: "50px" }}
                            strokeWidth="4"
                            className="!mt-6 !mx-auto"
                        />
                    </div>
                ) : (
                    <>
                        {!update ? <Button
                            label="Añadir"
                            className="!mt-6 mb-auto btn-primary"
                            onClick={handleSubmit(onSubmit)}
                        /> : <Button
                            label="Editar"
                            className="!mt-6 mb-auto btn-primary"
                            onClick={handleSubmit(onUpdate)}
                        />}

                        <Button
                            label="Cancelar"
                            className="!mt-2 mb-auto p-button-outlined btn-secondary"
                            onClick={() => props.setDisplayAuthForm(!true)}
                        />
                    </>
                )}
            </form>
        </div>
    );
};

export default RegisterCarForm;