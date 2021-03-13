function getUserPosts(username) {
    return axios.get(`/posts/getUserPosts/${username}`)
        .then((response) => {
            const results = response.data;
            let _imageContainer = document.getElementById('image-card-container');
            if(!$.isEmptyObject(results)) {
                let _queryResultsHTML = '';
                results.forEach((post) => {
                    _queryResultsHTML += createImageCard(post);
                });
                _imageContainer.innerHTML = _queryResultsHTML;
                _imageContainer.removeAttribute('hidden');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal server error.');
        });
}

function getUserInformation(username) {
    return axios.get(`/users/getProfile/${username}`)
        .then((response) => {
            let data = response.data[0];

            if(data) {
                let _pageTitle = document.getElementById('head-profile-username');
                let _profileContainer = document.getElementById('profile-container');
                let _profileUsername = document.getElementById('profile-username');
                let _profileRegisterDate = document.getElementById('profile-register-date');
                let _postUploads = document.getElementById('post-uploads');
                let _postViews = document.getElementById('post-views');

                _pageTitle.innerText = `Imgur - ${data.username}`;
                _profileUsername.innerText = data.username;
                _profileRegisterDate.innerText = moment(new Date(data.created)).fromNow();
                _postUploads.innerText = data.uploads;
                _postViews.innerText = data.views;
                _profileContainer.removeAttribute('hidden');
            } else {
                location.replace('/error?m=User does not exist');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal server error.');
        });
}

function getPostData(postID) {
    return axios.get(`/posts/get/${postID}`)
        .then((response) => {
            let data = response.data;
            if(!$.isEmptyObject(data)) {
                let _headTitle = document.getElementById('head-post-title');
                let _imageContainer = document.getElementById('image-container');
                let _postPhoto = document.getElementById('post-photo');
                let _postTitle = document.getElementById('post-title');
                let _postDescription = document.getElementById('post-description');
                let _postAuthor = document.getElementById('post-author');
                let _postDate = document.getElementById('post-date');
                let _postViews = document.getElementById('post-views');
                let _postComments = document.getElementById('post-comments');
                let _postURL = document.getElementById('post-url');

                _postPhoto.setAttribute('src', data.photopath.split('public/')[1]);
                _headTitle.innerText = 'Imgur - ' + data.title;
                _postTitle.innerText = data.title;
                _postDescription.innerText = data.description;
                _postAuthor.innerText = data.username;
                _postAuthor.setAttribute('href', `/profile?u=${data.username}`)
                _postDate.innerText = moment(new Date(data.created)).fromNow();
                _postViews.innerText = data.views;
                _postComments.innerText = data.comments;
                _postURL.value = `http://localhost:3000/image?id=${data.id}`;

                _imageContainer.removeAttribute('hidden');
            } else {
                location.replace('/error?m=Post does not exist.');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal server error.');
        })
}

function runSearch() {
    axios.get(`/posts/search/${searchQuery}`)
        .then((response) => {
            const results = response.data;
            let _imageContainer = document.getElementById('image-card-container');

            // No images found, show an alert.
            if($.isEmptyObject(results)) {
                let _queryAlertContainer = document.getElementById('query-alert');
                let _queryAlertText = document.getElementById('query-alert-text');
                _queryAlertText.innerText = searchQuery;
                _queryAlertContainer.removeAttribute('hidden');
            } else {
                // Results were found, displaying them.
                let _queryResultsHTML = '';
                results.forEach((post) => {
                    _queryResultsHTML += createImageCard(post);
                });

                _imageContainer.innerHTML = _queryResultsHTML;
                _imageContainer.removeAttribute('hidden');
            }
        })
        .catch((err) => {
            location.replace('/error?m=Internal server error.');
        })
};

function createImageCard(data) {
    let thumbnailSrc = data.thumbnail.split('public/')[1];
    return `
        <div class="card bg-dark text-white image-thumbnail-card">
            <a class="card-block stretched-link text-decoration-none" href="/image?id=${data.id}">
                <img src="${thumbnailSrc}" class="card-img-top" alt="Error loading image...">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.description}</p>
                    <ul class="list-inline text-muted float-right">
                        <li class="list-inline-item">
                            <i class="fas fa-eye"></i>
                            <span id="post-views">${data.views}</span>
                        </li>
                        <li class="list-inline-item">
                            <i class="fas fa-comment"></i>
                            <span id="post-comments">${data.comments}</span>
                        </li>
                        <li class="list-inline-item">
                            <i class="far fa-clock"></i>
                            <span id="post-views">${moment(new Date(data.created)).fromNow()}</span>
                        </li>
                    </ul>
                </div>
            </a>
        </div>
    `;
};