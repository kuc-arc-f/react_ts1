import React  from 'react';
import client from "../../apollo-client";
import Note from '../../graphql/note'

interface IProps {
  history:string[],
}
interface IState {
  id: number,
  title: string,
}
//
export default class NoteShow extends React.Component<IProps, IState> {
  constructor(props: any){
    super(props)
    const id = Number(props.match.params.id)
    this.state = { id: id, title: ""};
  }
  async componentDidMount(){
//console.log(this.id);
    const data = await client.query({
      query: Note.get_query_item(this.state.id),
      fetchPolicy: "network-only"
    });
console.log(data.data);
    const item = data.data.note;    
    this.setState({id: item.id, title: item.title }) 
  }
  render(){
    return (
    <div className="container py-2">
      <h3>Note- Show</h3>
      <hr />
      ID : {this.state.id}
      <hr />
      Title : {this.state.title}
    </div>
    );
  }
}
