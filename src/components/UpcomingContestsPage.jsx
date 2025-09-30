import React, { useEffect, useState } from "react";
import axios from "axios";

const cfdata = {
  CODEFORCES: {
    logo: "https://sta.codeforces.com/s/77938/images/codeforces-logo-with-telegram.png",
    url: (id) => `https://codeforces.com/contests/${id}`,
  },
};

const useCountdown = (starttimesec) => {
  const [timeLeft, setTimeLeft] = useState(starttimesec * 1000 - new Date().getTime());

  useEffect(() => {
    if (!starttimesec || isNaN(starttimesec)) return;
    const timer = setInterval(() => {
      setTimeLeft(starttimesec * 1000 - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [starttimesec]);

  const hasEnded = timeLeft < 0;

  if (isNaN(timeLeft) || hasEnded) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isRunning: !hasEnded, hasEnded: true };
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isRunning: true, hasEnded: false };
};

const ContestCard = ({ contest }) => {
  const { days, hours, minutes, seconds, isRunning, hasEnded } = useCountdown(contest.startTimeSeconds);
  const platform = cfdata.CODEFORCES;

  const frmtdrt = (durationSeconds) => {
    const h = Math.floor(durationSeconds / 3600);
    const m = Math.floor((durationSeconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="card bg-dark-card shadow-lg p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 transition-transform transform hover:scale-[1.02]">
      {platform.logo && (
        <div className="flex-shrink-0">
          <img src={platform.logo} alt="Codeforces" className="h-8 w-auto object-contain" />
        </div>
      )}

      <div className="flex-grow text-center md:text-left">
        <div className="flex items-start gap-3 mb-1">
          <h2 className="text-xl font-bold text-dark-text-primary flex-grow">{contest.name}</h2>
          <span className="badge bg-dark-accent text-white font-semibold flex-shrink-0 mt-1">{contest.type}</span>
        </div>
        <p className="text-sm text-dark-text-secondary">{new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
        <p className="text-sm text-dark-text-secondary">Duration: {frmtdrt(contest.durationSeconds)}</p>
      </div>

      <div className="flex-shrink-0 text-center">
        <p className="text-xs text-dark-text-secondary mb-1">{hasEnded ? 'Status' : 'Starts In'}</p>
        {isRunning && !hasEnded ? (
          <div className="font-mono text-2xl text-dark-accent tracking-widest">
            <span>{String(days).padStart(2, '0')}:</span>
            <span>{String(hours).padStart(2, '0')}:</span>
            <span>{String(minutes).padStart(2, '0')}:</span>
            <span>{String(seconds).padStart(2, '0')}</span>
          </div>
        ) : (
          <p className="text-2xl text-green-400 font-bold">{hasEnded ? "Ended" : "Running!"}</p>
        )}
      </div>

      <div className="flex-shrink-0">
        <a
          href={platform.url ? platform.url(contest.id) : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-dark-accent text-white border-0 hover:bg-blue-500"
        >
          Go to Contest
        </a>
      </div>
    </div>
  );
};

const UpcomingContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const upcomingcnt = async () => {
      try {
        const response = await axios.get("https://cl-backend-iota.vercel.app/api/contests/upcoming");
        
        const newData = response.data
          .map(contest => ({
            ...contest,
            site: 'CODEFORCES',
          }))
          .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
        
        setContests(newData);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch upcoming contests";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    upcomingcnt();
  }, []);

  return (
    <div className="bg-dark-bg min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-dark-text-primary">
        Upcoming Codeforces Contests
      </h1>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {loading && <p className="text-center text-dark-text-secondary">Loading contests...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && contests.length > 0 ? (
            contests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
            ))
        ) : (
            !loading && <p className="text-center text-dark-text-secondary">No upcoming Codeforces contests found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingContestsPage;