import React, { useState } from 'react';

function AdminView() {
  const [formData, setFormData] = useState({
    matchId: '',
    over: '',
    runs: '',
    batsman: '',
    batsmanScore:'',
    NonstickerBatsman:'',
    NonstickerBatsmanScore:'',
    bowler: '',
    extras: '',
    wicket: '',
    firstBall: '',
    SecondBall: '',
    ThirdBall: '',
    fourthBall: '',
    fifthBall: '',
    sixthBall: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://cricket-score-backend.onrender.com/updateScore", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        <input name="matchId" placeholder="Match ID" onChange={handleChange} value={formData.matchId} />
        <input name="over" placeholder="Over" onChange={handleChange} value={formData.over} />
        <input name="runs" placeholder="Runs" onChange={handleChange} value={formData.runs} />
        <input name="batsman" placeholder="Batsman" onChange={handleChange} value={formData.batsman} />
        <input name="bowler" placeholder="Bowler" onChange={handleChange} value={formData.bowler} />
        <input name="extras" placeholder="Extras" onChange={handleChange} value={formData.extras} />
        <input name="wicket" placeholder="Wicket" onChange={handleChange} value={formData.wicket} />
        <input name="batsmanScore" placeholder="batsmanScore" onChange={handleChange} value={formData.batsmanScore} />
        <input name="NonstickerBatsman" placeholder="NonstickerBatsman" onChange={handleChange} value={formData.NonstickerBatsman} />
        <input name="NonstickerBatsmanScore" placeholder="NonstickerBatsmanScore" onChange={handleChange} value={formData.NonstickerBatsmanScore} />
        <div className="ballsCount">
          <input type="text" name="firstBall" placeholder="1 Ball" onChange={handleChange} value={formData.firstBall} />
          <input type="text" name="SecondBall" placeholder="2 Ball" onChange={handleChange} value={formData.SecondBall} />
          <input type="text" name="ThirdBall" placeholder="3 Ball" onChange={handleChange} value={formData.ThirdBall} />
          <input type="text" name="fourthBall" placeholder="4 Ball" onChange={handleChange} value={formData.fourthBall} />
          <input type="text" name="fifthBall" placeholder="5 Ball" onChange={handleChange} value={formData.fifthBall} />
          <input type="" name="sixthBall" placeholder="6 Ball" onChange={handleChange} value={formData.sixthBall} />
        </div>
        <button type="submit" className="submit">Update Score</button>
      </form>
    </div>
  );
}

export default AdminView;
