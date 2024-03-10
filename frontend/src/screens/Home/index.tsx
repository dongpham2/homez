import banner from "../../assets/banner.png";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
