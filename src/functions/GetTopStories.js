async function GetTopStories() {
  const url =
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

  try {
    const response = await fetch(url).then((response) => response.json());

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
}

export default GetTopStories;
