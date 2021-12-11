import { useEffect, useState } from "react";
import GetStoryById from "../functions/GetStoryById";
import StoryImg from "./StoryImg";

const StoryCard = ({ storyid }) => {
  const [story, setStory] = useState(null);

  const fetchStory = async () => {
    const response = await GetStoryById(storyid);
    setStory(JSON.parse(response.body));
  };

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <>
      {story && (
        <a target="_blank" rel="noopener noreferrer" href={story.url}>
          <div className="story-card">
            <StoryImg url={story.url} />
            <h3>{story.title}</h3>
            <hr />
            <p>By: {story.by}</p>
            <p>Comments: {story.descendants}</p>
            <p>Score: {story.score}</p>
          </div>
        </a>
      )}
    </>
  );
};

export default StoryCard;
