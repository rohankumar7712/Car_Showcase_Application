import Slider from "react-slick";

const images = [
  "https://images.unsplash.com/photo-1567863786964-9d65fa4469ed?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://cdn.wallpapersafari.com/10/97/tDnNFA.jpg",
  "https://carwow-uk-wp-2.imgix.net/AstonMartinDB5GoldfingerContinuation_05.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=60&w=1920",
  "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/27486974/pexels-photo-27486974/free-photo-of-pagani-at-automobile-museum-in-turin-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const HeroSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div>
      {/* Carousel Section */}
      <div className="my-5 bg-gray-900 container mx-auto p-2 pt-20">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Car Image ${index + 1}`}
                className="object-cover w-full h-[80vh] rounded-xl shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
