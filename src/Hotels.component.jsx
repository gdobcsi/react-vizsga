import { useState } from "react";
import Subscription from "./Subscription.component";

const Hotel = ({ hotel }) => {
  let [showDetails, setShowDetails] = useState(true);
  let [showSub, setShowSub] = useState(false);

  return (
    <div
      style={{
        width: "90%",
        border: "1px solid black",
        padding: "1rem",
        margin: "1rem auto",
      }}
    >
      <div>{hotel.name}</div>
      {showDetails ? (
        <button onClick={() => setShowDetails(!showDetails)}>Show More</button>
      ) : (
        <>
          <button onClick={() => setShowDetails(!showDetails)}>
            Show Less
          </button>
          <div>
            {hotel.city} ({hotel.stars})
          </div>
          <button onClick={() => setShowSub(!showSub)}>
            Request More Info
          </button>
          {showSub ? (
            <Subscription
              name={hotel.name}
              hideSub={setShowSub}
              hideDet={setShowDetails}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Hotel;
