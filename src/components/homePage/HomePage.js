import React, { useState, useRef, useEffect } from "react";
import "./HomePage.css";
const HomePage = () => {
  const [images, setImages] = useState([]);
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    topText: "",
    foundersMsg: "",
    dummy1: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 // https://jts-admin-nodejs.onrender.com  http://localhost:8000
  // useEffect(()=>{
  //   // Your client-side code (e.g., in a React component or a separate script)

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/data', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }});

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     // Use the retrieved data as needed
  //     console.log('Data from server:', data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     // Handle error, e.g., show an error message to the user
  //   }
  // };

  // // Call the fetchData function when needed
  // fetchData();

  //  },[]);
  // const delAllImg = async() =>{
  //   try {
  //     const response = await fetch('https://jts-admin-nodejs.onrender.com/delete-all-images', {
  //       method: 'DELETE'
  //     });

  //     if (response.ok) {
  //       console.log('All images deleted successfully');
  //       // Perform any additional actions after successful deletion
  //     } else {
  //       console.error('Failed to delete images');
  //       // Handle the error case
  //     }
  //   } catch (error) {
  //     console.error('Error deleting images:', error);
  //     // Handle any network errors
  //   }
  // }
  const SendImgToBackend = async (event, file) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(
        "http://localhost:8000/upload", // Replace with your server URL
        {
          method: "POST",
          body: formData
        }
      );

      if (response.ok) {
        console.log("File uploaded successfully");
        // You can perform additional actions here if the file is uploaded successfully
      } else {
        console.error("Failed to upload file");
        // Handle the error case
      }
      alert("Thank you!");
   

    } catch (error) {
      console.error("Error uploading file:", error);
    }
};

  const MessageBackend = async (event, fieldName) => {
    event.preventDefault();
    console.log(formData);
    // Reset form fields after successful submission
    // setFormData({
    //   topText: "",
    //   foundersMsg: "",
    //   dummy1: "",
    // });

    if (formData.topText !== "" || formData.foundersMsg !== "") {
      // try {
      //   const response = await fetch("http://localhost:8000/send-message", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ message: formData.topText }),
      //   });

      //   if (response.ok) {
      //     console.log("Message sent successfully");
      //     // You can perform additional actions here if the message is sent successfully
      //   } else {
      //     console.error("Failed to send message");
      //     // Handle the error case
      //   }
      //   alert("Thankyou!");
      // } catch (error) {
      //   console.error("Error sending message:", error);
      // }

      try {
        let fieldValue;
        switch (fieldName) {
          case "topText":
            fieldValue = formData.topText;
            break;
          case "foundersMsg":
            fieldValue = formData.foundersMsg;
            break;
          case "dummy1":
            fieldValue = formData.dummy1;
            break;
          default:
            console.error("Invalid field name");
            return;
        }

        const response = await fetch(
          "http://localhost:8000/send-message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: { [fieldName]: fieldValue } }),
          }
        );

        if (response.ok) {
          console.log(`${fieldName} sent successfully`);
          // You can perform additional actions here if the message is sent successfully
        } else {
          console.error(`Failed to send ${fieldName}`);
          // Handle the error case
        }
        alert("Thank you!");
      } catch (error) {
        console.error(`Error sending ${fieldName}:`, error);
      }
    } else {
      alert("You are sending Empty fields!!");
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
 
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images);
        console.log(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

 
  const pickImgHandler = () => {
    filePickerRef.current.click();
  };
  const pickedImgHandler = (event) => {
    //console.log(event.target);
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      console.log(file)
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className="form_container">
      <h2>Landing Page Text Content:</h2>
      <hr
        style={{
          border: "1px solid green",
          width: "100%",
          marginBottom: "20px",
        }}
      />
      <div className="text_fields">
        <div className="text_fields_input">
          <label htmlFor="topText">Top-Text:</label>
          {/* <input
            type="text"
            id="topText"
            name="topText"
            required
            value={formData.topText}
            onChange={handleInputChange}
          /> */}
          <textarea
            id="topText"
            name="topText"
            required
            value={formData.topText}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn_class">
          <button
            type="submit"
            onClick={(event) => MessageBackend(event, "topText")}
          >
            Submit
          </button>
          <button type="submit">Delete</button>
        </div>
      </div>
      <div className="text_fields">
        <div className="text_fields_input">
          <label htmlFor="foundersMsg">Founder's Message:</label>
          {/* <input
            type="text"
            id="foundersMsg"
            name="foundersMsg"
            required
            value={formData.foundersMsg}
            onChange={handleInputChange}
          /> */}
          <textarea
            id="foundersMsg"
            name="foundersMsg"
            required
            value={formData.foundersMsg}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn_class">
          <button
            type="submit"
            onClick={(event) => MessageBackend(event, "foundersMsg")}
          >
            Submit
          </button>
          <button type="submit">Delete</button>
        </div>
      </div>
      <div className="text_fields">
        <div className="text_fields_input">
          <label htmlFor="dummy1">Dummy:</label>
          {/* <input
          type="text"
          id="dummy1"
          name="dummy1"
          required
          value={formData.dummy1}
          onChange={handleInputChange}
        /> */}
          <textarea
            id="dummy1"
            name="dummy1"
            required
            value={formData.dummy1}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn_class">
          <button
            type="submit"
            onClick={(event) => MessageBackend(event, "dummy1")}
          >
            Submit
          </button>
          <button >Delete</button>
         
        </div>
      </div>
      <h2>Landing Page Graphic Content:</h2>
      <hr
        style={{
          border: "1px solid green",
          width: "100%",
          marginBottom: "20px",
        }}
      />
      <div className="text_fields_img">
        <div className="text_fields_input_img">
          <label htmlFor="slideImg1">Slider-Image 1:</label>
          <input
            ref={filePickerRef}
            type="file"
            id="slideImg1"
            name="slideImg1"
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png"
            onChange={pickedImgHandler}
          />
          {previewUrl && (
            <img
              style={{ width: "100px", height: "60px" }}
              src={previewUrl}
              alt="Preview"
            />
          )}
          {!previewUrl && <p>Please Pick an Image.</p>}
          <div> <button type="button" onClick={pickImgHandler}>
          Pick-Image
        </button></div>
        </div>
      
        <div className="btn_class">
          <button
          id="slideImageTop"
            type="submit"
            onClick={(event) => SendImgToBackend(event, file)}
          >
            Submit
          </button>
          <button type="submit" onClick={fetchImages}>Delete</button>
          {/* <button type="submit" onClick={delAllImg}>Empty folder</button> */}
        </div>
        
      </div>
      {isValid && <p style={{color:"red",fontSize:"13px"}}>#Please upload a valid Img.</p>}
      <h2>Landing Page Testimonials:</h2>
      <hr
        style={{
          border: "1px solid green",
          width: "100%",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};

export default HomePage;
