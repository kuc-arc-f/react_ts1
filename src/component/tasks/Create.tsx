import React  from 'react';
import client from '../../apollo-client'
import Task from '../../graphql/task'
import LibCookie from '../../lib/LibCookie'
import LibConfig from '../../lib/LibConfig'

interface IProps {
  history: string[],
}
//
export default class TaskCreate extends React.Component<IProps> {
  constructor(props:any) {
    super(props);
  }  
  async componentDidMount(){
    const key = LibConfig.getConfig().COOKIE_KEY_UID;
    if(LibCookie.get_cookie(key) === null){
      this.props.history.push("/login");
    }      
  }
  async clickHandler(){
    try{
      console.log("clickHandler");
      const element = document.querySelector<HTMLInputElement>('#title');
      const result = await client.mutate({
        mutation: Task.get_gql_add(element.value)
      })
      console.log(result);
    } catch (e) {
      console.error(e);
      alert("Error, save item")
    }    
  }
  render(){
    return (
      <div className="container py-2">
        <h3>Tasks - Create</h3>
        <hr />
        <input type="text" name="title" id="title" />
        <button onClick={() => {this.clickHandler()}}>
          Add
        </button>      
        <hr />
      </div>
      );
  }
}
