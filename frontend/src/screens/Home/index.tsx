import {  useState, useRef  } from "react";
import banner from "../../assets/banner.png";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import LocationRealEstate from "~/components/LocationRealEstate";
import ForYouHome from "~/components/ForYouHome";
import Outstanding from "~/components/Outstanding";
import chevronLeft from "../../assets/icons/chevronLeft.icon.svg"
import chevronRight from "../../assets/icons/chevronRight.icon.svg"

const Home = () => {
  const news = [
    {
    img: "https://assetsio.gnwcdn.com/minecraft-house-ideas-ultimate-survival-house.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
    title: "Những điều quan trọng cần lưu ý trong luật bất động sản mới sắp được ban hành vào tháng 7/2024",
  },
  {
    img: "https://cdn.akamai.steamstatic.com/steam/apps/1190970/capsule_616x353.jpg?t=1708006385",
    title: "Những điều quan trọng cần lưu ý trong luật bất động sản mới sắp được ban hành vào tháng 7/2024",
  },
  {
    img: "",
    title: "Những điều quan trọng cần lưu ý trong luật bất động sản mới sắp được ban hành vào tháng 7/2024",
  },
  {
    img: "https://assetsio.gnwcdn.com/minecraft-house-ideas-ultimate-survival-house.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
    title: "Những điều quan trọng cần lưu ý trong luật bất động sản mới sắp được ban hành vào tháng 7/2024",
  },
  {
    img: "https://assetsio.gnwcdn.com/minecraft-house-ideas-ultimate-survival-house.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
    title: "Những điều quan trọng cần lưu ý trong luật bất động sản mới sắp được ban hành vào tháng 7/2024",
  },
  
]

const [currentSlide,setCurrentSlide ] =useState(0)
const handlePrev = () => {
  if (currentSlide > 0) {
    setCurrentSlide(currentSlide - 1);
  }
};

const handleNext = () => {
  if (currentSlide < news.length - 3) {
    setCurrentSlide(currentSlide + 1);
    
  }
  // slide?.style = `transform: translateX(${33.333333}%)`;
  let domEl: HTMLElement | null = document.querySelector("#slider");
  domEl && (domEl.style.transform = ` translateX(${100}px)`);
};

  return (
    <div className="overflow-y-auto m-0 p-0 flex flex-col h-[880px]">
      <div className="">
      <div className="relative">
        <img src={banner} alt="banner" className="w-full overflow-hidden" />
        <form className="w-[70%] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center pl-3 bg-white border-2 border-gray-primary rounded-lg">
          <Input
            type="text"
            placeholder="Tìm nhanh. VD: Vinhomes Cenntral Park"
            className="w-full indent-1"
          />
          <Button size="sm" variant="primary" className="w-40 sm:w-28">
            Tìm kiếm
          </Button>
        </form>
      </div>

      <div className="flex flex-col bg-[--gray-second] p-5 xl:px-[15%] sm:w-auto overflow-hidden pb-10">
        <ForYouHome/>
      </div>

      <div className="flex flex-col bg-white p-5 xl:px-[15%] sm:w-auto overflow-hidden pb-10" >
        <LocationRealEstate/>
      </div>

      <div className="flex flex-col  bg-[--orange-primary] p-5 xl:px-[15%] sm:w-auto overflow-hidden">
        <Outstanding/>
      </div>

      <div className=" h-full max-h-[500px] bg-white p-5 xl:px-[15%] sm:w-auto overflow-hidden pb-10 relative">

        <h1 className="text-base sm:text-3xl font-medium mb-10">Tin tức bất động sản</h1>
        <div className="flex relative">
          <Button onClick={handlePrev}>
              <img src={chevronLeft} className="h-24" />
            </Button>
          <div id="slider" className="slide flex gap-4 relative px-2">
            {
              news.map((item, index) =>(
                <div key={index} className={`flex-1 h-full overflow-hidden border-none cursor-pointer rounded-lg ${index >= currentSlide && index < currentSlide + 3 ? '': 'hidden'}`} >
                  <img className="h-40 w-full"  src={item.img} alt="news" />
                  <p className="pt-5">{item.title}</p>
                </div>
              ))
            }
          </div>
          <Button onClick={handleNext}>
            <img src={chevronRight} className="h-24" />
          </Button>
        </div>
        
          
      </div>
      </div>
    </div>
  );
};

export default Home;
