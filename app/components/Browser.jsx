"use client";

import { useState } from "react";

export default function Browser({ isMaximized }) {
  const [url, setUrl] = useState("https://www.google.com");
  const [history, setHistory] = useState(["https://www.google.com"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [luckyContent, setLuckyContent] = useState(null);

  const randomFacts = [
    {
      title: "Did you know?",
      content: "The first computer mouse was made of wood!",
      image: "/windows-0.png",
    },
    {
      title: "Fun Fact",
      content: "Windows 98 was released on June 25, 1998.",
      image: "/windows0.png",
    },
    {
      title: "Tech History",
      content: "The first version of Internet Explorer was released in 1995.",
      image: "/msie1-1.png",
    },
    {
      title: "Interesting!",
      content:
        "The term 'bug' in computer programming came from an actual moth found in a computer in 1947.",
      image: "/world-3.png",
    },
  ];

  const favorites = [
    { name: "Google", url: "https://www.google.com" },
    { name: "MSN", url: "https://www.msn.com" },
    { name: "Hotmail", url: "https://outlook.live.com" },
    { name: "Yahoo", url: "https://www.yahoo.com" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLuckyContent(null);
    const query = searchTerm || url;
    const newUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(
      query
    )}`;
    setUrl(newUrl);
    setSearchTerm("");
    addToHistory(newUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUrl = url;
    if (!url.includes(".") || url.includes(" ")) {
      newUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(
        url
      )}`;
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      newUrl = `https://${url}`;
    }
    setUrl(newUrl);
    addToHistory(newUrl);
  };

  const handleHomeClick = () => {
    const homeUrl = "https://www.google.com";
    setUrl(homeUrl);
    addToHistory(homeUrl);
  };

  const handleBackClick = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const handleForwardClick = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const addToHistory = (newUrl) => {
    if (history[historyIndex] !== newUrl) {
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, newUrl]);
      setHistoryIndex(newHistory.length);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#c0c0c0] border-b border-win98-border-dark h-8 flex items-center px-2 space-x-2">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <div
            key={item}
            className="px-3 text-sm hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white h-[22px] active:shadow-win98-in relative group cursor-pointer"
            onClick={() => {
              if (item === "Favorites") {
                playSound(SOUNDS.CLICK);
              }
            }}
          >
            {item}
            {item === "Favorites" && (
              <div className="hidden group-hover:block absolute left-0 top-full w-48 bg-[#c0c0c0] border-2 border-win98-border-dark shadow-win98-out z-50">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound(SOUNDS.CLICK);
                      setUrl(favorite.url);
                      addToHistory(favorite.url);
                    }}
                    className="w-full text-left px-2 py-1 hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white cursor-pointer"
                  >
                    {favorite.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-[#c0c0c0] border-b border-win98-border-dark p-2 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackClick}
            disabled={historyIndex === 0}
            className={`win98-button px-3 py-1 min-w-[70px] flex items-center justify-center ${
              historyIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Back
          </button>
          <button
            onClick={handleForwardClick}
            disabled={historyIndex >= history.length - 1}
            className={`win98-button px-3 py-1 min-w-[70px] flex items-center justify-center ${
              historyIndex >= history.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Forward
          </button>
          <button
            onClick={handleHomeClick}
            className="win98-button px-3 py-1 min-w-[70px] flex items-center justify-center"
          >
            Home
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-grow flex items-center gap-2"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="win98-input flex-grow py-1 px-2"
          />
          <button type="submit" className="win98-button px-3 py-1">
            Go
          </button>
        </form>
      </div>
      <div className="flex-grow bg-white">
        {luckyContent ? (
          <div className="flex flex-col items-center justify-center h-full bg-white p-8">
            <div className="win98-window max-w-2xl w-full">
              <div className="win98-title-bar">
                <div className="flex items-center gap-2">
                  <img src={luckyContent.image} alt="" className="w-4 h-4" />
                  <span>{luckyContent.title}</span>
                </div>
              </div>
              <div className="p-8 text-center">
                <p className="text-xl mb-4">{luckyContent.content}</p>
                <button
                  onClick={() => setLuckyContent(null)}
                  className="win98-button px-4 py-2"
                >
                  Back to Search
                </button>
              </div>
            </div>
          </div>
        ) : url === "https://www.google.com" ? (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="w-full max-w-2xl px-6">
              <div className="flex justify-center">
                <img
                  src="/google-logo.png"
                  alt="Google"
                  className="h-64 object-contain"
                />
              </div>
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex gap-2 mb-8">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="win98-input flex-grow py-2 px-4 text-lg"
                    autoFocus
                  />
                </div>
                <div className="flex justify-center gap-6">
                  <button
                    type="submit"
                    className="win98-button px-8 py-2 min-w-[150px]"
                  >
                    Google Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const randomFact =
                        randomFacts[
                          Math.floor(Math.random() * randomFacts.length)
                        ];
                      setLuckyContent(randomFact);
                    }}
                    className="win98-button px-8 py-2 min-w-[150px]"
                  >
                    I'm Feeling Lucky
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : luckyContent ? (
          <div className="flex flex-col items-center justify-center h-full bg-white p-8">
            <div className="win98-window max-w-2xl w-full">
              <div className="win98-title-bar">
                <div className="flex items-center gap-2">
                  <img src={luckyContent.image} alt="" className="w-4 h-4" />
                  <span>{luckyContent.title}</span>
                </div>
              </div>
              <div className="p-8 text-center">
                <p className="text-xl mb-4">{luckyContent.content}</p>
                <button
                  onClick={() => setLuckyContent(null)}
                  className="win98-button px-4 py-2"
                >
                  Back to Search
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white w-full h-full">
            {url === "https://www.google.com" ? (
              <div className="h-full w-full flex flex-col items-center justify-center p-4">
                <div className="mb-8">
                  <Image
                    src="/google-logo.png"
                    alt="Google"
                    width={272}
                    height={92}
                    priority
                  />
                </div>
                <form onSubmit={handleSearch} className="w-full max-w-md">
                  <div className="flex flex-col items-center gap-4">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="win98-input w-full px-2 py-1"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="win98-button px-4 py-1">
                        Google Search
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const randomFact =
                            randomFacts[
                              Math.floor(Math.random() * randomFacts.length)
                            ];
                          setLuckyContent(randomFact);
                        }}
                        className="win98-button px-4 py-1"
                      >
                        I'm Feeling Lucky
                      </button>
                    </div>
                  </div>
                </form>

                {luckyContent && (
                  <div className="win98-window mt-8 p-4 max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={luckyContent.image}
                        alt=""
                        width={16}
                        height={16}
                      />
                      <h3 className="font-bold">{luckyContent.title}</h3>
                    </div>
                    <p>{luckyContent.content}</p>
                  </div>
                )}
              </div>
            ) : (
              <iframe
                src={url}
                className="w-full h-full min-w-full"
                title="Browser Window"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                style={{ minHeight: "500px" }}
              />
            )}
          </div>
        )}
      </div>
      <div className="bg-[#c0c0c0] h-7 border-t border-win98-border-dark flex items-center px-3 text-sm">
        <span className="flex-grow truncate">{url}</span>
      </div>
    </div>
  );
}
