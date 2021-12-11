import "./App.css";
import GetTopStories from "./functions/GetTopStories";
import { useEffect, useState } from "react";
import StoryCard from "./components/StoryCard";
import Header from "./components/Header";

function App() {
  const [stories, setStories] = useState(null);
  const storiesIncrement = 9;
  const [storiesToShow, setStoriesToShow] = useState(storiesIncrement);
  const [showTopButton, setShowTopButton] = useState("none");

  const fetchStories = async () => {
    const response = await GetTopStories();
    setStories(JSON.parse(response.body));
  };

  useEffect(() => {
    fetchStories();
  }, []);

  //Get the button:
  const mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowTopButton("block");
    } else {
      setShowTopButton("none");
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <>
      <Header />
      <div id="story-container" className="container">
        {stories &&
          stories.map((story, index) => {
            if (index < storiesToShow) return <StoryCard storyid={story} />;
            else return null;
          })}
      </div>
      {stories && (
        <div
          className="container-end"
          onMouseEnter={() =>
            setStoriesToShow(storiesToShow + storiesIncrement)
          }
          onClick={() => setStoriesToShow(storiesToShow + storiesIncrement)}
        >
          <button
            onClick={topFunction}
            id="myBtn"
            title="Go to top"
            style={{ display: showTopButton }}
          >
            <i class="fas fa-arrow-up"></i>
          </button>
          <span className="down-arrow">
            {storiesToShow < 500 && (
              <i className="fas fa-arrow-circle-down fa-2x"></i>
            )}
            {storiesToShow >= 500 && <p>Fin</p>}
          </span>
        </div>
      )}
    </>
  );
}

export default App;
