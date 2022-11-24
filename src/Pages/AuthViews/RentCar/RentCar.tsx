import { Button } from "primereact/button";
import Car from "./Components/Car";
import { useNavigate, useParams } from "react-router-dom";
import CarEntity from "../../../Models/Car.model";
import { useEffect, useState } from "react";
import CarsService from "../../../Services/Cars.service";
import Comments from "./Components/Comments";
import Comment from "../../../Models/Comment";
import CreateComment from "../../../Models/CreateComment";

export const RentCar = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState({} as CarEntity);
  const [comments, setComments] = useState([] as Comment[]);
  const navigate = useNavigate();
  const { carId } = useParams();

  const fetchCar = async () => {
    setLoading(true);
    await CarsService.getCarById((carId || 0) as number)
      .then((response) => {
        setCar(response.data as CarEntity);
        setComments(response.data.comments as Comment[]);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const createComment = async (comment: CreateComment) => {
    setLoading(true);
    await CarsService.createComment(car.id, comment)
      .then((response) => {
        setComments(response.data.comments as Comment[]);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  return (
    <div className="w-full max-w-[830px] mx-auto mt-5 px-3 border-box lg:border-content">
      <div className="flex relative">
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-outlined btn-secondary"
          aria-label="Submit"
          onClick={() => navigate("/auth")}
        />
        <h1 className="m-auto">Rentar auto</h1>
      </div>

      <Car loading={loading} car={car} />

      <Comments comments={comments} createComment={createComment} />
    </div>
  );
};

export default RentCar;
