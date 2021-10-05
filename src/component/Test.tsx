import React from 'react';
import client from '../apollo-client';
import { gql } from "@apollo/client";
/*
interface Person {
  name: string;
  age: number;
}
export function test2(): void{
let foo<Person> = {};
foo.name = "Yamada";
}
*/
export function test1(a1: number): string{
//  const p1:string = 'aa'; 
  const p1 = 'aa' + String(a1);
  console.log("#test1:" + p1);
  return p1;
}
export function renderSquare(num: number){
  console.log(num);
}
//
export default class Test extends React.Component {
  async componentDidMount(){
//    const d = test1(1);
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
console.log(data.data.tasks)     
  }
  render(){
    return (
    <div className="container">
      <h3>Test</h3>
      <hr />
    </div>
    );
  }
}

