// function Subject (props){
//     return(
//       <header>
//           <h1>{props.title}</h1>
//           {props.sub}
//       </header>
//     );
//   }

import { Component } from "react";

  class Subject extends Component{
    render(){
        return(
        <header>
          <h1><a href="/"
          onClick={function(e){
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
        );
    }
}  

  export default Subject;