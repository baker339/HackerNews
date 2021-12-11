import { useEffect, useState } from "react";
import * as cheerio from "cheerio";

const StoryImg = ({ url }) => {
  const [imgUrl, setImgUrl] = useState(null);

  const fetchImage = async () => {
    try {
      const res = await fetch("https://thingproxy.freeboard.io/fetch/" + url)
        .then((res) => {
          return res.text();
        })
        .then((res) => {
          const $ = cheerio.load(res);
          //create a reference to the meta elements
          const $ogImage = $('meta[property="og:image"]').attr("content");

          setImgUrl($ogImage);
        })
        .catch((e) => {
          console.log("error loading image");
        });
    } catch {
      console.log("Could not load image");
    }
  };

  useEffect(() => {
    if (url) {
      fetchImage();
    }
  }, []);

  return (
    <>
      {imgUrl && <img src={imgUrl} alt="story image" />}
      {!imgUrl && (
        <div className="no-image">
          <i class="fas fa-image fa-5x"></i>No image available
        </div>
      )}
    </>
  );
};

export default StoryImg;
