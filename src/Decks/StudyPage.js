import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../Layout/BreadCrumb";
import Study from "../Cards/StudyCard";
import { readDeck } from "../utils/api/index";

function StudyPage() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    //load deck
    useEffect(() => {

        async function loadDeck() {

            const newDeck = await readDeck(deckId);
            setDeck(newDeck);
            console.log(newDeck);

        };
        loadDeck();

    }, [deckId]);

    //since the original state of deck is an empty object, use conditional here to ensure it has length
    if (Object.keys(deck).length) {
        return (
            <div>
                <BreadCrumb link={`/decks/${deckId}`} linkName={deck.name} pageName={"Study"} />
                <div className="row">
                    <h2>Study: {deck.name}</h2>
                </div>
                <div className="row">
                    <Study cards={deck.cards} />
                </div>
            </div>
        )
    }
    else return "Loading deck..."

}

export default StudyPage;