import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollBarStyles } from './scroll-bar.styles';
import { SCROLL_BAR_DATA } from './constants';
import Sidebar from '../../containers/sidebar';

const ScrollBar = ({ homeRef }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState({});
  const styles = scrollBarStyles({
    isDarkSection: currentSection.sectionStyle === 'dark'
  });

  useEffect(() => {
    const scrollHandler = () => {
      const homeElement = homeRef.current;

      if (!homeElement) {
        return;
      }

      const windowMiddle = window.scrollY + window.innerHeight / 2;
      const sectionsData = Array.from(homeElement.children)
        .slice(0, 5)
        .filter((item) => item.id)
        .map((item) => {
          const sectionStyles = window.getComputedStyle(item);
          const margin =
            parseFloat(sectionStyles.marginTop) + parseFloat(sectionStyles.marginBottom);

          return {
            id: `#${item.id}`,
            sectionStyle: item.dataset.sectionStyle,
            sectionStart: item.offsetTop,
            sectionEnd: item.offsetTop + item.offsetHeight + margin
          };
        });

      const sectionOnView = sectionsData.find(
        (el) => el.sectionStart <= windowMiddle && el.sectionEnd >= windowMiddle
      );

      if (sectionOnView && sectionOnView.id !== currentSection.id) {
        setCurrentSection({
          id: sectionOnView.id,
          sectionStyle: sectionOnView.sectionStyle
        });
      }
    };
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [homeRef, currentSection.id]);

  return (
    <>
      <div className={styles.scrollBar}>
        {SCROLL_BAR_DATA.map((item) => (
          <a key={item} href={item} className={styles.scrollBarItem}>
            <div className={styles.sectionPoint} data-id={item === currentSection.id} />
            <span className={styles.sectionTitle}>
              {t(`common.scrollbar.${item.replace('#', '')}`)}
            </span>
          </a>
        ))}
      </div>
      <Sidebar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </>
  );
};

export default ScrollBar;
