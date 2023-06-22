const MemeComponent = ( {topText, bottomText, randomImage }) => {
    
  
    return (
      <div className="flex justify-center items-center">
        <img src={randomImage} className=" w-96 h-96" alt="Meme" />
        <h2 className="absolute bottom-0 left-1/2 transform -translate-x-1/2">{bottomText}</h2>
        <h2 className="absolute text-white  -translate-y-10 left-1/2 transform -translate-x-1/2">{topText}</h2>
      </div>
    );
  };
  export default MemeComponent;


  
