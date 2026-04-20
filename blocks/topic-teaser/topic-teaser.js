export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  if (cols.length < 2) return;

  const [imageCol, textCol] = cols;

  // Mark the image column
  imageCol.classList.add('topic-teaser-image');

  // Mark the text column
  textCol.classList.add('topic-teaser-content');

  // Find the link in the text column and make the whole block clickable
  const link = textCol.querySelector('a');
  if (link) {
    const wrapper = document.createElement('a');
    wrapper.href = link.href;
    wrapper.className = 'topic-teaser-link';
    wrapper.setAttribute('aria-label', link.textContent || '');

    // Move the row contents into the link wrapper
    while (row.firstChild) {
      wrapper.appendChild(row.firstChild);
    }
    row.appendChild(wrapper);
  }
}
