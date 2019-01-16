import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import './style.css';
import './default-theme.css';
// import {Tabs, Tab} from 'react-bootstrap';
import Modal from 'react-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      isShowingModal: false,
      key: 1,
      img: ''
    };
  }

  handleClick (imgURL) {
    this.setState({isShowingModal: true, img: imgURL})
  }

  componentDidMount() {
      fetch("http://styleguide.effectivedigital.com/interview/api/animals")
    .then(res => res.json())
    .then(
      (result) => {
          console.log("result ",result);
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  menuClicked(menuItem) {
    let url = "http://styleguide.effectivedigital.com/interview/api/" + menuItem;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
          console.log("result ",result);
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  closeModal() {
    this.setState({isShowingModal: false});
  }


  render() {
      return (
          <div>
            <div>
              <section id="menu">
              <div className="container">
                  <div className="menu-area">
                    <div className="navbar navbar-default" role="navigation">          
                      <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                          <li><button style={{backgroundColor: '#fff'}}  onClick={()=>this.menuClicked('animals')}>Animal</button></li>
                          <li><button style={{backgroundColor: '#fff'}} onClick={()=>this.menuClicked('fruitveg')}>Fruites & Veg</button></li>
                        </ul>
                      </div>
                    </div>
                  </div> 
                </div>
              </section>
            </div>
          
            <section id="aa-blog-archive">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="aa-blog-content aa-blog-details">
                      <div className="aa-blog-comment-threat">
                        <div className="comments">
                          <ul className="commentlist">
                          {
                            this.state.items.map((users)=>{
                              return(
                                <li>
                              <div className="media">
                                <div className="media-left">    
                                    <img className="media-object news-img" src={users.ImageURLs.Thumb} onClick={()=>this.handleClick(users.ImageURLs.FullSize)} alt="img" />    
                                </div>
                                <div className="media-body">
                                <h4 className="author-name">{users.Title}</h4>
                                <p>{users.Description}</p>
                                </div>
                              </div>
                            </li>
                              );
                            })
                          }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br/><br/>
            </section>
            <Modal
              isOpen={this.state.isShowingModal}
              onRequestClose={()=>this.closeModal()}
              style={customStyles}
              contentLabel="Example Modal"
            >     
              <img className="media-object news-img" src={this.state.img}  alt="img" />
              <button onClick={()=>this.closeModal()}>close</button>
            </Modal>
          </div>
      );
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default App;
