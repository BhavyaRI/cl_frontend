import React from 'react';

const resourceCategories = [
  {
    title: 'CP Sheets',
    resources: [
      { name: 'CP-31 Sheet by TLE Eliminators', url: 'https://www.tle-eliminators.com/cp-sheet' },
      { name: 'ACD Ladder', url: 'https://acodedaily.com/' },
      { name: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
      { name: 'A2OJ Ladders', url: 'https://earthshakira.github.io/a2oj-clientside/server/Ladders.html' },
      { name: 'Codeforces Problemset', url: 'https://codeforces.com/problemset' },
    ],
  },
  {
    title: 'DSA Sheets',
    resources: [
      { name: 'NeetCode (All Problems)', url: 'https://neetcode.io/practice' },
      { name: 'Striver\'s A2Z DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' },
      { name: 'Blind 75', url: 'https://www.techinterviewhandbook.org/grind75' },
    ],
  },
  {
    title: 'Other Resources',
    resources: [
      { name: 'USACO Guide', url: 'https://usaco.guide/' },
      { name: 'CP-Algorithms', url: 'https://cp-algorithms.com/' },
    ],
  },
  {
    title: 'YouTube Videos',
    resources: [
      { name: 'Striver\'s DSA Playlist', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6hRLrJAD_iJbsZASh-Q_' },
      { name: 'TLE Eliminators Playlist', url: 'https://www.youtube.com/@TLE-Eliminators' },
      { name: 'NeetCode', url: 'https://www.youtube.com/@NeetCode' },
      { name: 'Colin Galen ', url: 'https://www.youtube.com/@ColinGalen/' },
      { name: 'Abdul Bari', url: 'https://www.youtube.com/@abdul_bari' },
    ],
  },
  {
    title: 'Handbooks (PDFs)',
    resources: [
      { name: 'Competitive Programmer\'s Handbook', url: 'https://cses.fi/book/book.pdf' },
      { name: 'How to Improve in CP', url: 'https://cin.ufpe.br/~fbma/Crack/%5BTutorial%5D%20A%20Way%20to%20Practice%20Competitive%20Programming.pdf' }, // Note: Update this path to your local PDF file
    ],
  },
];

const ResourceCard = ({ name, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="card bg-[#212123] hover:bg-dark-border shadow-md hover:shadow-lg transition-all duration-300 p-4 rounded-lg"
  >
    <div className="flex items-center justify-between">
      <p className="text-md font-semibold text-dark-text-primary">{name}</p>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
  </a>
);

function Resources() {
  return (
    <div className="bg-dark-bg min-h-screen flex flex-col items-center p-6 text-dark-text-primary">
      <h1 className="text-4xl font-bold mb-8">Resources</h1>
      <div className="w-full max-w-5xl space-y-8">
        {resourceCategories.map((category) => (
          <div key={category.title} className="card bg-dark-card shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.resources.map((resource) => (
                <ResourceCard key={resource.name} name={resource.name} url={resource.url} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;