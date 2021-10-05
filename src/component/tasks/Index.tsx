import React  from 'react';
import { Link } from 'react-router-dom';
//import { RouteComponentProps } from 'react-router-dom'
import { gql } from "@apollo/client";
import client from '../../apollo-client'
import LibCookie from '../../lib/LibCookie'
import LibConfig from '../../lib/LibConfig'
import IndexRow from './IndexRow';
//interface Props extends RouteComponentProps {}
interface IProps {
  history:string[],
}
interface IState {
  count:number,
  items:Array<IObject>,
}
interface IObject {
  id: number,
  title: string
}
//
class TasksIndex extends React.Component<IProps, IState> {  
  constructor(props: IProps) {
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
    //console.log(f) 
    const data = await client.query({
      query: gql`
      query {
        tasks {
          id
          title
        }
      }
      ` 
      ,fetchPolicy: "network-only"
    }) 
console.log(data.data) 
    this.setState({
      items : data.data.tasks
    })
  }  
  render() {
    return (
    <div className="container py-4">
      <h3>Tasks - index</h3>
      <Link to={`/task_create`} >
          <button>Create</button>
      </Link>      
      <hr />
      { this.state.items.map((item: IObject, index: number) => (
          <IndexRow obj={item} key={index} />
        ))        
      }
    </div>
    );
  }
}
export default TasksIndex;
