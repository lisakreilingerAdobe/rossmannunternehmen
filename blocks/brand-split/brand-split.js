export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    // Expect: col0 = image, col1 = text content (heading, description, link)
    const imgCol = cols[0];
    const textCol = cols[1];

    if (imgCol) imgCol.classList.add('brand-split-image');
    if (textCol) textCol.classList.add('brand-split-text');

    // Wrap the entire row in a link if there's an anchor in the text column
    if (textCol) {
      const link = textCol.querySelector('a');
      if (link) {
        const wrapper = document.createElement('a');
        wrapper.href = link.href;
        wrapper.classList.add('brand-split-link');
        wrapper.append(...row.children);
        row.textContent = '';
        row.append(wrapper);

        // Remove the original standalone link/paragraph
        const linkP = wrapper.querySelector('.brand-split-text p > a');
        if (linkP) {
          const p = linkP.closest('p');
          if (p) p.remove();
        }
      }
    }
  });
}
