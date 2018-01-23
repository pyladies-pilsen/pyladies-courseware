import Router from 'next/router'
import { Menu, Icon, Button } from 'semantic-ui-react'

export default (props) => {
  const { activeItem, user } = props;
  const handleItemClick = () => null;

  const menuItem = (name, link, content, icon) => (
    <Menu.Item
      name={name}
      active={activeItem === name}
      onClick={() => Router.push(link)}
      content={content}
      icon={icon || null}
    />
  );

  return (
    <Menu
      secondary
      pointing
      color='red'
      style={{
        borderBottom: '1px solid #934',
      }}
    >
      <Menu.Item style={{ paddingLeft: 0 }} onClick={() => Router.push('/')}>
        <img
          src="/static/images/pyladies-logo.png"
          alt="Pyladies courseware"
          style={{
            width: 106,
            height: 45,
            marginBottom: -20,
          }}
        />
      </Menu.Item>
      <Menu.Menu position='right' className='mainMenu'>
        {menuItem('courses', '/courses/', 'Kurzy')}
        {menuItem('homeworks', '/homeworks/', 'Úkoly')}
        {menuItem('forum', '/forum/', 'Fórum')}
        {user && menuItem('admin', '/admin/', 'Administrace')}
        {user && menuItem('profile', '/profile/', user.displayName, 'user')}
        {user && (
          <Menu.Item
            name='logout'
            content='Odhlásit'
            icon='sign out'
            onClick={() => { window.location = '/auth/logout'; }}
          />
        )}
        {!user && menuItem('login', '/login', 'Přihlásit', 'sign in')}
      </Menu.Menu>
    </Menu>
  );
};

/*

<Menu.Item name='friends' active={activeItem === 'friends'} onClick={handleItemClick} content='Odevzdávání úkolů' />
<Menu.Item name='friends' active={activeItem === 'friends'} onClick={handleItemClick} content='Review úkolů' />
<Menu.Item name='friends' active={activeItem === 'friends'} onClick={handleItemClick} content='Administrace' />
<Menu.Item name='logout' active={activeItem === 'logout'} onClick={handleItemClick} />

*/
