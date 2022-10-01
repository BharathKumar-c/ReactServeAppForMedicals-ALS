import { Container, Wrapper, SidebarMenu, Title, List, ListItem } from './SidebarStyles';

import {

  Group,
   Book,
  ExitToApp,
  Settings,
  AddLocationRounded
} from '@material-ui/icons';
import { Link,useHistory} from 'react-router-dom';
import '../styles.css';
import styles from './SidebarStyles';

function Sidebar() {
    const history = useHistory();

    const logout = () => {
        console.log("logut")
        localStorage.removeItem('')
        history.push('/SignIn')
    }
  return (
    <>
      <Container style={{overflow:'hidden'}}>
        <div>
          <img alt='' src='assets/images/logotext.png' style={styles.image} />
        </div>
        <hr style={styles.horizontalBar} />

        <Wrapper>
          <SidebarMenu>
            {/* <Title>Dashboard</Title> */}
            <List >
              <Link to='/Site' className='link'>
                <ListItem style={{marginBottom:'5%'}}>
                  <AddLocationRounded className='icon' />
                  <div style={{ marginLeft: '15%' }}>Site</div>
                </ListItem>
              </Link>
              <Link to='/SignUP' className='link'>
                <ListItem style={{marginBottom:'5%'}}>
                  <Group className='icon' />
                  <div style={{ marginLeft: '15%', marginTop: '2%'}}>Users</div>
                </ListItem>
              </Link>
              <Link to='/SignUP' className='link'>
                <ListItem>
                  <Book className='icon' />
                  <div style={{ marginLeft: '15%', marginTop: '2%' }}>Data</div>
                </ListItem>
              </Link>

              {/* <div style={styles.footerstyle}> */}
                <ListItem style={{marginBottom:'5%',marginTop:'122%'}}>
                  <Settings className='icon' />
                  <div style={{ marginLeft: '10%'}}>Settings</div>
                </ListItem>
                <ListItem>
                              <ExitToApp className='icon'  />
                  <div style={{ marginLeft: '10%'}} onClick={logout}>LogOut</div>
                </ListItem>
              {/* </div> */}
            </List>
          </SidebarMenu>
        </Wrapper>
      </Container>
    </>
  );
}

export default Sidebar;
