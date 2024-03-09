let divMenu = document.createElement("div");
let divContent = document.createElement("div");
divMenu.classList.add("divMenu");
divContent.classList.add("divContent");
let userId;
const validateUser = async () => {
  userId = txtUserId.value;
  userName.innerHTML = await getName(userId);
  container.innerHTML = "";
  let str = `<p onclick='showData(1)'> <i class='bi bi-bookmarks-fill'></i> Feeds[All]</p>
    <p onclick='showData(2)'> <i class='bi bi-file-earmark-post-fill'></i>My posts</p>
    <p onclick='showData(3)'> <i class='bi bi-journal-album'></i> My Albums</p>
    <p onclick='showData(4)'> <i class='bi bi-person'></i> My profile</p>
    <p onclick='showData(5)'> <i class='bi bi-check2-square'></i> My Todo</p>
    <p onclick='showData(6)'> <i class='bi bi-door-open'></i> Logout</p>`;
  divMenu.innerHTML = str;
  container.append(divMenu);
  divContent.innerHTML = await getFeeds();
  container.append(divContent);
};
const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
const getName = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const json = await fetchData(url);
  return json.name;
};
const getFeeds = async () => {
  
  const url = "https://jsonplaceholder.typicode.com/posts";
  const json = await fetchData(url);
  let str = "<div><h2>Feeds [All Posts]</h2>";
  json.map((element) => {
    str += `<p><b>user:</b>${element.userId}</p>`;
    str += `<p><b>Title:</b>${element.title}</p>`;
    str += `<p><b>Body:</b>${element.body}</p>`;
    str += `<p onclick=getComments(${element.id})><b>View Comments</b></p>
        <hr>`;
  });
  str += "</div>";
  return str;
};
const getPosts = async () => {
  const url = `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Posts</h2>";
  json.map((element) => {
    str += `<p><b>Title:</b>${element.userId}</p>
        <p><b>Title:</b>${element.title}</p>
        <p><b>Body:</b>${element.body}</p>
        <p onclick="getComments(${element.id})"><b>View Comments</b></p>
        <hr>
        `;
  });
  str += "</div>";
  return str;
};
const getTodos = async () => {
  const url = `https://jsonplaceholder.typicode.com/todos/?userId=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Todos</h2>";
  json.map((element) => {
    str += `<p><b>user:</b>${element.userId}</p>
        <p><b>Title:</b>${element.title}</p>
        <p><b>completed:</b>${element.completed}</p>
        <hr>
         `;
  });
  str += "</div>";
  return str;
};
const getAlbums = async () => {
  const url = `https://jsonplaceholder.typicode.com/albums/?userId=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Albums</h2>";
  json.map((element) => {
    str += `
        <p onclick="getPhotos(${element.userId})">${element.title}</p>
        <hr>
        `;
  });
  str += "</div>";
  return str;
};
const getPhotos = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/photos/?albumId=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Albums</h2>";
  json.map((element) => {
    str += `<a href="${element.url}"><img src="${element.thumbnailUrl}" onclick="getPhoto(${element.id})" width=250px height=250px></a>
        `;
  });
  str += "</div>";
  divContent.innerHTML = str;
};
const getComments = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/comments/?postId=${id}`;
  const json = await fetchData(url);
  let str = "<div><h2>Comments</h2>";
  json.map((element) => {
    str += `<p><b>name:</b>${element.name}</p>`;
    str += `<p><b>Email:</b>${element.email}</p>`;
    str += `<p><b>Body:</b>${element.body}</p>`;
    str += `<p onclick=getComments(${element.id})></p>
        <hr>`;
  });
  str += "</div>";
  divContent.innerHTML = str;
};
const getprofile = async () => {
  const url = `https://jsonplaceholder.typicode.com/users/?id=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Profile</h2>";
  json.map((element) => {
    str += `<p><b>Name:</b>${element.name}</p>`;
    str += `<p><b>Email:</b>${element.email}</p>`;
    // str += `<p><b>Body:</b>${element.body}</p>`;
    // str += `<p onclick=getComments(${element.id})></p>
      
  });
  str += "<hr></div>";
  return str;
  // divContent.innerHTML = str;
};
const showData = async (pageId) => {
  if (pageId == 1) {
    divContent.innerHTML = await getFeeds();
  } else if (pageId == 2) {
    divContent.innerHTML = await getPosts();
  } else if (pageId == 3) {
    divContent.innerHTML = await getAlbums();
  } else if (pageId == 4) {
    divContent.innerHTML = await getprofile();
  } else if (pageId == 5) {
    divContent.innerHTML = await getTodos();
  }else if (pageId == 6) {
    location.reload();
  }
};