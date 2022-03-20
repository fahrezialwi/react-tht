import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

const Ballot = ({ ballot, categoryId, selectedBallots, selectBallot, unselectBallot }) => {

  // Ballot ID for Chadwick Boseman for Da 5 Bloods is duplicated
  const renderCard = (ballot) => {
    if (selectedBallots.filter(e => e.ballot_id === ballot.id).length > 0) {
      return (
        <Card className="card-nominee-selected">
        <CardBody className="d-flex flex-column p-4">
          <CardTitle tag="h5" className="title-nominee">
            {ballot.title}
          </CardTitle>
          <div className="image-nominee-selected">
            <img src={ballot.photoUrL} alt={ballot.title}/>
          </div>
          <Button
            color="light"
            className="button-select-ballot mt-4"
            onClick={() => unselectBallot(ballot.id)}
          >
            Unselect
          </Button>
        </CardBody>
      </Card>
      )
    } else {
      return (
        <Card className="card-nominee">
        <CardBody className="d-flex flex-column p-4">
          <CardTitle tag="h5" className="title-nominee">
            {ballot.title}
          </CardTitle>
          <div className="image-nominee">
            <img src={ballot.photoUrL} alt={ballot.title}/>
          </div>
          <Button
            color="success"
            className="button-select-ballot mt-4"
            onClick={() => selectBallot(ballot.id, categoryId)}
          >
            Select
          </Button>
        </CardBody>
      </Card>
      )
    }
  }

  return (
    <div>
      {renderCard(ballot)}
    </div>
  )
}

export default Ballot;