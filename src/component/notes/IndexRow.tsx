import React, { Component } from 'react';
import { Link } from 'react-router-dom';
interface IProps {
  id: number,
  title: string,
}
//
class IndexRow extends Component<IProps> {
  constructor(props: any) {
    super(props);
  }  
  render() {
//    const obj = this.props.obj;
    return (
    <div>
      <Link to={`/note_show/${this.props.id}`} >
          <h3>{this.props.title}</h3>
      </Link>      
      <Link to={`/note_edit/${this.props.id}`}
        className="btn btn-sm btn-outline-primary mr-2">Edit
      </Link>                  
      ID : {this.props.id}
      <hr />
    </div>
    )
  }
}

export default IndexRow;