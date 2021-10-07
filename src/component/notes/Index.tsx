import React  from 'react';
import { Link } from 'react-router-dom';
import { gql } from "@apollo/client";
import client from '../../apollo-client'
//import LibFlash from '../../lib/LibFlash';
import LibCookie from '../../lib/LibCookie'
import LibConfig from '../../lib/LibConfig'
import IndexRow from './IndexRow';
//import FlashBox from '../element/FlashBox'
interface IObjectRow {
  id: number,
  title: string,
}
interface IProps {
  history:string[],
}
interface IState {
  count:number,
  items:Array<IObjectRow>,
}
//
class TasksIndex extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0, items: []
    };
  }
  async componentDidMount(){
    const key = LibConfig.getConfig().COOKIE_KEY_UID;
    if(LibCookie.get_cookie(key) === null){
      this.props.history.push("/login");
    }    
//    const f = await LibFlash.get_flash()
    const data = await client.query({
      query: gql`
      query {
        notes {
          id
          title
          content
          noteTag{
            id
            name
          }
        }
      }      
      ` 
      ,fetchPolicy: "network-only"
    }) 
console.log(data.data) 
    this.setState({
      items : data.data.notes
    })
  }  
  render() {
    return (
    <div className="container py-4">
      <h3>Notes - index</h3>
      <Link to={`/note_create`} >
          <button>Create</button>
      </Link>      
      <hr />
      { this.state.items.map((item: IObjectRow, index: number) => (
        <IndexRow id={item.id} title={item.title} key={index} />
      ))        
      }
      
    </div>
    );
  }
}
export default TasksIndex;
