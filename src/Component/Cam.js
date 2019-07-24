import React, { useState } from "react";
import Webcam from "react-webcam";
import { connect } from 'react-redux';

function Cam(props) {
  let webcam;

  const [gallery, setGallery] = useState([]);
  const [capturePhoto, setCapturePhoto] = useState(false)

  const setRef = cam => {
    webcam = cam;
  };

  const capture = () => {
    const imageSrc = webcam.getScreenshot();
    setGallery([...gallery, imageSrc]);
    console.log(imageSrc)
    props.dispatch({ type: 'TOGGLE_MODAL' });
    props.dispatch({ type: 'ADD_SRC_IMG', payload: imageSrc })
    setCapturePhoto(true)
    // props.isOpen(true)
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
  }

  return (
    <div>
      {
        capturePhoto
          ? (
            <div>
              <img src={gallery[0]} />
              <p>nom de votre photo : {props.event.imgsrc.slice(-20)}</p>
            </div>
          ) :
          (
            <div>
              <Webcam
                audio={false}
                height={350}
                ref={setRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
              />
              <button onClick={capture}>Capture photo</button>
            </div>
          )
      }
    </div>
  );
}



const mapStateToProps = state => ({
  event: state
})

const CamContainer = connect(mapStateToProps)(Cam)


export default CamContainer;
