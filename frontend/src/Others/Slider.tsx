import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { type ReactNode } from 'react'
import Slider from 'react-slick'

interface ISlidersProps {
  children: ReactNode
}
const Sliders = ({ children }: ISlidersProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return <Slider {...settings}>{children}</Slider>
}

export default Sliders
