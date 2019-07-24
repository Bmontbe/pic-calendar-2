import React, { useState } from 'react';
import { Input, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';

function Navbar(props) {

  const [activeItem, setActiveItem] = useState('En Cours')

  const handleItemClick = (e, name) => {
    e.preventDefault();
    setActiveItem(name)
  }


  return (
    <div>
      <Zoom>
        <center style={{ margin: '25px' }}>
          <Flip><h3>PIC EVENT</h3></Flip>
        </center>
      </Zoom>
      <Menu horizontal>
        <Menu.Item name='En Cours' active={activeItem === 'En Cours'} onClick={e => handleItemClick(e, 'En Cours')}>
          <Label color='teal'>{props.event.listevent.length}</Label>
          <Link to={`${process.env.PUBLIC_URL}/`} className='linkNavbar' href="#">En cours</Link>
        </Menu.Item>

        <Menu.Item name='Passés' active={activeItem === 'Passés'} onClick={e => handleItemClick(e, 'Passés')}>
          <Label>{props.event.listPassedevent.length}</Label>
          <Link to={`${process.env.PUBLIC_URL}/evenements_passés`} className='linkNavbar' href="#">Passées</Link>
        </Menu.Item>

        <Menu.Item name='Supprimés' active={activeItem === 'Supprimés'} onClick={e => handleItemClick(e, 'Supprimés')}>
          <Label>1</Label>
          Supprimés
        </Menu.Item>
        {/* <Menu.Item className='ui right aligned category search item'>
          <Input icon='search' placeholder='Search event...' />
        </Menu.Item> */}
      </Menu>
    </div>
  )
}

const mapStateToProps = state => ({
  event: state
})

const NavbarContainer = connect(mapStateToProps)(Navbar)


export default NavbarContainer;