import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: calc(100vh-50px);
  background-color: #0f585e;
  position: relative;
  width: 15%;
  padding-bottom: 6%;
  margin-top: -3%;
`;

export const Wrapper = styled.div`
  padding: 20px;
  color: #ddd;
`;

export const SidebarMenu = styled.div`
  margin-bottom: 10px;
  margin-top: 20%;
`;

export const Title = styled.h3`
  font-size: 13px;
  color: #999;
`;

export const List = styled.ul`
  list-style: none;
  padding: 5px;
  margin-bottom: 20px;

  /* .active {
    background-color: #eeeeee;
  } */
`;

export const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: white;
    color:black;
  }

  div {
    margin-left: 10px;
  }
`;

const footerstyle = {
    // borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    // padding: "20px",
    position: "relative",
    // left: "0",
    // bottom: "0",
    width: "20%",
    color: 'White',
    marginTop: '150%',

};
const settingstyle = {
    // borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    // padding: "20px",
    position: "relative",
    left: "0",
    // bottom: "0",
    width: "20%",
    color: 'White',
    marginBottom:'20',
};
const horizontalBar = {
  marginTop: '10%',
  background: '#FFF',
  borderColor: '#FFF',
  borderWidth: 0.8
};
const image = {
    marginTop: '14%',
    widht: '10%',
    height: '40%',
    marginRight:'2%',
}
export default {
  horizontalBar,
    image,
    footerstyle,
  settingstyle
};
