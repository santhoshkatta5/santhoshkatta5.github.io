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