import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IObject {
  id: number,
  title: string
}
interface IProps {
  obj: IObject,
}
//
class IndexRow extends Component<IProps> {
  render() {
    return (
    <div>
      <Link to={`/task_show/${this.props.obj.id}`} >
          <h3>{this.props.obj.title}</h3>
      </Link>      
      <Link to={`/task_edit/${this.props.obj.id}`}
        className="btn btn-sm btn-outline-primary mr-2">Edit
      </Link>                  
      ID : {this.props.obj.id}
      <hr />
    </div>
    )
  }
}

export default IndexRow;