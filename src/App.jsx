import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("https://cricket-score-backend.onrender.com");

function App() {
  const [scores, setScore] = useState([]); 
  const [visibleBalls, setVisibleBalls] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("https://cricket-score-backend.onrender.com/getScores");
        const data = await response.json();
        setScore(data); 
        if (data.length > 0) {
          const latestBalls = data[data.length - 1].balls || [];
          setVisibleBalls([]); 
          displayBallsIncrementally(latestBalls); 
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
        setLoading(false);
      }
    };

    fetchScores();

    socket.on("updateScore", (newScores) => {
      setScore((prevScores) => [...prevScores, newScores]);
      
      if (newScores.balls) {
        setVisibleBalls([]);
        displayBallsIncrementally(newScores.balls); 
      }
    });

    return () => {
      socket.off("updateScore");
    };
  }, []);

  const displayBallsIncrementally = (balls) => {
    balls.forEach((ball, index) => {
      setTimeout(() => {
        setVisibleBalls((prevBalls) => [...prevBalls, ball]);
      }, index * 3000); 
    });
  };

  const latestScore = scores[scores.length - 1]; 

  const getBallClass = (ballEvent) => {
    if (["wide", "w","W"].includes(ballEvent?.toLowerCase())) return "ball-event wide";
    if (["out", "o"].includes(ballEvent?.toLowerCase())) return "ball-event out";
    // if (ballEvent?.toLowerCase() === "out") return "ball-event out";
    if (["six", "6"].includes(ballEvent?.toLowerCase())) return "ball-event six";
    if (["four", "4"].includes(ballEvent?.toLowerCase())) return "ball-event four";
    
    return "ball-event";
  };

  return (
    <div>
      <h1 className="center-h1">Live Cricket Scores</h1>
      {loading ? (
        <div>Loading latest score...</div>
      ) : latestScore ? (
        <div className="center-div">
          <div className="increseSize">
            <span className="runs">{latestScore.runs}</span> /{" "}
            <span className="wicket">{latestScore.wicket}</span>
          </div>
          <div className="over">Over ({latestScore.over})</div>
        </div>
      ) : (
        <div>No scores available</div>
      )}

      {latestScore && (
        <div className="scroeCard">
          <div className="scoreStyle">
            <div className="teamA">
              <p className="IND">IND</p>
              <p className="runs-score">
                {latestScore.runs} - {latestScore.wicket}
              </p>
              <p className="overCount">
                {latestScore.over} <span className="star">*</span>
              </p>
            </div>
            <div className="batsmanName">
              <p className="batsmanName-score">
                {latestScore.batsman}* ({latestScore.batsmanScore})
              </p>
              <p className="batsmanName-score">
                {latestScore.NonstickerBatsman}*{" "}
                ({latestScore.NonstickerBatsmanScore})
              </p>
            </div>
            <div className="bowllerName">
              <p className="bowller-name">{latestScore.bowler} :- </p>
              <div className="balls">
                {visibleBalls.length > 0 && (
                  <div className="ball-events">
                    <ul className="ball-ul">
                      {visibleBalls.map((ball, index) => (
                        <li key={index} className={getBallClass(ball)}>
                          {ball ? ball : "No Event"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
