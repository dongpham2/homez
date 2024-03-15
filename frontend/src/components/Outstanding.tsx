import { useState, useEffect } from "react";
import expandWhite from "../assets/icons/expandWhite.icon.svg"
import { Link } from "react-router-dom";
import CardOutstanding from "~/components/CardOutstading";
const Outstanding = () =>{
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
        <div className="">
          <div className="flex justify-between items-center py-5">
            <h1 className="text-base sm:text-3xl font-medium text-white mb-10">Dự án nổi bật</h1>
            <Link to={""} className="flex h-full">
              <p className="text-base mr-2 text-white">Xem tất cả</p>
              <img src={expandWhite} alt="expand top right " />
            </Link>
          </div>
          <div className=" items-center justify-between overflow-auto">
            <div className="flex gap-5 m-5">
            {
              cards.map((item, index) =>(
                <div className="flex-1 overflow-hidden min-w-[231px] hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                  <CardOutstanding 
                  key={index} 
                  img={item.img} 
                  title={item.title} 
                  price={item.price} 
                  area={item.area} 
                  address={item.address} 
                  isOpen={item.vote} 
                />
                </div>
                
              ))
            }
            </div>
            
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
    )
}

export default Outstanding