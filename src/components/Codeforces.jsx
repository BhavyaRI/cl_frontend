import React, { useState } from "react";
import axios from "axios";
import BarChartGraph from "./BarChartGraph";
import RatingGraph from "./RatingGraph";
import ProblemTagsPieChart from "./ProblemTagsPieChart";

function CodeforcesDashboard() {
  const [handle, setHandle] = useState("");
  const [info, setInfo] = useState(null);
  const [problemGraph, setProblemGraph] = useState(null);
  const [ratinggraph, setRatingGraph] = useState(null);
  const [tagsCount, setTagsCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    if (!handle) {
      setError("Please enter a Codeforces handle.");
      return;
    }
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const response = await axios.get(`https://cl-backend-iota.vercel.app/api/${handle}`);
      const { info, problemgraph, ratinggraph, tagscount } = response.data;
      setInfo(info);
      setProblemGraph(problemgraph);
      setRatingGraph(ratinggraph);
      setTagsCount(tagscount);
    } catch (err) {
      setError("Failed to fetch user data. Please check the handle and try again.");
      console.error("Error fetching user data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank) => {
    if (rank < 1200) return "#8E8E93"; 
    if (rank < 1400) return "#34C759"; 
    if (rank < 1600) return "#00C7BE"; 
    if (rank < 1900) return "#0A84FF"; 
    if (rank < 2100) return "#5856D6"; 
    if (rank >= 2100 && rank < 2400) return "#FF9500"; 
    if (rank >= 2400 && rank < 4000) return "#FF3B30"; 
    return "#FFFFFF";
  };

  const ratingDataArray = ratinggraph
    ? Object.entries(ratinggraph).map(([time, newRating]) => ({
        ratingUpdateTimeSeconds: Number(time),
        newRating,
      }))
    : [];

  const tagsDataForPie = tagsCount
    ? (() => {
        const sortedTags = Object.entries(tagsCount)
          .map(([tag, count]) => ({ id: tag, label: tag, value: count }))
          .sort((a, b) => b.value - a.value);
        
        const MAX_SLICES = 15; 

        if (sortedTags.length <= MAX_SLICES) return sortedTags;
        
        const topTags = sortedTags.slice(0, MAX_SLICES - 1);
        const otherCount = sortedTags.slice(MAX_SLICES - 1).reduce((sum, item) => sum + item.value, 0);
        return [...topTags, { id: 'Other', label: 'Other', value: otherCount }];
      })()
    : [];

  const totalProblemsSolved = problemGraph
    ? Object.values(problemGraph).reduce((sum, count) => sum + count, 0)
    : 0;

  return (
    <div className="bg-dark-bg min-h-screen flex flex-col items-center p-4 sm:p-6 text-dark-text-primary">
      <h1 className="text-4xl font-bold mb-6">Codeforces Dashboard</h1>

      <div className="flex space-x-2 mb-6 w-full max-w-md">
        <input
          type="search"
          required
          placeholder="Enter Codeforces handle"
          className="input input-bordered w-full bg-dark-card text-white placeholder-dark-text-secondary border-dark-border"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchUserData()}
        />
        <button onClick={fetchUserData} className="btn bg-dark-accent text-white border-0" disabled={loading}>
          {loading ? "..." : "Fetch"}
        </button>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {info && (
        <div className="w-full max-w-6xl">
          <div className="card bg-dark-card shadow-xl mb-6 p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-dark-accent ring-offset-dark-card ring-offset-2">
                  <img src={info.titlePhoto} alt="Profile" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-center sm:text-left">{info.firstName} {info.lastName || ""}</h2>
                <p className="text-dark-text-secondary text-center sm:text-left">{info.country || "Unknown"}</p>
                <p className="text-md text-dark-text-secondary text-center sm:text-left">
                  Rank: <span style={{ color: getRankColor(info.rating), fontWeight: 'bold' }}>{info.rank || "N/A"}</span>
                  <span className="mx-2">|</span>
                  Max Rank: <span style={{ color: getRankColor(info.maxRating), fontWeight: 'bold' }}>{info.maxRank || "N/A"}</span>
                </p>
              </div>
            </div>
            
            <div className="divider my-6 before:bg-dark-border after:bg-dark-border"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-[#212123] rounded-lg">
                <div className="text-3xl font-bold">{info.rating || "N/A"}</div>
                <div className="text-sm text-dark-text-secondary">Current Rating</div>
              </div>
              <div className="p-4 bg-[#212123] rounded-lg">
                <div className="text-3xl font-bold">{info.maxRating || "N/A"}</div>
                <div className="text-sm text-dark-text-secondary">Max Rating</div>
              </div>
              <div className="p-4 bg-[#212123] rounded-lg">
                <div className="text-3xl font-bold">{totalProblemsSolved}</div>
                <div className="text-sm text-dark-text-secondary">Problems Solved</div>
              </div>
              <div className="p-4 bg-[#212123] rounded-lg">
                <div className="text-3xl font-bold">{Object.keys(ratinggraph || {}).length}</div>
                <div className="text-sm text-dark-text-secondary">Contests Attended</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {ratingDataArray.length > 0 && (
              <div className="card bg-dark-card shadow-xl p-6 h-96">
                <h3 className="text-xl font-bold mb-4">Rating Over Time</h3>
                <RatingGraph data={ratingDataArray} />
              </div>
            )}
            {tagsDataForPie.length > 0 && (
              <div className="card bg-dark-card shadow-xl p-6 h-96">
                <h3 className="text-xl font-bold mb-4">Problems Solved by Tag</h3>
                <ProblemTagsPieChart data={tagsDataForPie} />
              </div>
            )}
          </div>

          {problemGraph && (
            <div className="card bg-dark-card shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Problems Solved by Rating</h3>
              <div className="w-full h-[500px]">
                <BarChartGraph problemGraph={problemGraph} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CodeforcesDashboard;