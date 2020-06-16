import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  Badge,
  // Badge,
  Button, Card,
  CardBody,
  // CardFooter,
  // CardHeader,
  Col, Container, Form, //Form,
  FormGroup,
  // FormText,
  Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  // Nav,
  // NavItem,
  // NavLink,
  // Pagination, PaginationItem, PaginationLink,
  Row,
  //InputGroup,
  TabContent,
  // Table,
  TabPane
} from 'reactstrap';
import config from "../../Config/assets";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles


import $ from 'jquery';
// import assets from "../../Config/assets";

window.jQuery = $;
require('bootstrap');

class AnalysisDetail extends Component {

  constructor(props) {
    super(props);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      investor: {
        name: "",
        username: "",
        password: "",
        phone: "",
        type: "",
        tag: "",
        email: "",
      },
      alert: null,
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  AddInvestor() {
    // let data = this.state.investor;
    let requestData = this.state.investor;

    let url ='https://secure-mountain-93147.herokuapp.com/api/user';
    // let token = localStorage.getItem('token');
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        // "authorization": "Bearer " + token,
      }),
      body: JSON.stringify( requestData)
    }).then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.data) {
          const getAlert = () => (
            <SweetAlert
              success
              timeout={1500}
              onConfirm={() => this.props.history.push('/account/users')}
            >
              {responseJson.message}
            </SweetAlert>
          );
          this.setState({
            alert: getAlert()
          });
        } else {
          const getAlert = () => (
            <SweetAlert
              // success
              timeout={1500}
              onConfirm={() => this.hideAlert()}
            >
              {responseJson.errors.message}
            </SweetAlert>
          );
          this.setState({
            alert: getAlert()
          });
        }

      })
      .catch((err) => console.log(err))
  }

  hideAlert() {
    this.setState({
      alert: null
    });
    console.log('Hiding alert...');

  }


  onChange(content) {
    console.log(content);
    this.setState({
      investor: {
        ...this.state.investor,
        description: content
      }
    });
  }

  componentDidMount() {
  }






  toggleLarge() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }


  handleChangeData = (event) => {
    let input = event.target;
    this.setState({
      investor:
        {
          ...this.state.investor,
          [input.name]: input.value
        }
    });
    console.log(input.name,input.value);
  };



  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Card>

            <CardBody>
              <div id="AddInvestor">

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Tên sự cố</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="name" name="name" required onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Vị trí</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="username" id="username" required name="username"
                           onChange={(event) => this.handleChangeData(event)}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Date Input <Badge>NEW</Badge></Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="phone">Nội dung</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="textarea" id="phone" name="phone" required autoComplete="phone"
                           onChange={(event) => this.handleChangeData(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Đơn vị xử lý</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="type" id="type" required autoComplete="type" onChange={(event) => this.handleChangeData(event)}>
                      <option value="4">Đơn vị A</option>
                      <option value="0">Đơn vị B</option>
                      <option value="1">Đơn vị C</option>

                    </Input>
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <Button className="mr-1 btn-danger" type="submit" onClick={() => {
                    this.props.history.push("/");
                  }}>Hủy</Button>
                  <Button className="mr-1 btn-primary" color="primary" type="submit" value="SEND POST"
                         >Hoàn thành</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </TabPane>
      </>
    )
      ;
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <p className="font-weight-bold">Tạo báo cáo</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
              {this.state.alert}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AnalysisDetail;