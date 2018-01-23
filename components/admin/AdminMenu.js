import { Menu } from 'semantic-ui-react'

import MenuLinkItem from '../MenuLinkItem'

export default (props) => {
  const { activeItem } = props;
  return (
    <Menu secondary pointing fluid vertical color='blue'>
      <MenuLinkItem href='/admin/' active={activeItem === 'index'} content='Přehled' />
      <MenuLinkItem href='/admin/users' active={activeItem === 'users'} content='Uživatelé' />
      <MenuLinkItem href='/admin/courses' active={activeItem === 'courses'} content='Kurzy' />
    </Menu>
  );
}
