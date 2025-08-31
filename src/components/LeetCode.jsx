import React, { useState } from "react";
import axios from "axios";
import SolvedStatsPieChart from "./SolvedStatsPieChart"; 

function LeetcodeDashboard() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!username) {
      setError("Please enter a LeetCode username.");
      return;
    }
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const response = await axios.get(`https://cl-backend-iota.vercel.app/api/leetcode/${username}`);
      setUserData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("User not found. Please check the username.");
      } else {
        setError("An error occurred while fetching data.");
      }
      console.error("Error fetching user data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const pieChartData = userData
    ? [
        { id: "Easy", label: "Easy", value: userData.solvedStats.easySolved, color: '#34C759' },
        { id: "Medium", label: "Medium", value: userData.solvedStats.mediumSolved, color: '#FFCC00' },
        { id: "Hard", label: "Hard", value: userData.solvedStats.hardSolved, color: '#FF3B30' },
      ]
    : [];

  return (
    <div className="bg-dark-bg min-h-screen flex flex-col items-center p-4 text-dark-text-primary">
      <h1 className="text-4xl font-bold mb-6">LeetCode Dashboard</h1>

      <div className="flex space-x-2 mb-6 w-full max-w-md">
        <input
          type="search"
          required
          placeholder="Enter LeetCode username"
          className="input input-bordered w-full bg-dark-card text-white placeholder-dark-text-secondary border-dark-border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchUserData()}
        />
        <button onClick={fetchUserData} className="btn bg-dark-accent text-white border-0" disabled={loading}>
          {loading ? "..." : "Fetch"}
        </button>
        </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {userData && (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="card bg-dark-card shadow-xl p-6 lg:col-span-2">
            <div className="flex items-center space-x-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-dark-accent ring-offset-base-100 ring-offset-2">
                  <img src={userData.userProfile.avatar} alt={`${userData.userProfile.username}'s avatar`} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold">{userData.userProfile.realName}</h2>
                <p className="text-dark-accent text-lg">@{userData.userProfile.username}</p>
              </div>
            </div>
          </div>

          <div className="card bg-dark-card shadow-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Problems Solved</h3>
            <div className="w-full h-80">
              <SolvedStatsPieChart data={pieChartData} />
            </div>
            <p className="text-center font-bold text-lg mt-4">
              Total Solved: {userData.solvedStats.totalSolved}
            </p>
          </div>

          <div className="card bg-dark-card shadow-xl p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-center">Badges</h3>
            {userData.badges.length > 0 ? (
              <div className="flex-grow overflow-y-auto pr-2" style={{ maxHeight: '24rem' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {userData.badges.map((badge) => {
                     const iconUrl = badge.icon.startsWith('/')
                      ? `https://leetcode.com${badge.icon}`
                      : badge.icon;
                    return (
                      <div key={badge.id} className="flex flex-col items-center text-center">
                        <img src={iconUrl} alt={badge.name} className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm font-semibold">{badge.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-center text-dark-text-secondary mt-10">No badges earned yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LeetcodeDashboard;