import React from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deletePlace } from "../slices/placesSlice";
import { addPlaces } from "../slices/placesSlice";
import { Dialog, Transition } from "@headlessui/react";

const PlacesPage = () => {
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function fetchData() {
      console.log("useeffect");
      const { data } = await axios.get("/places");
      dispatch(addPlaces(data));
    }
    fetchData();
  }, []);

  // async function removePlace({_id}) {
  //   try {
  //     await axios.put("/place", _id);
  //     dispatch(deletePlace(_id));
  //     alert("succesfull delete");
  //   } catch (error) {
  //     alert("cant delete");
  //   }
  // }

  const places = useSelector((state) => state.place.places);

  return (
    <div>
      <Dialog
        as="div"
        open={modal}
        onClose={() => setModal(false)}
        className="flex  items-center absolute top-0 bottom-0 left-0 right-0 bg-black opacity-20 "
      >
        <div className=" mx-auto w-[30%] h-[20%] p-5 bg-white rounded-lg">
          <p className="text-black w-full text-center text-xl">
            You sure to delete this place?
          </p>
          <button
            className="bg-primary py-2 px-3 w-full rounded-xl my-5 text-white font-bold"
            onClick={() => setModal(false)}
          >
            Delete
          </button>
        </div>
      </Dialog>

      <AccountNav />
      <div className="w-full lg:w-[80%] mx-auto">
        {places !== undefined && (
          <div>
            <div className="text-center font-bold  text-lg lg:text-xl">
              {" "}
              List Of All Added Places
            </div>

            <div>
              {places.map((place) => (
                <div
                  className="flex  gap-4 justify-between shadow p-3 my-2 items-center rounded-lg"
                  key={place._id}
                >
                  <div className="flex gap-4">
                    {place.photos.length > 0 && (
                      <div className="flex h-32 w-32 shrink-0 grow ">
                        <img
                          className="object-cover rounded-sm"
                          src={
                            "http://localhost:4500/uploads/" + place.photos[0]
                          }
                          alt=""
                        />
                      </div>
                    )}

                    <div className="text-justify grow-0 shrink">
                      <div className=" text-lg lg:text-xl lg:font-bold">
                        {place.title}
                      </div>
                      <p>{place.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-white">
                    <Link
                      to={"/account/places/" + place._id}
                      className="bg-primary py-1 px-3 rounded-md hover:opacity-95 ease-in-out"
                    >
                      show
                    </Link>
                    <button
                      onClick={() => setModal(true)}
                      className="bg-primary py-1 px-3 rounded-md hover:opacity-95 ease-in-out"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <br />
          </div>
        )}

        <Link
          className="inline-flex gap-1 bg-primary text-white rounded-full py-2 pl-4 pr-6"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new place
        </Link>
      </div>
    </div>
  );
};

export default PlacesPage;
