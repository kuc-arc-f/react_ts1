import React  from 'react';
import client from '../../apollo-client'
import Task from '../../graphql/task'

interface IProps {
  history:string[],
}
interface IState {
  id: number,
  title: string,
}
//
export default class TaskEdit extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    const id = parseInt(props.match.params.id)
    //console.log(this.id);
    this.state = { id: id, title: ""};
  }
  async componentDidMount(){
    const data = await client.query({
      query: Task.get_query_task(this.state.id), fetchPolicy: "network-only"
    })
console.log(data.data.task)    
    const item = data.data.task;    
    this.setState({id: item.id, title: item.title })
  }
  async clickHandler(){
    const title = document.querySelector<HTMLInputElement>('#title');
//console.log("clickHandler: " + title.value)
    const result = await client.mutate({
      mutation: Task.get_gql_update(this.state.id, title.value)
    })
    console.log(result); 
    alert("Complete, update");
    this.props.history.push("/tasks");
  }
  async deleteHandler(){
    const result = await client.mutate({
      mutation: Task.get_gql_delete(this.state.id)
    }) 
    console.log(result); 
    alert("Complete, delete");
    this.props.history.push("/tasks");
  }
  render() {
//console.log(this.state.item)
    return (
      <div className="container py-2">
        <h3>task - Edit</h3>
        ID : {this.state.id}
        <hr />
        <div className="form-group col-md-6 mt-2">
          <label>title:</label>
          <input type="text" name="title" id="title"
          defaultValue={this.state.title} /> 
        </div>
        <button onClick={() => {this.clickHandler()}}>
          UpdateTodo
        </button>   
        <hr />   
        <button onClick={() => {this.deleteHandler()}}>
          DeleteTodo
        </button>
      </div>
    );
  }
}
