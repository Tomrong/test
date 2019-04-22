import React, { Component ,Fragment } from 'react';
import { Table ,Container, Modal ,ModalHeader ,ModalBody,ModalFooter} from 'reactstrap'
import Main from './style'
import { Button,Dropdown,Form } from 'react-bootstrap';
import {
  Textbox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newMovie: "",
      list: [],
      flag:'create',
      trick:false
    };
    this.validateForm = this.validateForm.bind(this);
  }
  toggleValidating(validate) {
    this.setState({ validate });
  }

  toggle = this.toggle.bind(this);
  validateForm(e) {
    e.preventDefault();
    this.toggleValidating(true);
    const { 
      hasImgError,
      hasNameError,
      hasCategoryError,
      hasStatusError
    } = this.state;
    if (
      !hasImgError &&
      !hasNameError &&
      !hasCategoryError &&
      !hasStatusError
    ) {
      alert("All validated!");
    }
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      flag:'create',
      index:null,
      newMovie: "",
        id:"",
        img:"",
        name:"",
        category:"",
        status:""
    }));
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }


  componentDidMount(){
    const storeMovie = localStorage.getItem('store');
    if(storeMovie !== null){ 
      this.setState({list:JSON.parse(storeMovie)})
    }
  }

  addMovie() {
    this.toggleValidating(true);
    const { flag ,list,index} = this.state
    
    if(flag==='create'){
      const { 
        hasImgError,
        hasNameError,
        hasCategoryError,
        hasStatusError
      } = this.state;
      if (
        !hasImgError &&
        !hasNameError &&
        !hasCategoryError &&
        !hasStatusError
      ) {
        const { img,name,category,status } = this.state
        const newMovies = {
          id: 1 + Math.random(),
          img,
          name,
          category,
          status
        };
  
        const list = [...this.state.list];
  
        list.push(newMovies);
        localStorage.setItem('store',JSON.stringify(list))
  
        this.setState({
          list,
          newMovie: "",
          img:"",
          name:"",
          category:"",
          status:"",
  
        });
  
        this.toggle()
      }
    }else{
      console.log('state : ',this.state)
      this.setState({trick:true})

      list[index].img = this.state.img
      list[index].name = this.state.name
      list[index].category = this.state.category
      list[index].status = this.state.status
      console.log('list : ',list)
      localStorage.setItem('store', JSON.stringify(list))
      // this.setState({img : 'xxx'})
      // this.state.img = this.state.list[index].img
      // this.setState(this.state.img)
      // this.setState({})
      // this.setState({list[index] img });
       
    }
    
    
  }

  deleteItem(id) {
    const list = [...this.state.list]
    const storeMovie = localStorage.getItem('store')

    let movieListStore = JSON.parse(storeMovie)
    const updatedListStore = movieListStore.filter(item => item.id !== id)
    const updatedList = list.filter(item => item.id !== id)
    this.setState({ list: updatedList })
    this.setState({ list: updatedListStore })

    localStorage.setItem('store', JSON.stringify(updatedListStore))
    
  }

  viewItem = (id,index) => {
    this.toggle()
    this.setState({flag : 'update',index})
    const { list } = this.state
    const viewItem = list.filter(item => item.id === id)
    this.setState(() => ({
      id:viewItem[0].id,
      img:viewItem[0].img,
      name:viewItem[0].name,
      category:viewItem[0].category,
      status:viewItem[0].status
    }))
  }

  render() {
    const { 
      img,
      name,
      category,
      status,
      validate,
      trick
    } = this.state;
    console.log(trick)
    return (
      <Container>
        <Main>
          <div className="left">
              <Button onClick={this.toggle}>Add +</Button>
          </div>
          <div className="right">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
          </div>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
            {this.state.list.map((item, index) => {
              return (
                  <tr key={index} >
                    <td>{index+1}</td>  
                    <td>
                      <img src={item.img} alt={item.name}/>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                    <td> <Button onClick={() => this.viewItem(item.id,index)}>View</Button> <Button variant="danger" onClick={() => this.deleteItem(item.id)}>Del</Button> </td>
                  </tr>
              );
            })}
              </tbody>
           
              </Table>

              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add Movie</ModalHeader>
                <ModalBody>
                <Form>
                  <Form.Group>
                    <Form.Label>Link image</Form.Label> 
                    <Textbox
                        tabIndex="1" 
                        id={"Img"}
                        name="Img" 
                        type="text"
                        value={img}
                        disabled={false} 
                        placeholder="ex : http://"
                        validate={validate} 
                        validationCallback={res =>
                          this.setState({ hasNameError: res, validate: false })
                        } 
                        onChange={(img, e) => {
                          this.setState({ img });
                          console.log(e);
                        }} 
                        onBlur={e => {
                          console.log(e);
                        }} 
                        validationOption={{
                          name: "img",
                          check: true, 
                          required: true 
                        }}
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Movie name</Form.Label>
                    <Textbox
                        tabIndex="1" 
                        id={"Name"}
                        name="Name" 
                        type="text"
                        value={name}
                        disabled={false} 
                        placeholder="Movie name"
                        validate={validate} 
                        validationCallback={res =>
                          this.setState({ hasNameError: res, validate: false })
                        } 
                        onChange={(name, e) => {
                          this.setState({ name });
                          console.log(e);
                        }} 
                        onBlur={e => {
                          console.log(e);
                        }} 
                        validationOption={{
                          name: "Movie name",
                          check: true, 
                          required: true 
                        }}
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Select
                      tabIndex="6" 
                      id={"category"} 
                      name={"category"}
                      value={category}
                      disabled={false} 
                      validate={validate}
                      validationCallback={res =>
                        this.setState({ hasCategoryError: res, validate: false })
                      } 
                      optionList={
                        [{id:'', name:"Please select category"},
                          {name:'Action',id:'Action'},
                          {name:'Drama',id:'Drama'},
                          {name:'Sci-fi',id:'Sci-fi'}]
                      } 
                      customStyleOptionListContainer={{
                        maxHeight: "200px",
                        overflow: "auto",
                        fontSize: "14px"
                      }} 
                      customStyleOptionListItem={{}} 
                      onChange={(category, e) => {
                        this.setState({ category });
                      }}
                      validationOption={{
                        name: "Category",
                        check: true,
                        required: true
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Select
                      tabIndex="6" 
                      id={"status"} 
                      name={"status"} 
                      value={status} 
                      disabled={false}
                      validate={validate}
                      validationCallback={res =>
                        this.setState({ hasStatusError: res, validate: false })
                      } 
                      optionList={
                        [{id:'', name:"Please select status"},{name:'Active',id:'Active'},{name:'InActive',id:'InActive'}]
                      } 
                      customStyleOptionListContainer={{
                        maxHeight: "200px",
                        overflow: "auto",
                        fontSize: "14px"
                      }} 
                      onChange={(status, e) => {
                        this.setState({ status });
                      }}  
                      validationOption={{
                        name: "Status",  
                        check: true,  
                        required: true 
                      }}
                    />
                  </Form.Group>
                </Form>
                </ModalBody>
                <ModalFooter>
                  <Button variant={(this.state.flag === 'update')?'warning':'success'} onClick={() => this.addMovie()} >
                    {(this.state.flag === 'update')? "Update" : "Add"}
                  </Button>{' '}
                  <Button variant="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>

            </Main>
          </Container>

    )
  }
}

export default App;
