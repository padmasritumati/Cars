import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Image, Header, Container, Message } from "semantic-ui-react";

export const imageStyle = {
  margin: "10px",
  width: "120px",
  height: "120px",
};

function App() {
  const [vinNumber, set_vinNumber] = useState("");
  const [carData, set_carData] = useState();
  const [imageData, set_imageData] = useState();

  const search = async () => {
    const vinNumerPathParam = encodeURIComponent(vinNumber);

    const response = await axios.get(
      `https://api.overheid.io/voertuiggegevens/${vinNumerPathParam}?ovio-api-key=3c98e24818644dfbe76bb5a84d5efe82547d8f0c90d19ab2f310a6d176e4c0a6`
    );
    set_carData(response.data);

    const carResponce = await axios.get(
      `https://api.unsplash.com/search/photos?query=car+${response.data.handelsbenaming}&client_id=qlsdgMYydzfmOzDhmshMLYZBQcG-7lbv2xKAEv8rPoo`
    );
    set_imageData(carResponce.data);
  };

  return (
    <div className="App">
      <Container>
        <Header size="huge">Please enter you license plate number</Header>

        <p>
          <input
            value={vinNumber}
            onChange={(e) => set_vinNumber(e.target.value)}
          />
          <button onClick={search}>Search</button>
        </p>
        {carData && (
          <>
            <h2>Tread Name</h2>
            <p>{carData.handelsbenaming}</p>
            <h2>Data of first admission</h2>
            <p>{carData.datum_eerste_toelating}</p>
            <h2>Fuel type</h2>
            <p>{carData.brandstof[0].brandstof_omschrijving}</p>
          </>
        )}
        {imageData ? console.log(imageData.results, "imageData") : null}
        {imageData ? (
          <>
            <Grid.Column mobile={16} computer={6} textAlign="center">
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
            </Grid.Column>
          </>
        ) : null}
      </Container>
    </div>
  );
}

export default App;
