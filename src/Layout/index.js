import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home"
import CreateDeck from "../Decks/CreateDeck";
import EditDeck from "../Decks/EditDeck";
import Deck from "../Decks/Deck"
import EditCard from "../Cards/EditCard";
import AddCard from "../Cards/AddCard";
import StudyCard from "../Cards/StudyCard";
import NotFound from "./NotFound";
import StudyPage from "../Decks/StudyPage";
import { listDecks } from "../utils/api/index";

function Layout() {

    const [decks, setDecks] = useState([]);

    //load decks
    useEffect(() => {
        setDecks([]);
        const abortController = new AbortController();
        async function loadDecks() {
            try {
                const loadedDecks = await listDecks();
                setDecks(loadedDecks);
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        loadDecks();
        return () => abortController.abort();
    }, []);
    //everything will have a header, amd then we will create the page routing here.  All visualized Cards will show up in these parents as children.
    return (
        <div>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home decks={decks} />
                    </Route>
                    <Route path={"/decks/new"}>
                        <CreateDeck />
                    </Route>
                    <Route path={"/decks/:deckId/cards/:cardId/edit"}>
                        <EditCard />
                    </Route>
                    <Route path={"/decks/:deckId/cards/:cardId/study"}>
                        <StudyCard />
                    </Route>
                    <Route path={"/decks/:deckId/cards/new"}>
                        <AddCard />
                    </Route>
                    <Route path={"/decks/:deckId/edit"}>
                        <EditDeck />
                    </Route>
                    <Route path={"/decks/:deckId/study"}>
                        <StudyPage />
                    </Route>
                    <Route exact path={"/decks/:deckId"}>
                        <Deck />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Layout;