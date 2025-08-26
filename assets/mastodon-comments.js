/**
 * Mastodon Comments System
 * Based on the approach described at https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/
 */

function loadMastodonComments(tootUrl) {
  // Parse the Mastodon URL to get the instance and toot ID
  const urlParts = tootUrl.match(/https:\/\/([^\/]+)\/@[^\/]+\/(\d+)/);
  if (!urlParts) {
    console.error('Invalid Mastodon URL format');
    document.getElementById('mastodon-comments').innerHTML = 
      '<p><em>Invalid Mastodon URL format. Please check the mastodon_url in the post.</em></p>';
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
        '<p><em>Error loading comments. Please visit the <a href="' + tootUrl + '" target="_blank" rel="noopener">original post on Mastodon</a> to see replies.</em></p>';
    });
}

function displayComments(comments, instance) {
  const commentsContainer = document.getElementById('mastodon-comments');
  
  if (!comments || comments.length === 0) {
    commentsContainer.innerHTML = '<p><em>No hay comentarios aún. ¡Sé el primero en responder en Mastodon!</em></p>';
    return;
  }
  
  // Filter out replies to other replies (keep only top-level replies)
  const topLevelComments = comments.filter(comment => {
    return !comment.in_reply_to_id || !comments.some(c => c.id === comment.in_reply_to_id);
  });
  
  if (topLevelComments.length === 0) {
    commentsContainer.innerHTML = '<p><em>No hay comentarios aún. ¡Sé el primero en responder en Mastodon!</em></p>';
    return;
  }
  
  let commentsHtml = '<h3>Comentarios</h3>';
  
  topLevelComments.forEach(comment => {
    const avatar = comment.account.avatar_static || comment.account.avatar;
    const displayName = escapeHtml(comment.account.display_name || comment.account.username);
    const username = escapeHtml(comment.account.username);
    const acct = escapeHtml(comment.account.acct);
    const url = comment.account.url;
    const date = new Date(comment.created_at).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const content = comment.content; // Content is already HTML from Mastodon
    const commentUrl = comment.url;
    
    commentsHtml += `
      <div class="mastodon-comment">
        <div class="comment-header">
          <img src="${escapeHtml(avatar)}" alt="${displayName}" class="comment-avatar">
          <div class="comment-author">
            <a href="${escapeHtml(url)}" target="_blank" rel="noopener">
              <strong>${displayName}</strong> @${acct}
            </a>
            <div class="comment-date">
              <a href="${escapeHtml(commentUrl)}" target="_blank" rel="noopener">${date}</a>
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

// Simple HTML escaping function for security
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize comments when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const commentsContainer = document.getElementById('mastodon-comments');
  if (commentsContainer) {
    const tootUrl = commentsContainer.getAttribute('data-toot-url');
    if (tootUrl) {
      commentsContainer.innerHTML = '<p><em>Cargando comentarios...</em></p>';
      loadMastodonComments(tootUrl);
    }
  }
});