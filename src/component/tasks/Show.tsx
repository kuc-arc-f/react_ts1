import React  from 'react';
import client from "../../apollo-client";
import Task from '../../graphql/task'

interface IProps {
  history:string[],
}
interface IState {
  id: number,
  title: string,
}
//
export default class TaskShow extends React.Component<IProps, IState> {
  constructor(props:any){
    super(props)
    const id = Number(props.match.params.id)
    this.state = { id: id, title: ""};
  }
  async componentDidMount(){
//console.log(this.id); 
    const data = await client.query({
      query: Task.get_query_task(this.state.id),
      fetchPolicy: "network-only"
    });
//console.log(data.data.task);
    const item = data.data.task;    
    this.setState({id: item.id, title: item.title }) 
  }
  render(){
    return (
    <div className="container py-2">
      <h3>Tasks- Show</h3>
      <hr />
      ID : {this.state.id}
      <hr />
      Title : {this.state.title}
    </div>
    );
  }
}
