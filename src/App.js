import './App.css';
import Ballot from './Components/Ballot/Ballot';
import React, { useState, useEffect } from 'react';
import api from './Api/Api'
import { Container, Row, Col, Button} from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [categoryBallots, setCategoryBallots] = useState([]);
  const [selectedBallots, setSelectedBallots] = useState([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    getBallots();
  }, []);

  const getBallots = () => {
    api.getBallotData().then((res) => {
      setCategoryBallots(res.items);
    });
  }

  const renderCategory = () => {
    return categoryBallots.map((el, index) => {
      return (
        <Row key={index}>
          <Col md="12">
            <div className="category-header">
              {el.title}
            </div>
          </Col>
          {renderBallots(el.items, el.id)}
        </Row>
      )
    })
  }

  const selectBallot = (ballotId, categoryId) => {
    if (selectedBallots.filter(e => e.category_id === categoryId).length > 0) {
      let resultBallots = [...selectedBallots];
      let elementIndex = resultBallots.findIndex(e => e.category_id === categoryId);
      resultBallots[elementIndex].ballot_id = ballotId;
      setSelectedBallots(resultBallots);
    } else {
      setSelectedBallots([...selectedBallots, {ballot_id: ballotId, category_id: categoryId}]);
    }
  }

  const unselectBallot = (ballotId) => {
    let resultBallots = selectedBallots.filter(el => {
      return el.ballot_id !== ballotId;
    })
    setSelectedBallots(resultBallots);
  }

  const submitBallot = () => {
    if (selectedBallots.length === categoryBallots.length) {
      MySwal.fire({
        title: 'Ballots Submitted!',
        icon: 'success',
        confirmButtonColor: '#198754',
      }).then(() => {
        setSelectedBallots([]);
        getBallots();
        window.scrollTo(0, 0);
      })
    } else {
      MySwal.fire({
        title: 'Error',
        text: 'Please select one nominee in each category.',
        icon: 'error',
        confirmButtonColor: '#198754',
      })
    }
  }

  const renderBallots = (ballots, categoryId) => {
    return ballots.map((el, index) => {
      return (
        <Col lg="4" md="4" sm="6" className="my-2" key={index}>
          <Ballot 
            ballot={el}
            categoryId={categoryId}
            selectedBallots={selectedBallots}
            selectBallot={selectBallot}
            unselectBallot={unselectBallot}
          />
        </Col>
      )
    })
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h2 className="mt-4">
              AWARDS 2021
            </h2>
          </Col>
        </Row>
        {renderCategory()}
      </Container>
      <div className="submit-ballot-bar">
        <Row>
          <Col>
            <Button
              color="success"
              className="my-3"
              onClick={() => submitBallot()}
            >
              Submit Ballots
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
