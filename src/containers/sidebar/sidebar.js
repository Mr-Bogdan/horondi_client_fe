import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SideBarItem from './sidebar-item';
import { useStyles } from './sidebar.styles';

const Sidebar = ({ setMenuOpen, menu }) => {
  const styles = useStyles();
  const { categories, language } = useSelector(({ Categories, Language }) => ({
    categories: Categories.list,
    language: Language.language
  }));

  const burgerMenuCategories = useSelector(({ BurgerMenu }) => {
    return BurgerMenu.categories;
  });

  const menuList = burgerMenuCategories.map(({ category, models }) => (
    <SideBarItem
      name={category.name}
      language={language}
      key={category._id}
      models={models}
      handler={() => setMenuOpen(false)}
    />
  ));
  return (
    <div>
      <Drawer anchor='left' open={menu} onClose={() => setMenuOpen(false)}>
        <List className={styles.list}>{menuList}</List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
