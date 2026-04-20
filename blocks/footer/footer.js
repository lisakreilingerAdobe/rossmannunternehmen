import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const SOCIAL_LINKS = [
  { name: 'instagram', href: 'https://www.instagram.com/mein_rossmann/?hl=de' },
  { name: 'facebook', href: 'https://www.facebook.com/rossmann.gmbh' },
  { name: 'tiktok', href: 'https://www.tiktok.com/@mein_rossmann' },
  { name: 'youtube', href: 'https://www.youtube.com/user/DrogerieRossmann' },
  { name: 'linkedin', href: 'https://de.linkedin.com/company/dirk-rossmann-gmbh' },
  { name: 'xing', href: 'https://www.xing.com/companies/dirkrossmanngmbh' },
  { name: 'kununu', href: 'https://www.kununu.com/de/dirk-rossmann' },
];

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // Inject social icons into footer section with h2 "ROSSMANN in Social Media"
  const sections = block.querySelectorAll('.section');
  sections.forEach((section) => {
    const h2 = section.querySelector('h2');
    if (h2 && h2.textContent.includes('Social Media')) {
      // Check if social icons already exist (icon spans)
      const existingIcons = section.querySelectorAll('.icon');
      if (existingIcons.length === 0) {
        // Build social icon paragraph
        const p = document.createElement('p');
        SOCIAL_LINKS.forEach(({ name, href }) => {
          const a = document.createElement('a');
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          const span = document.createElement('span');
          span.className = `icon icon-${name}`;
          const img = document.createElement('img');
          img.src = `/icons/${name}.svg`;
          img.alt = name;
          img.width = 35;
          img.height = 35;
          span.append(img);
          a.append(span);
          p.append(a);
        });
        // Insert after the h2
        h2.insertAdjacentElement('afterend', p);
      }
    }
  });

  // Ensure grey spacer section exists (section 1)
  // If first section has no content, it's the grey spacer - that's fine
  // If first section has nav links (no grey spacer was created), inject one
  const firstSection = block.querySelector('.section');
  if (firstSection) {
    const firstLinks = firstSection.querySelector('ul');
    if (firstLinks) {
      // No grey spacer - insert one before first section
      const spacer = document.createElement('div');
      spacer.className = 'section';
      block.querySelector('div').insertBefore(spacer, firstSection);
    }
  }
}
