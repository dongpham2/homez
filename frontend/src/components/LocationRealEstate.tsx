
const LocationRealEstate =()=>{
    const realEstates = [
        {
        img: "",
        title: "",
        subTitle: ""
    },
    {
        img: "",
        title: "",
        subTitle: ""
    },
]
    const imgtemp = "https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg"
    const imgtemp2 = "https://www.livehome3d.com/assets/img/social/how-to-design-a-house.jpg"
    return(
    <div>
        <div className="flex justify-center items-center mb-10">
            <h1 className="text-base sm:text-3xl font-medium py-5">Bất động sản theo địa điểm</h1>
        </div>
        <div className="overflow-auto">
            <div className="grid sm:grid-cols-4 sm:grid-rows-2 gap-4 min-w-[550px] max-h-[600px]">
                <div className="sm:row-span-1 sm:col-span-2 relative flex">
                    <img className="h-full w-full rounded-lg" src={imgtemp} alt="banner" /> 
                    <div className={`absolute p-6 text-white ${imgtemp ? '': 'hidden'}`}>
                        <p className="font-medium">Đà Nẵng</p>         
                        <span>110 tin đăng</span>
                    </div> 
                </div>
                
                <div className="sm:col-span-1 relative flex">
                    <img className="h-full w-full rounded-lg" src={imgtemp} alt="banner" /> 
                    <div className={`absolute p-6 text-white ${imgtemp ? '': 'hidden'}`}>
                        <p className="font-medium">Đà Nẵng</p>         
                        <span>110 tin đăng</span>
                    </div> 
                </div>

                <div className="sm:col-span-1 relative flex">
                    <img className="h-full w-full rounded-lg" src={realEstates[0].img} alt="banner" /> 
                    <div className={`absolute p-6 text-white ${realEstates[0].img ? '': 'hidden'}`}>
                        <p className="font-medium">Đà Nẵng</p>         
                        <span>110 tin đăng</span>
                    </div> 
                </div>

                <div className="sm:col-span-1 relative flex">                  
                    <img className="h-full w-full rounded-lg" src={imgtemp2} alt="banner" /> 
                    <div className={`absolute p-6 text-white ${imgtemp2 ? '': 'hidden'}`}>
                        <p className="font-medium">Đà Nẵng</p>         
                        <span>110 tin đăng</span>
                    </div> 
                </div>

                <div className="sm:col-span-1 relative flex">
                    <img className="h-full w-full rounded-lg" src={realEstates[0].img} alt="banner" /> 
                    <div className={`absolute p-6 text-white ${realEstates[0].img ? '': 'hidden'}`}>
                        <p className="font-medium">Đà Nẵng</p>         
                        <span>110 tin đăng</span>
                    </div>            
                </div>

                <div className="sm:row-span-1 sm:col-span-2 relative flex">
                    <img className="h-full w-full rounded-lg" src={imgtemp2} alt="banner" /> 
                    <div className={`absolute p-6 text-white ${imgtemp2 ? '': 'hidden'}`}>
                        <p className="font-medium">Đà Nẵng</p>         
                        <span>110 tin đăng</span>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    )
}
export default LocationRealEstate