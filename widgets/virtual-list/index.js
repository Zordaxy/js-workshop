let lastPost = 0;
let isFetching = false;

fetchAndAppendPosts();

const postsContainer = document.querySelector("#posts-container");
// postsContainer.addEventListener("scroll", debounce(scrollListener));
postsContainer.addEventListener("scroll", scrollListener);

function scrollListener() {
  if (isFetching) return;
  const bottomRemains = this.scrollHeight - this.scrollTop - this.clientHeight;
  if (bottomRemains < 100) fetchAndAppendPosts();
}

function fetchAndAppendPosts() {
  if (isFetching) return;
  isFetching = true;

  const url = createUrl(lastPost + 1);

  fetch(url)
    .then((response) => response.json())
    .then(({ posts, hasNext }) => {
      const fragment = document.createDocumentFragment();
      posts.forEach((post) => {
        fragment.appendChild(createPostElement(post));
      });

      postsContainer.appendChild(fragment);

      // if (hasNext) {
      lastPost += 20;
      // }
      isFetching = false;
    });
}

function createUrl(start = 0) {
  const count = 20;
  //  Generate url from Base url and parameters:
  // count, start
  // https://example.com?count=${count}&start=${start}`;
  return `https://dummyjson.com/posts?limit=${count}`;
}

function createPostElement(post) {
  const postElement = document.createElement("p");
  postElement.classList.add("post");
  postElement.textContent = post.body;
  return postElement;
}
