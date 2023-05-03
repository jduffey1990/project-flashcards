import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";

function StudyCard({ cards }) {
    const initialState = {
        front: true,
        currentCard: 0,
    };

    const { deckId } = useParams();
    const history = useHistory();
    const [cardLocation, setCardLocation] = useState({ ...initialState });

    const handleNext = () => {
        //Go to next card until the last card is reached.  When we fo to the next card, we must also ensure we are looking at the front.
        if (cardLocation.currentCard < cards.length - 1) {
            setCardLocation({
                ...cardLocation,
                currentCard: cardLocation.currentCard + 1,
                front: true,
            })
        }
        //window confirm, send to home if they are done with the deck
        else {
            const confirmMessage = "Restart cards?\n\nClick cancel to return to the home page."
            const confirm = window.confirm(confirmMessage);
            if (confirm) {
                setCardLocation(initialState);
            } else {
                history.push("/");
            }
        }
    }
    //flipping the card will change the value of the front key boolean.  Must access state instead of changing directly, and only the side is changing, so we use spread operator and the front key
    const handleFlip = () => {
        setCardLocation({
            ...cardLocation,
            front: !cardLocation.front
        });
    }
    //the two embeded decks are good tests of this part.  One has 4 cards so we will study, the other will show the add card prompt.
    if (cards.length > 2) {
        return (
            <div className="container">
                <div className="card w-100">
                    <div className="card-body">
                        <h4 className="card-title">
                            Card {cardLocation.currentCard + 1} of {cards.length}
                        </h4>
                        <p className="card-text font-weight-lighter">
                            {cardLocation.front
                                ? cards[cardLocation.currentCard].front
                                : cards[cardLocation.currentCard].back
                            }
                        </p>
                        <button className="btn btn-secondary mr-1" onClick={handleFlip}><i class="bi bi-arrow-counterclockwise"></i>
                            Flip
                        </button>
                        {!cardLocation.front && (
                            <button className="btn btn-primary" onClick={handleNext}><i class="bi bi-arrow-right"></i>Next</button>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Not enough cards.</h3>
                <br />
                <div className="row my-2">
                    <p>You need at least 3 cards to study. This deck has {cards.length} cards.</p>
                </div>
                <div className="row">
                    <Link to={`/decks/${deckId}/cards/new`}>
                        <button className="btn btn-primary">
                            <i class="bi bi-plus mr-1"></i>
                            Add Card
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default StudyCard;
