import { useRef, useState, useEffect, ReactNode } from "react";
import banner from "../../assets/banner.png";
import expandTopRight from "../../assets/icons/expandTopRight.icon.svg"
import expandWhite from "../../assets/icons/expandWhite.icon.svg"
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import CardReport from "~/components/CardReport";
import { Card } from "~/components/Card";

const Home = () => {
  const imgtemp = "https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg"
  const imgtemp2 = "https://www.livehome3d.com/assets/img/social/how-to-design-a-house.jpg"
  const card =[
  {
    img:"https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg",
    title: "Nhà của Đông Nhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của Đông",
    price:"15 Triệu/tháng",
    area: 100,
    address: "Quận 7, TP.HCM",
    date: "Đăng hôm nay",
    vote: true,
  },
  {
    img:"https://giadinh.mediacdn.vn/zoom/700_438/2018/11/9/chay-2-15417329139951061473470.jpg",
    title: "House on the Sun",
    price:"0 Đồng/tháng",
    area: 100,
    address: "Sun",
    date: "3/3/2023",
    vote: false,
  },
  {
    img:"https://kientrucphunguyen.com/wp-content/uploads/2022/07/241234228_6284175351624046_748332931927161609_n.jpg",
    title: "Nhà của Hân",
    price:"150 Triệu/tháng",
    area: 100,
    address: "Nam từ Liêm, Hà Nội",
    date: "Đăng hôm nay",
    vote: false,
  },
  {
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0lo1BXoOgPupGc2wH6SYJUL1SBu6tVqdwg&usqp=CAU",
    title: "Nhà của Hân",
    price:"150 Triệu/tháng",
    area: 100,
    address: "Nam từ Liêm, Hà Nội",
    date: "Đăng hôm nay",
    vote: true,
  },
  {
    img:"https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fban_ve_tang_lung_nha_cap_4_mai_bang_9f0da50266.jpg%3Fwidth%3D750%26height%3D515&w=1920&q=75",
    title: "House on the Sun",
    price:"27 Tỷ",
    area: 100,
    address: "Sun",
    date: "3/3/2023",
    vote: true,
  },
  {
    img:"https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg",
    title: "Nhà của Đông",
    price:"15 Triệu/tháng",
    area: 100,
    address: "Quận 7, TP.HCM",
    date: "Đăng hôm nay",
    vote: true,
  },

  {
    img:"https://static-images.vnncdn.net/files/publish/2023/2/26/nha-vuon-1-819.jpg",
    title: "Nhà của Hân",
    price:"150 Triệu/tháng",
    area: 100,
    address: "Nam từ Liêm, Hà Nội",
    date: "Đăng hôm nay",
    vote: true,
  },
  {
    img:"https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fthiet_ke_nha_8e8cbc25ab.png%3Fwidth%3D1600%26height%3D960&w=3840&q=75",
    title: "House on the Sun",
    price:"300 Triệu/tháng",
    area: 100,
    address: "Sun",
    date: "3/3/2023",
    vote: false,
  },
  {
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCmsawF79TyaIh-jfXabWSr1AS9oajgLrPw&usqp=CAU",
    title: "Nhà của Đông",
    price:"15 Triệu/tháng",
    area: 100,
    address: "Quận 7, TP.HCM",
    date: "Đăng hôm nay",
    vote: false,
  },
]

const card2 =[
  {
    img:"https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg",
    title: "Nhà của Đông Nhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của ĐôngNhà của Đông",
    price:"15 Triệu/tháng",
    area: 100,
    address: "Quận 7, TP.HCM",
    date: "Đăng hôm nay",
    vote: true,
  },
  {
    img:"https://giadinh.mediacdn.vn/zoom/700_438/2018/11/9/chay-2-15417329139951061473470.jpg",
    title: "House on the Sun",
    price:"0 Đồng/tháng",
    area: 100,
    address: "Sun",
    date: "3/3/2023",
    vote: false,
  },
  {
    img:"https://kientrucphunguyen.com/wp-content/uploads/2022/07/241234228_6284175351624046_748332931927161609_n.jpg",
    title: "Nhà của Hân",
    price:"150 Triệu/tháng",
    area: 100,
    address: "Nam từ Liêm, Hà Nội",
    date: "Đăng hôm nay",
    vote: false,
  },
  {
    img:"https://static-images.vnncdn.net/files/publish/2023/2/26/nha-vuon-1-819.jpg",
    title: "Nhà của Hân",
    price:"150 Triệu/tháng",
    area: 100,
    address: "Nam từ Liêm, Hà Nội",
    date: "Đăng hôm nay",
    vote: true,
  },
  {
    img:"https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fthiet_ke_nha_8e8cbc25ab.png%3Fwidth%3D1600%26height%3D960&w=3840&q=75",
    title: "House on the Sun",
    price:"300 Triệu/tháng",
    area: 100,
    address: "Sun",
    date: "3/3/2023",
    vote: false,
  },
]

const [isDesktop, setIsDesktop] = useState(true);

useEffect(() => {
  const updateIsDesktop = () => {
    const width = window.innerWidth;
    setIsDesktop(width >= 789);
  };

  window.addEventListener('resize', updateIsDesktop);

  updateIsDesktop();

  return () => {
    window.removeEventListener('resize', updateIsDesktop);
  };
}, []);


  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  
  const handleTabClick = (index:number) => {
    setSelectedTabIndex(index);
  };

  const getCardsForIndex = (index:number, screen:number) => {
    return card.slice(index * screen, (index + 1) * screen);
  };
  const cards = getCardsForIndex(selectedTabIndex, isDesktop ? 3 : 2);
  return (
    <div className="overflow-y-auto h-[880px]">
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


      <div className="m-0 p-0 box-border">

      <div className="h-auto bg-[#F7F7F7] p-5 flex xl:px-[15%] flex-col overflow-auto">
        <div className="w-[550px] sm:w-auto overflow-visible ">
          <div className="flex justify-between items-center py-10">
            <h1 className="text-xl sm:text-3xl font-medium">Dành cho bạn</h1>
            <Link to={""} className="flex h-full">
              <p className="text-base mr-2">Xem tất cả</p>
              <img src={expandTopRight} alt="expand top right" />
            </Link>
          </div>
          <div className="flex gap-5 items-center justify-between ">
            {
              cards.map((item, index) =>(
                <div className="flex-1">
                <CardReport 
                  key={index} 
                  img={item.img} 
                  title={item.title} 
                  price={item.price} 
                  area={item.area} 
                  address={item.address} 
                  date={item.date} 
                  vote={item.vote} 
                  children=""
                />
                </div>
              ))
            }
          </div>
          <ul className="flex px-72 justify-center items-center">
            {Array(Math.ceil(card.length / 3)).fill(null).map((_, i) => (
              <li
                key={i}
                className={`text-6xl cursor-pointer p-0  ${i === selectedTabIndex ? '' : 'text-gray-400'}`}
                onClick={() => handleTabClick(i)}
              >
                .
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col h-auto bg-white p-5 xl:px-[15%] w-[550px] sm:w-auto" >
        <div className="flex justify-center items-center py-10">
          <h1 className="text-3xl font-medium">Bất động sản theo địa điểm</h1>
        </div>
        
        <div className="grid grid-cols-4 grid-flow-row gap-4 ">
              <div className="flex w-full row-span-1 col-span-2 ">
                <img className="h-auto w-full rounded-lg" src={imgtemp2} />              
                </div>
              <div className="w-full col-span-1 ">
                <img className="h-full w-full rounded-lg" src={imgtemp2} /> 
               </div>
              <div className="w-full col-span-1 ">
                <img className="h-full w-full rounded-lg" src={imgtemp} />
              </div>
              <div className="w-full  col-span-1 ">
                <img className="h-full w-full rounded-lg" src={imgtemp} />
              </div>
              <div className="w-full  col-span-1 ">
                <img className="h-full w-full rounded-lg" src={imgtemp2} />
              </div>
              <div className="w-full  row-span-1 col-span-2 ">
                <img className="h-auto w-full rounded-lg" src={imgtemp} />
              </div>
        </div>
      </div>
      <div className="h-auto bg-[#EB6753] p-5 xl:px-[15%]">
        <div className="">
          <div className="flex justify-between items-center py-10">
            <h1 className="text-3xl font-medium text-white">Dự án nổi bật</h1>
            <Link to={""} className="flex h-full">
              <p className="text-base mr-2 text-white">Xem tất cả</p>
              <img src={expandWhite} alt="expand top right " />
            </Link>
          </div>
          <div className="flex gap-5 items-center justify-between ">
            {
              cards.map((item, index) =>(
                <div className="flex-1">
                  <CardReport 
                  key={index} 
                  img={item.img} 
                  title={item.title} 
                  price={item.price} 
                  area={item.area} 
                  address={item.address} 
                  date={item.date} 
                  vote={item.vote} 
                >
                  <div className={`flex justify-center items-center ${false? 'bg-[#E5F8E5] text-[#4CD04C]': 'bg-[#FFE5E5] text-[#FF0000]'}  max-w-max px-2 h-7 rounded-sm ml-3 mt-2`}>sdfd</div>
                
                </CardReport>
                </div>
                
              ))
            }
          </div>
          <ul className="flex px-72 justify-center items-center">
            {Array(Math.ceil(card.length / 3)).fill(null).map((_, i) => (
              <li
                key={i}
                className={`text-6xl cursor-pointer p-0  ${i === selectedTabIndex ? 'text-white' : 'text-gray-400'}`}
                onClick={() => handleTabClick(i)}
              >
                .
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
