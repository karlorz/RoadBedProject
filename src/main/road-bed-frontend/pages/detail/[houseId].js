import Header from "@/components/Header";
import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { DateRange } from "react-date-range";
import ImageDialog from "@/components/ImageDialog";

function HouseDetail({ house, firstImage, secondImage, thirdImage }) {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState()

  const [isFavorite, setIsFavorite] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDayCount, setSelectedDayCount] = useState(1)

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelectDate = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)

    let difference = ranges.selection.endDate.getTime() - ranges.selection.startDate.getTime();
    let day = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    setSelectedDayCount(day);
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSelectImage = (image) => {
    setIsOpen(true)
    setSelectedImage(image)
  }

  return (
    <div className="pb-10">
      <Header />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 px-6 py-12 w-full h-64">
          {/* Images */}
          <div className="">
            <div className="flex flex-row">
              <Image
                src={firstImage}
                className="w-[400px] h-60 object-cover cursor-pointer rounded-lg shadow-md
                    hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg hover:z-10"
                width={1200}
                height={100}
                onClick={() => handleSelectImage(firstImage)}
              />
              <div className="space-y-4 ml-1 flex flex-col">
                {secondImage && (
                  <Image
                    src={secondImage}
                    className="w-[200px] h-28 object-cover mx-auto sm:mx-0 cursor-pointer rounded-lg shadow-md
                    hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                    width={1200}
                    height={100}
                    onClick={() => handleSelectImage(secondImage)}
                  />
                )}
                {thirdImage && (
                  <Image
                    src={thirdImage}
                    className="w-[200px] h-28 object-cover mx-auto sm:mx-0 cursor-pointer rounded-lg shadow-md
                    hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                    width={1200}
                    height={100}
                    onClick={() => handleSelectImage(thirdImage)}
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <p
                className="text-gray-500 text-sm text-center cursor-pointer
                        hover:underline pb-4"
              >
                Show all images
              </p>

              <div className="flex items-center px-2">
                <Image
                  className="h-10 w-10 object-cover rounded-full"
                  src={
                    "https://img.freepik.com/free-photo/portrait-charming-middle-aged-attractive-woman-with-blonde-hair_273609-48348.jpg?w=1800&t=st=1675871376~exp=1675871976~hmac=ed53602584a4adcf76a6552e9c1a7fea98249b99ae05aa6416a4f9fec9f55061"
                  }
                  width={100}
                  height={100}
                />
                <p className="pl-2 text-gray-600">Your Host: </p>

                <p className="pl-2 text-gray-600 font-semibold">{house.owner.fullName}</p>
              </div>
            </div>
          </div>
          {/* FeaturesCard */}
          <div className="space-y-2 mt-6 sm:mt-0 ">
            <div className="bg-white p-6 rounded-lg shadow-md w-2/3 mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">{house.description}</p>
                <HeartIcon
                  className="h-6 w-6 cursor-pointer transform transition-all ease-in-out
                  hover:animate-bounce"
                  color="#14B8A5"
                  fill={`${isFavorite === false ? "#fff" : "#14b8a5"}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                />
              </div>
              <div className="border border-1 border-teal-500 w-fit px-1 mt-1 rounded-lg">
                <p className="text-gray-500">{house.category.categoryName}</p>
              </div>
              <p className="pt-1 text-gray-500">{house.capacity} guests</p>
              <p className="text-gray-500 pt-1">{house.city.cityName}</p>
              <p className="pt-1 text-gray-500">{house.address}</p>
              <p className="pt-2 text-end">
                {" "}
                <span className="font-bold text-lg"> {house.price}₺ </span> /
                <span className="text-sm"> Night </span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-2/3 mx-auto">
              <p className="text-gray-800 font-semibold pt-1 pb-2 px-1">Cost</p>
              <div className="border border-1 border-gray-200 my-1" />
              <div className="flex justify-between items-center space-y-1 pt-2 px-1">
                <p className="text-gray-500">{selectedDayCount} x {house.price}₺</p>
                <p className="text-gray-500 font-semibold">{selectedDayCount * house.price}₺</p>
              </div>
              <div className="flex justify-between items-center space-y-1 pb-2 px-1">
                <p className="text-gray-500">Fee</p>
                <p className="text-gray-500 font-semibold">100₺</p>
              </div>
              <div className="border border-1 border-gray-200 my-1" />
              <div className="flex justify-between px-1 items-center pt-2">
                <p className="font-semibold">Total Amount</p>
                <p className="font-bold text-lg">{selectedDayCount * house.price + 100}₺</p>
              </div>
              <div className="text-center mt-6">
                <button
                  className="mx-auto px-4 py-1 rounded-lg font-bold bg-teal-500 shadow-md
                    hover:scale-105 hover:shadow-lg transform transition-all duration-200 ease-in-out"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[650px] sm:mt-80 lg:mt-36 px-6">
          <div className="hidden sm:inline">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#14B8A5"]}
              months={2}
              disabledDates={house.reservedDates.map(d => new Date(d))}
              direction="horizontal"
              onChange={handleSelectDate}
            />
          </div>
          <div className="sm:hidden text-center">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#14B8A5"]}
              disabledDates={house.reservedDates.map(d => new Date(d))}
              direction="horizontal"
              onChange={handleSelectDate}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <ImageDialog
          imageUrl={selectedImage}
          isOpen={isOpen}
          closeModal={closeModal}
          isRemoveBtnExist={false}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let { houseId } = context.params;

  const house = await fetch(
    "http://localhost:8080/houses/getById/" + houseId
  ).then((res) => res.json());

  let firstImage = house.imageUrlList[0];
  let secondImage = house.imageUrlList[1] ? house.imageUrlList[1] : null;
  let thirdImage = house.imageUrlList[2] ? house.imageUrlList[2] : null;

  console.log(house)

  return {
    props: {
      house,
      firstImage,
      secondImage,
      thirdImage,
    },
  };
}

export default HouseDetail;