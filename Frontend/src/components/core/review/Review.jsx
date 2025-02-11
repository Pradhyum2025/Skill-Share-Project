
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import ReviewCard from './Reviewcard';

// Custom Next Arrow Component
const CustomNextArrow = ({ onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: "-25px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      👉
    </div>
  );
};

// Custom Previous Arrow Component
const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "-25px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      👈
    </div>
  );
};

export default function Review({about,reviews}) {
   
  let [slidesToShow,setSlidesToShow] = useState(4); 
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width<= 640) {
        setSlidesToShow(1);
      }else if(width>640 && width <= 768) {
        setSlidesToShow(2);
      }else if (width>768 && width < 1080) {
        setSlidesToShow(3);
      }else {
        setSlidesToShow(4);
      }
    };

    // Run on initial render
    handleResize();

    // Add and clean up the resize event listener
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  let settings = {
    dots: true,
    infinite: true ,
    speed: 600,
    slidesToShow:slidesToShow,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:950,
    easing:"ease-in-out",
    
  }
 
  if(slidesToShow>2){
    // settings.nextArrow = <CustomNextArrow />; // Pass custom next arrow
    // settings.prevArrow = <CustomPrevArrow />; // Pass custom previous arrow
  }

  return (
    <div className='w-[100%] pb-10 m-auto pt-5 '>
      <p className='text-indigo-600 font-[700] w-[90%] m-auto text-[1.2rem]'>{about}</p>
      <Slider {...settings} className='w-[84%] sm:w-[90%]  md:w-[90%] lg:w-[93%] xl:w-[95%] m-auto'>
      {reviews && reviews.map(review =>{
        return < ReviewCard key={review.comment} review={review}/>
      })}
     </Slider>

    </div>
  )
}
