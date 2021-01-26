import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Image, Container, Button, Form, Col } from "react-bootstrap";

export const imageStyle = {
  margin: "10px",
  width: "220px",
  height: "220px",
};

function App() {
  const [vinNumber, set_vinNumber] = useState("");
  const [carData, set_carData] = useState();
  const [imageData, set_imageData] = useState();
  const [flag, set_flag] = useState(false);
  const CAR_API_KEY = process.env.REACT_APP_CAR_API_KEY;
  const IMAGE_API_KEY = process.env.REACT_APP_IMAGE_API_KEY;
  let data;

  const search = async () => {
    var config = {
      method: "get",
      url: `https://api.overheid.io/voertuiggegevens/${vinNumber}`,
      headers: {
        "ovio-api-key": `${CAR_API_KEY}`,
      },
    };

    await axios(config)
      .then(function (response) {
        data = response.data;
        set_carData(data);
      })
      .catch((error) => {
        console.log(error);
        set_flag(true);
      });

    if (data) {
      const carResponce = await axios.get(
        `https://api.unsplash.com/search/photos?query=car+${data.handelsbenaming}&client_id=${IMAGE_API_KEY}`
      );
      set_imageData(carResponce.data);
    }
  };
  return (
    <div className="App">
      <Container className="main1">
        <h1 className="header">Please enter you license plate number</h1>
        <Form.Row className="justify-content-md-center mt-4">
          <Form.Group>
            <Form.Control
              value={vinNumber}
              onChange={(e) => set_vinNumber(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Button variant="dark" onClick={search}>
              Search
            </Button>
          </Form.Group>
        </Form.Row>

        <Container
          className=" secondary"
          as={Col}
          md={{ span: 3, offset: 4.5 }}
          fluid
          align="center"
        >
          {" "}
          {carData ? (
            <>
              <h2> Tread Name</h2>
              <p>{carData.handelsbenaming}</p>
              <h2>Data of first admission</h2>
              <p>{carData.datum_eerste_toelating}</p>
              <h2>Fuel type</h2>
              <p>{carData.brandstof[0].brandstof_omschrijving}</p>
            </>
          ) : (
            flag && <h2>Invalid license number</h2>
          )}
        </Container>

        {imageData && (
          <>
            <Container
              as={Col}
              mobile={16}
              computer={6}
              md={{ span: 10, offset: 1 }}
              align="center"
            >
              <div>
                <Image
                  src={imageData.results[0].urls.small}
                  style={imageStyle}
                  size="medium"
                  inline
                  spaced
                />
                <Image
                  src={imageData.results[1].urls.small}
                  style={imageStyle}
                  size="medium"
                  inline
                  spaced
                />
                <Image
                  src={imageData.results[2].urls.small}
                  style={imageStyle}
                  size="medium"
                  inline
                  spaced
                />
              </div>
            </Container>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
