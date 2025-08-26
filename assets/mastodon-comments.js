/**
 * Mastodon Comments System
 * Based on the approach described at https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/
 */

function loadMastodonComments(tootUrl) {
  // Parse the Mastodon URL to get the instance and toot ID
  const urlParts = tootUrl.match(/https:\/\/([^\/]+)\/@[^\/]+\/(\d+)/);
  if (!urlParts) {
    console.error('Invalid Mastodon URL format');
    return;
  }
  
  const instance = urlParts[1];
  const tootId = urlParts[2];
  
  // Mastodon API endpoint for fetching replies
  const apiUrl = `https://${instance}/api/v1/statuses/${tootId}/context`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayComments(data.descendants, instance);
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
      document.getElementById('mastodon-comments').innerHTML = 
        '<p><em>Error loading comments. Please visit the <a href="' + tootUrl + '">original post on Mastodon</a> to see replies.</em></p>';
    });
}

function displayComments(comments, instance) {
  const commentsContainer = document.getElementById('mastodon-comments');
  
  if (!comments || comments.length === 0) {
    commentsContainer.innerHTML = '<p><em>No comments yet. Be the first to reply on Mastodon!</em></p>';
    return;
  }
  
  let commentsHtml = '<h3>Comments</h3>';
  
  comments.forEach(comment => {
    // Skip replies to other comments (keep only top-level replies)
    if (comment.in_reply_to_id && comments.some(c => c.id === comment.in_reply_to_id)) {
      return;
    }
    
    const avatar = comment.account.avatar_static || comment.account.avatar;
    const displayName = comment.account.display_name || comment.account.username;
    const username = comment.account.username;
    const acct = comment.account.acct;
    const url = comment.account.url;
    const date = new Date(comment.created_at).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
    const content = comment.content;
    const commentUrl = comment.url;
    
    commentsHtml += `
      <div class="mastodon-comment">
        <div class="comment-header">
          <img src="${avatar}" alt="${displayName}" class="comment-avatar">
          <div class="comment-author">
            <a href="${url}" target="_blank" rel="noopener">
              <strong>${displayName}</strong> @${acct}
            </a>
            <div class="comment-date">
              <a href="${commentUrl}" target="_blank" rel="noopener">${date}</a>
            </div>
          </div>
        </div>
        <div class="comment-content">
          ${content}
        </div>
      </div>
    `;
  });
  
  commentsContainer.innerHTML = commentsHtml;
}

// Initialize comments when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const commentsContainer = document.getElementById('mastodon-comments');
  if (commentsContainer) {
    const tootUrl = commentsContainer.getAttribute('data-toot-url');
    if (tootUrl) {
      commentsContainer.innerHTML = '<p><em>Loading comments...</em></p>';
      loadMastodonComments(tootUrl);
    }
  }
});