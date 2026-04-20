export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  if (cols.length < 2) return;

  const [imageCol, textCol] = cols;
  imageCol.classList.add('store-cta-image');
  textCol.classList.add('store-cta-content');
}
