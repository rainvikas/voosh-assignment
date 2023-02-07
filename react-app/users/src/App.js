import React from "react";
import './App.css';
// import Form from "./Form"
// function App() {
//   return (
//     <div className="App">
//       <Form />
//     </div>
     
//   );
// }

class App extends React.Component {
    
  // Constructor 
  constructor(props) {
      super(props);
 
      this.state = {
          items: [],
          DataisLoaded: false
      };
  }
 
  // ComponentDidMount is used to
  // execute the code 
  componentDidMount() {
      fetch(
"http://localhost:3001/get-orders")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
  }
  render() {
      const { DataisLoaded, items } = this.state;
      if (!DataisLoaded) return <div>
          <h1> Pleses wait some time.... </h1> </div> ;
 
      return (
      <div className = "App">
          <h1> User order data fetched </h1>  {
              items.map((item) => ( 
              <ul key = { item._id } >
                  <li>User_id: { item.userId }</li> 
                  <li>sub_total: { item.subTotal }</li>
                  <li>User_phone: { item.phone } </li>
                  </ul>
              ))
          }
      </div>
  );
  
}

}
export default App;
