export default function decorate(block) {
  const rows = [...block.children];
  const ul = document.createElement('ul');
  ul.className = 'news-feed-list';

  rows.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.className = 'news-feed-item';

    // Check if this is a "more" link row (single cell, no image)
    if (cells.length === 1 && !cells[0].querySelector('picture')) {
      li.className = 'news-feed-more';
      li.innerHTML = cells[0].innerHTML;
      ul.append(li);
      return;
    }

    // Image cell
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-feed-item-image';
    if (cells[0]) {
      imageDiv.innerHTML = cells[0].innerHTML;
      const badge = imageDiv.querySelector('em');
      if (badge) {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'news-feed-badge';
        badgeEl.textContent = badge.textContent;
        imageDiv.append(badgeEl);
        badge.remove();
      }
    }

    // Text cell
    const textDiv = document.createElement('div');
    textDiv.className = 'news-feed-item-text';
    if (cells[1]) {
      textDiv.innerHTML = cells[1].innerHTML;
    }

    // Determine featured vs compact based on presence of description (more than 2 elements in text)
    const paras = textDiv.querySelectorAll('p');
    if (paras.length > 2) {
      li.classList.add('news-feed-featured');
    } else {
      li.classList.add('news-feed-compact');
    }

    li.append(imageDiv, textDiv);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
